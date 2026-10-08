import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, MessageCircle, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { STORE_WHATSAPP_NUMBER } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setQuantity(1);
      setAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const allImages = [product.image, ...(product.secondaryImages || [])];

  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(product.price);

  const formattedOriginal = product.originalPrice
    ? new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0,
      }).format(product.originalPrice)
    : null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappInquiryUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `¡Hola Maison Cherry! Me interesa el "${product.name}" (${formattedPrice}). ¿Tienen stock disponible para entrega o retiro en Catamarca?`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-neutral-100 text-neutral-800 transition-colors shadow-sm"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Column */}
        <div className="md:w-1/2 p-5 sm:p-6 flex flex-col justify-between bg-neutral-50/70 border-b md:border-b-0 md:border-r border-neutral-200">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-sm border border-neutral-100">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
              referrerPolicy="no-referrer"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-neutral-900 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnail row */}
          {allImages.length > 1 && (
            <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    (selectedImage || product.image) === img
                      ? 'border-[#c9182b] ring-2 ring-[#c9182b]/20 scale-105'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`Ver foto ${idx + 1}`}
                >
                  <img src={img} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="mt-4 p-3 rounded-xl bg-white border border-neutral-200/80 flex items-center justify-between text-xs text-neutral-600">
            <span className="font-medium">Fotos oficiales Maison Cherry</span>
            <span className="text-[#c9182b] font-bold text-[11px]">Stock Inmediato</span>
          </div>
        </div>

        {/* Info Column */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c9182b] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{product.categoryLabel}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900">
              {product.name}
            </h2>

            <p className="mt-2 text-sm text-neutral-600 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Pricing Section */}
            <div className="mt-5 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-serif font-bold text-neutral-900 font-mono tabular-nums">
                  {formattedPrice}
                </span>
                {formattedOriginal && (
                  <span className="text-sm text-neutral-400 line-through font-mono tabular-nums">
                    {formattedOriginal}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-[#c9182b] font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c9182b]" />
                <span>Descuento de -$10.000 OFF por inauguración aplicable en carrito</span>
              </p>
              <p className="mt-1 text-[11px] text-neutral-500">
                Formas de pago: Transferencia bancaria o Efectivo al retirar.
              </p>
            </div>

            {/* Included accessories list */}
            {product.includes && product.includes.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2.5">
                  ¿Qué incluye este combo?
                </h4>
                <ul className="space-y-2 text-xs text-neutral-700">
                  {product.includes.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c9182b] shrink-0 mt-1.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Trust points */}
            <div className="mt-6 grid grid-cols-2 gap-2 text-[11px] text-neutral-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Garantía de calidad</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#c9182b]" />
                <span>Catamarca Capital</span>
              </div>
            </div>
          </div>

          {/* Action Module */}
          <div className="mt-8 pt-4 border-t border-neutral-200 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border border-neutral-300 rounded-xl p-1 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
                  aria-label="Disminuir cantidad"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm font-semibold font-mono tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAdd}
                className={`flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡Agregado a la Bolsa!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Añadir a la Bolsa</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct WhatsApp Consultation */}
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Consultar este combo por WhatsApp (+54 383 476-5670)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
