import React, { useState, useMemo } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';

interface CatalogSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  recentlyAddedId: string | null;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  onAddToCart,
  onSelectProduct,
  recentlyAddedId,
}) => {
  const [searchFilter, setSearchFilter] = useState<string>('');

  const filteredCombos = useMemo(() => {
    const q = searchFilter.toLowerCase().trim();
    if (!q) return products;
    return products.filter((item) => {
      return (
        item.name.toLowerCase().includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.includes.some((inc) => inc.toLowerCase().includes(q))
      );
    });
  }, [products, searchFilter]);

  return (
    <section id="combos" className="w-full py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c9182b] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tienda Oficial Maison Cherry</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 font-normal">
              Nuestros 3 Combos Exclusivos
            </h2>
            <p className="mt-2 text-sm text-neutral-600 max-w-xl font-light">
              Sets completos listos para obsequiar o lucir. Sumá tu combo a la bolsa y confirmá inmediatamente por WhatsApp con -$10.000 OFF por inauguración.
            </p>
          </div>

          {/* Quick search input */}
          <div className="w-full md:w-72">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar combos..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-white rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 shadow-2xs"
              />
            </div>
          </div>
        </div>

        {/* The 3 Main Combos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {filteredCombos.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onSelect={onSelectProduct}
              isAdded={recentlyAddedId === product.id}
            />
          ))}
        </div>

        {filteredCombos.length === 0 && (
          <div className="py-12 text-center text-neutral-500 bg-white rounded-2xl border border-neutral-200 p-8">
            <p className="text-sm font-semibold text-neutral-800">
              No se encontraron combos con ese término.
            </p>
            <button
              onClick={() => setSearchFilter('')}
              className="mt-4 px-4 py-2 bg-neutral-900 text-white text-xs font-medium rounded-xl hover:bg-neutral-800 cursor-pointer"
            >
              Ver los 3 Combos
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
