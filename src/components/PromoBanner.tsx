import React, { useState } from 'react';
import { Sparkles, MessageCircle, ArrowRight, Check, Tag } from 'lucide-react';
import { STORE_WHATSAPP_NUMBER } from '../data/products';

interface PromoBannerProps {
  onShopNow: () => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
  onShopNow,
  onOpenCart,
  cartCount,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('INAUGURACION10K');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const directWhatsappUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    '¡Hola Maison Cherry! 🍒 Quiero aprovechar la promo de -$10.000 OFF POR INAUGURACIÓN para encargar un combo.'
  )}`;

  return (
    <section id="promocion" className="w-full px-4 sm:px-6 py-6 md:py-8 max-w-7xl mx-auto">
      {/* Huge Editorial Card with Apple luxury restraint */}
      <div className="relative overflow-hidden rounded-3xl bg-neutral-950 text-white shadow-2xl border border-neutral-800">
        {/* Subtle cherry ambient radiance */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#c9182b]/30 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#c9182b]/20 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col items-center text-center">
          {/* Subtle header tag */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#ff4d6d] font-semibold mb-4">
            <Sparkles className="w-4 h-4 text-[#ff4d6d]" />
            <span>Maison Cherry Catamarca · Lanzamiento Oficial</span>
          </div>

          {/* Cartel Enorme */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal tracking-tight text-white max-w-4xl leading-[1.05]">
            <span className="block text-[#ff4d6d] font-semibold">-$10.000 OFF</span>
            <span className="block text-white mt-1">POR INAUGURACIÓN</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl font-light leading-relaxed">
            Válido en la compra de cualquiera de nuestros 3 combos de accesorios.
            <span className="block mt-1 font-medium text-white">
              Hasta fin de octubre o agotar stock.
            </span>
          </p>

          {/* Highlight badges & coupon pill */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-neutral-200 transition-colors cursor-pointer"
              title="Copiar cupón"
            >
              <Tag className="w-3.5 h-3.5 text-[#ff4d6d]" />
              <span>Código: <strong className="text-white tracking-wider">INAUGURACION10K</strong></span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <span className="text-[10px] text-neutral-400 underline">Copiar</span>
              )}
            </button>
            <span className="text-neutral-500 hidden sm:inline">·</span>
            <span className="text-neutral-400">Aplicado automáticamente en tu carrito</span>
          </div>

          {/* Prominent Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md">
            {/* Primary Highlight Button: WhatsApp Direct Order */}
            <a
              href={directWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-semibold rounded-2xl transition-all shadow-lg hover:shadow-[#25D366]/20 active:scale-[0.98] whitespace-nowrap"
            >
              <MessageCircle className="w-5 h-5 fill-white stroke-none" />
              <span>Pedir por WhatsApp Directo</span>
            </a>

            {/* Explore Combos or View Cart */}
            {cartCount > 0 ? (
              <button
                onClick={onOpenCart}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-neutral-950 hover:bg-neutral-100 text-sm font-semibold rounded-2xl transition-all active:scale-[0.98] whitespace-nowrap cursor-pointer"
              >
                <span>Finalizar Pedido ({cartCount})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onShopNow}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-2xl backdrop-blur-sm transition-all active:scale-[0.98] border border-white/15 whitespace-nowrap cursor-pointer"
              >
                <span>Ver los 3 Combos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Micro trust indicators */}
          <div className="mt-8 pt-6 border-t border-neutral-800/80 w-full max-w-xl grid grid-cols-3 gap-2 text-center text-[11px] sm:text-xs text-neutral-400">
            <div>
              <p className="font-semibold text-white">Catamarca Capital</p>
              <p className="text-[10px] text-neutral-400">Entrega rápida local</p>
            </div>
            <div className="border-x border-neutral-800">
              <p className="font-semibold text-white">Efectivo / Transferencia</p>
              <p className="text-[10px] text-neutral-400">Sin complicaciones</p>
            </div>
            <div>
              <p className="font-semibold text-white">Confirmación Inmediata</p>
              <p className="text-[10px] text-neutral-400">+54 383 476-5670</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
