import React from 'react';
import { Package, Heart, Sparkles, Gift } from 'lucide-react';

export const PackagingSection: React.FC = () => {
  return (
    <section id="packaging" className="w-full py-12 sm:py-16 bg-[#f4f2ee]/60 border-y border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Packaging Image Stage */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-neutral-200/80 bg-white">
              <img
                src="/src/assets/images/maison_packaging_1791472748362.jpg"
                alt="Packaging artesanal Maison Cherry Catamarca"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-2xl border border-white/60 text-xs flex items-center justify-between">
                <div>
                  <p className="font-semibold text-neutral-900">Sobre Kraft de Autor</p>
                  <p className="text-[11px] text-neutral-500">Hecho a mano en Catamarca con lazo rojo</p>
                </div>
                <span className="text-[#c9182b] font-bold">100% Incluido</span>
              </div>
            </div>
          </div>

          {/* Editorial Text Details */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c9182b] font-semibold mb-2">
              <Gift className="w-4 h-4" />
              <span>Experiencia Unboxing</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-neutral-900 leading-tight">
              Cada pedido, una experiencia lista para regalar o regalarte.
            </h2>

            <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
              En Maison Cherry creemos que los detalles lo son todo. Cada uno de nuestros combos 
              se entrega en nuestro sobre artesanal de papel kraft de alto gramaje, cuidadosamente 
              atado con cordón o lazo de satén rojo rubí y sellado al estilo de los antiguos concept stores parisinos.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/70 shadow-2xs">
                <div className="flex items-center gap-2 font-semibold text-xs text-neutral-900 mb-1">
                  <Package className="w-4 h-4 text-[#c9182b]" />
                  <span>Protección & Estética</span>
                </div>
                <p className="text-xs text-neutral-500 leading-normal">
                  Joyas fijadas individualmente en tarjetas interiores de algodón texturado.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-neutral-200/70 shadow-2xs">
                <div className="flex items-center gap-2 font-semibold text-xs text-neutral-900 mb-1">
                  <Heart className="w-4 h-4 text-[#c9182b]" />
                  <span>Doble Regalo en Pack Friends</span>
                </div>
                <p className="text-xs text-neutral-500 leading-normal">
                  Incluye packaging doble para que puedas repartir los accesorios entre 2 personas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
