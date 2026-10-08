import React from 'react';
import { ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { STORE_WHATSAPP_NUMBER } from '../data/products';

interface MobileStickyBarProps {
  cartCount: number;
  totalPrice: number;
  onOpenCart: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  cartCount,
  totalPrice,
  onOpenCart,
}) => {
  const formattedTotal = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(totalPrice);

  return (
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-30 pointer-events-none">
      <div className="pointer-events-auto bg-neutral-900/95 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-xl border border-white/10 flex items-center justify-between gap-3 max-w-md mx-auto">
        {cartCount > 0 ? (
          <>
            <div className="flex items-center gap-2.5" onClick={onOpenCart}>
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-white" />
                <span className="absolute -top-1.5 -right-2 bg-[#c9182b] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <div className="leading-tight">
                <span className="text-[10px] text-neutral-400 block uppercase tracking-wider">
                  Total con -$10.000 OFF:
                </span>
                <span className="text-xs font-bold font-mono tabular-nums text-white">
                  {formattedTotal}
                </span>
              </div>
            </div>

            <button
              onClick={onOpenCart}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap"
            >
              <span>Comprar x WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c9182b] animate-pulse" />
              <span className="text-[11px] font-medium text-neutral-300">
                -$10.000 OFF Inauguración
              </span>
            </div>

            <a
              href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent('¡Hola Maison Cherry! Quiero consultar por los combos de accesorios.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-neutral-900 text-xs font-semibold rounded-xl transition-all active:scale-95 whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Consultar WhatsApp</span>
            </a>
          </>
        )}
      </div>
    </div>
  );
};
