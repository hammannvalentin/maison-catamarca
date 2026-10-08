import React, { useState } from 'react';
import {
  X,
  Lock,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Check,
  DollarSign,
  Image as ImageIcon,
  Phone,
  Instagram,
  Sparkles,
  Eye,
  Upload,
  Copy,
  Download,
  Loader2,
  HardDriveDownload,
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS as DEFAULT_PRODUCTS, DEFAULT_HERO_IMAGE } from '../data/products';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProducts: (newProducts: Product[]) => void;
  heroImage: string;
  onUpdateHeroImage: (image: string) => void;
  discountAmount: number;
  onUpdateDiscount: (amount: number) => void;
  whatsappNumber: string;
  onUpdateWhatsapp: (num: string) => void;
  instagramHandle: string;
  onUpdateInstagram: (handle: string) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProducts,
  heroImage,
  onUpdateHeroImage,
  discountAmount,
  onUpdateDiscount,
  whatsappNumber,
  onUpdateWhatsapp,
  instagramHandle,
  onUpdateInstagram,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  // Local editable state
  const [activeTab, setActiveTab] = useState<'combo' | 'hero'>('combo');
  const [editableProducts, setEditableProducts] = useState<Product[]>(products);
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || 'cherry-classic');
  const [tempHeroImage, setTempHeroImage] = useState<string>(heroImage);
  const [tempDiscount, setTempDiscount] = useState<number>(discountAmount);
  const [tempWhatsapp, setTempWhatsapp] = useState<string>(whatsappNumber);
  const [tempInstagram, setTempInstagram] = useState<string>(instagramHandle);
  const [newImageUrl, setNewImageUrl] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSavingToCode, setIsSavingToCode] = useState(false);
  const [codeSaveMessage, setCodeSaveMessage] = useState<string | null>(null);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Sync state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setEditableProducts(products);
      setTempHeroImage(heroImage);
      setTempDiscount(discountAmount);
      setTempWhatsapp(whatsappNumber);
      setTempInstagram(instagramHandle);
      setSavedSuccess(false);
      setCodeSaveMessage(null);
    }
  }, [isOpen, products, heroImage, discountAmount, whatsappNumber, instagramHandle]);

  if (!isOpen) return null;

  const currentProduct =
    editableProducts.find((p) => p.id === selectedProductId) || editableProducts[0];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().toLowerCase() === 'valentin') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const updateCurrentProductField = <K extends keyof Product>(
    field: K,
    value: Product[K]
  ) => {
    setEditableProducts((prev) =>
      prev.map((item) =>
        item.id === selectedProductId ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAddSecondaryImage = () => {
    if (!newImageUrl.trim() || !currentProduct) return;
    const currentList = currentProduct.secondaryImages || [];
    updateCurrentProductField('secondaryImages', [...currentList, newImageUrl.trim()]);
    setNewImageUrl('');
  };

  const handleRemoveSecondaryImage = (indexToRemove: number) => {
    if (!currentProduct) return;
    const currentList = currentProduct.secondaryImages || [];
    updateCurrentProductField(
      'secondaryImages',
      currentList.filter((_, idx) => idx !== indexToRemove)
    );
  };

  const compressImage = (dataUrl: string, maxDim = 850, quality = 0.72): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } else {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'main' | 'secondary') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const rawDataUrl = event.target?.result as string;
      if (rawDataUrl) {
        const dataUrl = await compressImage(rawDataUrl);
        if (target === 'main') {
          updateCurrentProductField('image', dataUrl);
        } else {
          const currentList = currentProduct.secondaryImages || [];
          updateCurrentProductField('secondaryImages', [...currentList, dataUrl]);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleHeroFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const raw = event.target?.result as string;
      if (raw) {
        const compressed = await compressImage(raw, 950, 0.75);
        setTempHeroImage(compressed);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveToCode = async () => {
    setIsSavingToCode(true);
    setCodeSaveMessage(null);

    // 1. Guardar en estado de React y en almacenamiento local
    onUpdateProducts(editableProducts);
    onUpdateHeroImage(tempHeroImage);
    onUpdateDiscount(tempDiscount);
    onUpdateWhatsapp(tempWhatsapp);
    onUpdateInstagram(tempInstagram);

    // 2. Grabar permanentemente en los archivos del proyecto (src/data/products.ts y public/images/)
    try {
      const res = await fetch('/api/save-defaults', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: editableProducts,
          heroImage: tempHeroImage,
          discountAmount: tempDiscount,
          whatsappNumber: tempWhatsapp,
          instagramHandle: tempInstagram,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.products) {
          setEditableProducts(data.products);
          onUpdateProducts(data.products);
        }
        if (data.heroImage) {
          setTempHeroImage(data.heroImage);
          onUpdateHeroImage(data.heroImage);
        }
        setCodeSaveMessage('¡Guardado con éxito en el código del proyecto! Ya está listo para Netlify y todos los dispositivos.');
      } else {
        setCodeSaveMessage('Guardado localmente en este navegador.');
      }
    } catch {
      setCodeSaveMessage('Guardado localmente en este navegador.');
    } finally {
      setIsSavingToCode(false);
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
      }, 5000);
    }
  };

  const handleSaveAll = () => {
    handleSaveToCode();
  };

  const handleCopyBackup = () => {
    const backupData = {
      heroImage: tempHeroImage,
      discountAmount: tempDiscount,
      whatsappNumber: tempWhatsapp,
      instagramHandle: tempInstagram,
      products: editableProducts,
    };
    navigator.clipboard.writeText(JSON.stringify(backupData, null, 2));
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  const handleDownloadBackup = () => {
    const backupData = {
      heroImage: tempHeroImage,
      discountAmount: tempDiscount,
      whatsappNumber: tempWhatsapp,
      instagramHandle: tempInstagram,
      products: editableProducts,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `maison-catamarca-catalogo-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetToDefaults = () => {
    if (confirm('¿Deseas restaurar los precios y fotos originales de fábrica?')) {
      const defaultHero = DEFAULT_HERO_IMAGE;
      setEditableProducts(DEFAULT_PRODUCTS);
      setTempHeroImage(defaultHero);
      setTempDiscount(10000);
      setTempWhatsapp('543834765670');
      setTempInstagram('maisoncatamarca');
      onUpdateProducts(DEFAULT_PRODUCTS);
      onUpdateHeroImage(defaultHero);
      onUpdateDiscount(10000);
      onUpdateWhatsapp('543834765670');
      onUpdateInstagram('maisoncatamarca');
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-900 text-white">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c9182b]" />
            <span className="font-serif text-lg tracking-widest font-semibold uppercase">
              Maison Cherry · Panel de Administración
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            aria-label="Cerrar panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Authentication Wall if not logged in */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-800 mb-4 border border-neutral-200">
              <Lock className="w-6 h-6 text-[#c9182b]" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-neutral-900">
              Acceso Administrativo
            </h3>
            <p className="mt-2 text-xs text-neutral-500 font-light">
              Ingresá tu clave de seguridad para gestionar precios, fotos y datos de contacto de la tienda.
            </p>

            <form onSubmit={handleLogin} className="mt-6 w-full space-y-3">
              <input
                type="password"
                placeholder="Contraseña de acceso"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 text-sm rounded-xl bg-neutral-50 border ${
                  authError ? 'border-red-500 ring-2 ring-red-200' : 'border-neutral-300'
                } focus:outline-none focus:border-neutral-900 text-center tracking-widest font-mono`}
                autoFocus
              />
              {authError && (
                <p className="text-xs text-red-600">
                  Contraseña incorrecta. Por favor, verificá e intentalo nuevamente.
                </p>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl transition-all active:scale-[0.98] cursor-pointer"
              >
                Ingresar al Panel
              </button>
            </form>
          </div>
        ) : (
          /* Main Admin Workspace */
          <div className="flex-1 overflow-y-auto flex flex-col">
            <div className="bg-amber-50/90 border-b border-amber-200/80 px-6 py-2.5 flex items-center justify-between text-xs text-amber-900">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
                <span>
                  <strong>Configuración en preview:</strong> Para que tus fotos y precios se guarden fijos en el código (para Netlify y todos los dispositivos), hacé clic en <strong>'Guardar como Versión Definitiva'</strong> abajo a la derecha.
                </span>
              </div>
            </div>
            <div className="flex-1 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-neutral-200">
            {/* Sidebar / Combos Switcher & Store Settings */}
            <div className="lg:w-72 p-5 bg-neutral-50/70 space-y-6">
              {/* Hero Banner Section */}
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 block mb-2">
                  Portada de la Tienda
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('hero')}
                  className={`w-full p-3 rounded-2xl text-left border transition-all flex items-center gap-3 cursor-pointer ${
                    activeTab === 'hero'
                      ? 'bg-white border-neutral-900 shadow-sm ring-1 ring-neutral-900'
                      : 'bg-white/80 border-neutral-200 hover:bg-white text-neutral-600'
                  }`}
                >
                  <img
                    src={tempHeroImage || DEFAULT_HERO_IMAGE}
                    alt="Portada Hero"
                    className="w-10 h-10 rounded-xl object-cover border border-neutral-200 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-serif font-bold text-neutral-900 truncate">
                      Foto Hero Principal
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      Portada de bienvenida
                    </p>
                  </div>
                </button>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 block mb-2.5">
                  Seleccionar Combo para Editar
                </span>
                <div className="space-y-2">
                  {editableProducts.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedProductId(p.id);
                        setActiveTab('combo');
                      }}
                      className={`w-full p-3 rounded-2xl text-left border transition-all flex items-center gap-3 cursor-pointer ${
                        activeTab === 'combo' && selectedProductId === p.id
                          ? 'bg-white border-neutral-900 shadow-sm ring-1 ring-neutral-900'
                          : 'bg-white/80 border-neutral-200 hover:bg-white text-neutral-600'
                      }`}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 rounded-xl object-cover border border-neutral-200 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-serif font-bold text-neutral-900 truncate">
                          {p.name}
                        </p>
                        <p className="text-[11px] text-neutral-500 font-mono tabular-nums">
                          ${p.price.toLocaleString('es-AR')}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* General Store Settings (Discount & Contact) */}
              <div className="pt-4 border-t border-neutral-200 space-y-3">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 block">
                  Ajustes Globales de Tienda
                </span>

                <div>
                  <label className="block text-[11px] font-medium text-neutral-700 mb-1">
                    Descuento Inauguración ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      value={tempDiscount}
                      onChange={(e) => setTempDiscount(Number(e.target.value) || 0)}
                      className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-900 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-neutral-700 mb-1">
                    WhatsApp para Pedidos
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-[#25D366] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={tempWhatsapp}
                      onChange={(e) => setTempWhatsapp(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-900 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-neutral-700 mb-1">
                    Instagram de la Marca
                  </label>
                  <div className="relative">
                    <Instagram className="w-3.5 h-3.5 text-pink-600 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={tempInstagram}
                      onChange={(e) => setTempInstagram(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>
              </div>

              {/* Reset Defaults button */}
              <button
                onClick={handleResetToDefaults}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-[11px] text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar datos originales</span>
              </button>
            </div>

            {/* Main Form for Selected Combo or Hero */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {activeTab === 'hero' ? (
                /* Hero Image Editor */
                <div className="space-y-6">
                  <div className="pb-3 border-b border-neutral-200">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#c9182b]">
                      Portada de la Tienda
                    </span>
                    <h3 className="text-xl font-serif font-bold text-neutral-900">
                      Foto Hero Principal (Bienvenida)
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      Esta es la imagen principal de gran impacto que ven los clientes ni bien ingresan al sitio.
                    </p>
                  </div>

                  {/* Hero Live Preview */}
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4">
                    <span className="text-xs font-bold text-neutral-800 block">
                      Vista Previa de la Portada
                    </span>

                    <div className="relative aspect-[16/10] sm:aspect-[16/9] max-w-xl mx-auto rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-300 shadow-sm">
                      <img
                        src={tempHeroImage || DEFAULT_HERO_IMAGE}
                        alt="Vista previa Portada Hero"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-between text-xs">
                        <span className="font-semibold text-neutral-900">Maison Cherry Catamarca</span>
                        <span className="text-[10px] font-bold text-[#c9182b] uppercase">Concept Store</span>
                      </div>
                    </div>

                    {/* Upload Controls for Hero */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <label className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold cursor-pointer transition-all active:scale-[0.98]">
                        <Upload className="w-4 h-4" />
                        <span>Subir nueva foto de portada</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleHeroFileUpload}
                          className="hidden"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() =>
                          setTempHeroImage(DEFAULT_HERO_IMAGE)
                        }
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white border border-neutral-300 hover:border-neutral-900 text-neutral-700 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Restaurar foto original</span>
                      </button>
                    </div>

                    {/* Hero URL input */}
                    <div>
                      <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                        O ingresar URL directa de la imagen:
                      </label>
                      <input
                        type="text"
                        value={tempHeroImage}
                        onChange={(e) => setTempHeroImage(e.target.value)}
                        placeholder="https://... o /images/..."
                        className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-900 font-mono"
                      />
                    </div>

                    {/* Quick presets from combos */}
                    <div className="pt-3 border-t border-neutral-200">
                      <span className="text-[11px] font-semibold text-neutral-500 block mb-2">
                        O elegir la foto de alguno de los combos:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {editableProducts.map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setTempHeroImage(p.image)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:border-neutral-900 text-[11px] font-medium text-neutral-700 transition-colors cursor-pointer"
                          >
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-5 h-5 rounded object-cover"
                            />
                            <span>Usar {p.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : currentProduct ? (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#c9182b]">
                        Editando:
                      </span>
                      <h3 className="text-xl font-serif font-bold text-neutral-900">
                        {currentProduct.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={currentProduct.inStock}
                          onChange={(e) =>
                            updateCurrentProductField('inStock', e.target.checked)
                          }
                          className="rounded text-[#c9182b] focus:ring-[#c9182b]"
                        />
                        <span className="font-medium">En Stock Disponible</span>
                      </label>
                    </div>
                  </div>

                  {/* Pricing Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Precio de Venta Actual ($) <span className="text-[#c9182b]">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-neutral-400">$</span>
                        <input
                          type="number"
                          value={currentProduct.price}
                          onChange={(e) =>
                            updateCurrentProductField('price', Number(e.target.value) || 0)
                          }
                          className="w-full pl-8 pr-3 py-2.5 text-sm bg-neutral-50 rounded-xl border border-neutral-300 focus:outline-none focus:border-neutral-900 font-mono font-bold text-neutral-900"
                        />
                      </div>
                      <span className="text-[11px] text-neutral-500 mt-1 block">
                        Visible en tienda: ${currentProduct.price.toLocaleString('es-AR')}
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Precio Anterior / Tachado ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-neutral-400">$</span>
                        <input
                          type="number"
                          value={currentProduct.originalPrice || ''}
                          onChange={(e) =>
                            updateCurrentProductField(
                              'originalPrice',
                              e.target.value ? Number(e.target.value) : undefined
                            )
                          }
                          className="w-full pl-8 pr-3 py-2.5 text-sm bg-neutral-50 rounded-xl border border-neutral-300 focus:outline-none focus:border-neutral-900 font-mono text-neutral-600"
                        />
                      </div>
                      <span className="text-[11px] text-neutral-400 mt-1 block">
                        Opcional para mostrar descuento
                      </span>
                    </div>
                  </div>

                  {/* Texts */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Nombre del Combo
                      </label>
                      <input
                        type="text"
                        value={currentProduct.name}
                        onChange={(e) => updateCurrentProductField('name', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-neutral-900 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Subtítulo / Bajada breve
                      </label>
                      <input
                        type="text"
                        value={currentProduct.tagline}
                        onChange={(e) => updateCurrentProductField('tagline', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Descripción Detallada
                      </label>
                      <textarea
                        rows={3}
                        value={currentProduct.description}
                        onChange={(e) =>
                          updateCurrentProductField('description', e.target.value)
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-neutral-900 resize-none leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Photos Section */}
                  <div className="space-y-3 pt-4 border-t border-neutral-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-neutral-800 flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-[#c9182b]" />
                        <span>Gestión de Fotos del Combo</span>
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        {1 + (currentProduct.secondaryImages?.length || 0)} fotos en galería
                      </span>
                    </div>

                    {/* Main Image Control */}
                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neutral-900">
                          Foto Principal (Portada en la tienda)
                        </span>
                        <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-neutral-300 hover:border-neutral-900 text-[11px] font-semibold text-neutral-700 rounded-lg cursor-pointer transition-colors">
                          <Upload className="w-3 h-3" />
                          <span>Subir desde dispositivo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'main')}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="flex gap-4 items-center">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-neutral-300 shrink-0 shadow-2xs">
                          <img
                            src={currentProduct.image}
                            alt="Portada"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="URL de imagen o ruta (/src/assets/...)"
                            value={currentProduct.image}
                            onChange={(e) => updateCurrentProductField('image', e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900 font-mono"
                          />
                          <p className="text-[10px] text-neutral-400 mt-1">
                            Podés pegar una URL de imagen externa o subir un archivo directamente.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Secondary Gallery Images */}
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-neutral-700 block">
                        Fotos Secundarias (Galería del Producto)
                      </span>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {(currentProduct.secondaryImages || []).map((imgUrl, idx) => (
                          <div
                            key={idx}
                            className="relative group rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 aspect-square shadow-2xs"
                          >
                            <img
                              src={imgUrl}
                              alt={`Foto ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() => handleRemoveSecondaryImage(idx)}
                              className="absolute top-1.5 right-1.5 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer"
                              title="Eliminar foto"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}

                        {/* Add More Photo Button */}
                        <label className="border-2 border-dashed border-neutral-300 hover:border-neutral-400 rounded-xl aspect-square flex flex-col items-center justify-center text-center p-2 cursor-pointer transition-colors bg-white">
                          <Upload className="w-4 h-4 text-neutral-400 mb-1" />
                          <span className="text-[10px] font-medium text-neutral-600">Subir foto</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'secondary')}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Add by URL */}
                      <div className="flex gap-2 mt-2">
                        <input
                          type="text"
                          placeholder="O pegar URL de foto secundaria..."
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                          className="flex-1 px-3 py-2 text-xs bg-white border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-900 font-mono"
                        />
                        <button
                          type="button"
                          onClick={handleAddSecondaryImage}
                          className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Agregar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
          </div>
        )}

        {/* Footer Actions */}
        {isAuthenticated && (
          <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex flex-col gap-3">
            {codeSaveMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{codeSaveMessage}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleCopyBackup}
                  className="px-3 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-[11px] font-medium text-neutral-600 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copiar estructura de datos al portapapeles"
                >
                  <Copy className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{copiedSuccess ? '¡Copiado!' : 'Copiar JSON'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadBackup}
                  className="px-3 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-[11px] font-medium text-neutral-600 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Descargar archivo .json con tus fotos y catálogo"
                >
                  <Download className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Descargar Archivo</span>
                </button>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  Cerrar
                </button>

                <button
                  onClick={handleSaveToCode}
                  disabled={isSavingToCode}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#c9182b] hover:bg-[#a91222] disabled:opacity-60 text-white text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  {isSavingToCode ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Guardando en Código...</span>
                    </>
                  ) : (
                    <>
                      <HardDriveDownload className="w-4 h-4" />
                      <span>Guardar como Versión Definitiva (Código / Netlify)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
