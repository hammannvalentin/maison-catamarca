import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { MaisonCherryLogo } from './MaisonCherryLogo';

interface HeroProps {
  onExplore: () => void;
  onSelectCombo: (comboId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onSelectCombo }) => {
  return (
    <section id="hero" className="relative w-full pt-6 pb-12 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top subtle brand mark header */}
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <MaisonCherryLogo size="lg" className="my-2" />
          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-neutral-500 font-medium">
            Joyería & Bijouterie de Autor · Catamarca, Argentina
          </p>
        </div>

        {/* Apple-style Split Showcase Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/80 shadow-sm">
          {/* Left Column: Editorial Manifesto & Quick Access */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#c9182b] uppercase tracking-[0.2em] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9182b]" />
              <span>Colección Oficial 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-neutral-900 leading-[1.08] tracking-tight text-balance font-normal">
              Combos de accesorios diseñados para destacar.
            </h1>

            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed font-light">
              Elegí entre nuestros 3 combos exclusivos: el clásico toque rojo en dorado, 
              la sofisticación de las perlas con cerezas rubí facetadas o el pack friends compartido para regalar.
            </p>

            {/* Quick 3 Combos mini-switcher buttons */}
            <div className="mt-6 sm:mt-8 space-y-2.5">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block">
                Los 3 Combos Disponibles:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => onSelectCombo('cherry-classic')}
                  className="p-3 text-left rounded-xl bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200/70 transition-all group cursor-pointer"
                >
                  <p className="text-xs font-semibold text-neutral-900 group-hover:text-[#c9182b] transition-colors">
                    Cherry Clasic
                  </p>
                  <p className="text-[11px] text-neutral-500 font-mono tabular-nums">$32.200</p>
                </button>

                <button
                  onClick={() => onSelectCombo('cherry-perla')}
                  className="p-3 text-left rounded-xl bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200/70 transition-all group cursor-pointer"
                >
                  <p className="text-xs font-semibold text-neutral-900 group-hover:text-[#c9182b] transition-colors">
                    Cherry Perla
                  </p>
                  <p className="text-[11px] text-neutral-500 font-mono tabular-nums">$42.200</p>
                </button>

                <button
                  onClick={() => onSelectCombo('friends')}
                  className="p-3 text-left rounded-xl bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200/70 transition-all group cursor-pointer"
                >
                  <p className="text-xs font-semibold text-neutral-900 group-hover:text-[#c9182b] transition-colors">
                    Friends Pack
                  </p>
                  <p className="text-[11px] text-neutral-500 font-mono tabular-nums">$72.200</p>
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={onExplore}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold rounded-2xl transition-all active:scale-[0.98] shadow-sm cursor-pointer"
              >
                <span>Ver los 3 Combos</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                <Sparkles className="w-4 h-4 text-[#c9182b]" />
                <span>San Fernando del Valle de Catamarca</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero High-Res Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-neutral-100 shadow-inner group">
              <img
                src="/src/assets/images/hero_maison_cherry_1791472687984.jpg"
                alt="Maison Cherry Joyería Catamarca"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/85 backdrop-blur-md rounded-xl border border-white/40 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-neutral-900">Catamarca Capital</p>
                  <p className="text-[11px] text-neutral-500">Efectivo o Transferencia bancaria</p>
                </div>
                <span className="text-[11px] font-bold text-[#c9182b] uppercase tracking-wider">Concept Store</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
