import React, { useState } from 'react';
import { Search, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = products.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      item.tagline.toLowerCase().includes(q) ||
      item.categoryLabel.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.includes.some((inc) => inc.toLowerCase().includes(q))
    );
  });

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 sm:pt-20 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center gap-3 bg-neutral-50/70">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Buscar por combo, perlas, cereza, aritos, collar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent border-none focus:outline-none text-neutral-900 placeholder:text-neutral-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-500"
            aria-label="Cerrar búsqueda"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-5 py-2.5 bg-white border-b border-neutral-100 flex items-center gap-2 overflow-x-auto text-xs text-neutral-500">
          <span className="shrink-0 text-[11px] font-medium text-neutral-400">Combos:</span>
          {['Cherry Clasic', 'Cherry Perla', 'Friends'].map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="shrink-0 px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 transition-colors cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2 divide-y divide-neutral-100">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-neutral-500">
              <p className="text-sm font-medium">No se encontraron productos para "{query}"</p>
              <p className="text-xs text-neutral-400 mt-1">Intentá buscando "Cherry" o "Combos".</p>
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                className="pt-2 first:pt-0 flex items-center gap-3.5 p-2 rounded-xl hover:bg-neutral-50 transition-colors group"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-14 h-14 rounded-xl object-cover bg-neutral-100 border border-neutral-200 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-2 text-[10px] uppercase font-semibold text-[#c9182b]">
                    <span>{product.categoryLabel}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-neutral-900 truncate group-hover:text-[#c9182b] transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-neutral-500 truncate">{product.tagline}</p>
                </div>

                <div className="text-right shrink-0 flex items-center gap-3">
                  <span className="text-xs font-semibold font-mono tabular-nums text-neutral-900">
                    {formatPrice(product.price)}
                  </span>
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    className="p-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl transition-colors"
                    title="Añadir al carrito"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
