import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, MessageCircle, Sparkles, Check } from 'lucide-react';
import { CartItem, CustomerOrderInfo } from '../types';
import { INAUGURATION_DISCOUNT_AMOUNT, STORE_WHATSAPP_NUMBER } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  discountAmount?: number;
  whatsappNumber?: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  discountAmount = INAUGURATION_DISCOUNT_AMOUNT,
  whatsappNumber = STORE_WHATSAPP_NUMBER,
}) => {
  const [customerInfo, setCustomerInfo] = useState<CustomerOrderInfo>({
    name: '',
    phone: '',
    city: 'San Fernando del Valle de Catamarca',
    address: '',
    deliveryMethod: 'retiro',
    paymentMethod: 'transferencia',
    notes: '',
  });

  const [nameError, setNameError] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // Apply inauguration discount
  const discount = items.length > 0 ? Math.min(discountAmount, subtotal) : 0;
  const total = Math.max(0, subtotal - discount);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(amount);

  const handleCheckoutViaWhatsApp = () => {
    if (!customerInfo.name.trim()) {
      setNameError(true);
      const nameInput = document.getElementById('customer-name-input');
      nameInput?.focus();
      return;
    }
    setNameError(false);

    const deliveryLabels = {
      retiro: '📍 Retiro en Catamarca Capital (Punto de entrega coordinado)',
      envio_catamarca: `🛵 Envío a domicilio en SFV de Catamarca (${customerInfo.address || 'A convenir'})`,
      envio_nacional: `📦 Envío Nacional (${customerInfo.address || 'A convenir'})`,
    };

    const paymentLabels = {
      transferencia: 'Transferencia bancaria / Alias',
      efectivo: 'Efectivo al retirar',
    };

    const itemsSummary = items
      .map(
        (item) =>
          `• ${item.quantity}x *${item.product.name}* (${formatCurrency(item.product.price)})`
      )
      .join('\n');

    const message = `¡Hola Maison Cherry! 🍒 Quiero realizar un pedido de los combos:

👤 *Cliente:* ${customerInfo.name.trim()}
📱 *WhatsApp:* ${customerInfo.phone.trim() || 'El mismo número'}
${deliveryLabels[customerInfo.deliveryMethod]}

🛒 *Detalle del Pedido:*
${itemsSummary}

💰 *Subtotal:* ${formatCurrency(subtotal)}
🎉 *Descuento Inauguración:* -${formatCurrency(discount)}
✨ *TOTAL A PAGAR:* ${formatCurrency(total)}

💳 *Medio de pago:* ${paymentLabels[customerInfo.paymentMethod]} (Solo efectivo o transferencia)
${customerInfo.notes ? `📝 *Nota:* ${customerInfo.notes}\n` : ''}
¿Me confirman disponibilidad para coordinar el pago y entrega? ¡Muchas gracias!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encoded}`;

    setOrderSent(true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-neutral-200">
          {/* Drawer Header */}
          <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c9182b]" />
              <h2 className="text-base font-serif font-bold text-neutral-900 tracking-wide uppercase">
                Bolsa de Combos ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
              aria-label="Cerrar bolsa"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          {items.length === 0 ? (
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
                <span className="text-2xl">🍒</span>
              </div>
              <h3 className="text-lg font-serif font-semibold text-neutral-900">
                Tu bolsa está vacía
              </h3>
              <p className="mt-2 text-xs text-neutral-500 max-w-xs leading-relaxed">
                Seleccioná cualquiera de nuestros 3 combos exclusivos de Maison Cherry para disfrutar el descuento de inauguración.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-5 py-2.5 bg-neutral-900 text-white text-xs font-semibold rounded-xl hover:bg-neutral-800 transition-colors"
              >
                Ver los 3 Combos
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {/* Inauguration banner reminder inside cart */}
                <div className="p-3 bg-red-50/90 border border-red-200 rounded-2xl flex items-center gap-2.5 text-xs text-[#9b111e]">
                  <Sparkles className="w-4 h-4 text-[#c9182b] shrink-0" />
                  <div>
                    <span className="font-bold">-$10.000 OFF por Inauguración</span> aplicado a tu pedido.
                  </div>
                </div>

                <div className="divide-y divide-neutral-100">
                  {items.map((item) => (
                    <div key={item.product.id} className="py-3 flex gap-3.5 items-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover bg-neutral-100 shrink-0 border border-neutral-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-neutral-900 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-neutral-500 font-mono tabular-nums">
                          {formatCurrency(item.product.price)} c/u
                        </p>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50 p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="p-1 hover:text-[#c9182b] text-neutral-600 rounded"
                              aria-label="Restar 1"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-medium font-mono tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="p-1 hover:text-[#c9182b] text-neutral-600 rounded"
                              aria-label="Sumar 1"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-1 text-neutral-400 hover:text-red-600 transition-colors"
                            title="Eliminar combo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-semibold font-mono tabular-nums text-neutral-900">
                          {formatCurrency(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Checkout Info Box */}
                <div className="mt-6 pt-4 border-t border-neutral-200 space-y-3 bg-neutral-50/70 p-4 rounded-2xl border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                      Datos de Confirmación
                    </span>
                    <span className="text-[10px] text-neutral-400">Vía WhatsApp</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 mb-1">
                      Nombre y Apellido del Cliente <span className="text-[#c9182b]">*</span>
                    </label>
                    <input
                      id="customer-name-input"
                      type="text"
                      placeholder="Ej. Valentina Morales"
                      value={customerInfo.name}
                      onChange={(e) => {
                        setCustomerInfo({ ...customerInfo, name: e.target.value });
                        if (e.target.value.trim()) setNameError(false);
                      }}
                      className={`w-full px-3 py-2 text-xs rounded-xl bg-white border ${
                        nameError ? 'border-red-500 ring-2 ring-red-200' : 'border-neutral-300'
                      } focus:outline-none focus:border-neutral-900`}
                    />
                    {nameError && (
                      <p className="text-[10px] text-red-600 mt-1">
                        Ingresá tu nombre para enviar el pedido por WhatsApp.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 mb-1">
                      Teléfono / WhatsApp (Opcional)
                    </label>
                    <input
                      type="tel"
                      placeholder="Ej. 3834-123456"
                      value={customerInfo.phone}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 mb-1">
                      Modalidad de Entrega
                    </label>
                    <select
                      value={customerInfo.deliveryMethod}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          deliveryMethod: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900"
                    >
                      <option value="retiro">Retiro en Catamarca Capital (Punto de entrega coordinado)</option>
                      <option value="envio_catamarca">Cadetería en SFV de Catamarca</option>
                      <option value="envio_nacional">Envío Nacional por Correo / Andreani</option>
                    </select>
                  </div>

                  {customerInfo.deliveryMethod !== 'retiro' && (
                    <div>
                      <label className="block text-[11px] font-medium text-neutral-700 mb-1">
                        Dirección de entrega
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. Esquiú 520, Catamarca"
                        value={customerInfo.address}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, address: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-neutral-300 focus:outline-none focus:border-neutral-900"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 mb-1">
                      Medio de Pago Aceptado
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() =>
                          setCustomerInfo({ ...customerInfo, paymentMethod: 'transferencia' })
                        }
                        className={`p-2 rounded-xl text-center border font-medium transition-colors ${
                          customerInfo.paymentMethod === 'transferencia'
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : 'bg-white text-neutral-700 border-neutral-300'
                        }`}
                      >
                        Transferencia (Alias/CBU)
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setCustomerInfo({ ...customerInfo, paymentMethod: 'efectivo' })
                        }
                        className={`p-2 rounded-xl text-center border font-medium transition-colors ${
                          customerInfo.paymentMethod === 'efectivo'
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : 'bg-white text-neutral-700 border-neutral-300'
                        }`}
                      >
                        Efectivo al Retirar
                      </button>
                    </div>
                    <p className="text-[10px] text-neutral-500 mt-1">
                      * Por ahora los pagos se efectúan por transferencia o en efectivo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Drawer Footer with Totals & WhatsApp Button */}
              <div className="p-5 border-t border-neutral-200 bg-neutral-50/90 space-y-3">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#c9182b] font-medium">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Descuento Inauguración</span>
                    </span>
                    <span className="font-mono tabular-nums">-{formatCurrency(discount)}</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                    <span>TOTAL A PAGAR</span>
                    <span className="font-mono tabular-nums text-lg text-neutral-900">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>

                {/* Primary Button: WhatsApp Direct Order */}
                <button
                  onClick={handleCheckoutViaWhatsApp}
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold rounded-2xl shadow-md transition-all active:scale-[0.98] text-sm"
                >
                  <MessageCircle className="w-5 h-5 fill-white stroke-none" />
                  <span>Finalizar Pedido vía WhatsApp</span>
                </button>

                <p className="text-[11px] text-center text-neutral-500">
                  Se abrirá WhatsApp oficial (+54 383 476-5670) con tu pedido listo.
                </p>

                {orderSent && (
                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-[11px] flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      ¡Mensaje generado!
                    </span>
                    <button
                      onClick={onClearCart}
                      className="text-[10px] text-emerald-900 underline font-semibold"
                    >
                      Vaciar bolsa
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
