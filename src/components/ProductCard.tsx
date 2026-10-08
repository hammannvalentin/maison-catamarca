import React from 'react';
import { Plus, Check, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onSelect: (product: Product) => void;
  isAdded?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onSelect,
  isAdded = false,
}) => {
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

  return (
    <article className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-neutral-200/80 hover:border-neutral-300 transition-all duration-300 hover:shadow-lg">
      {/* Product Image Stage */}
      <div
        onClick={() => onSelect(product)}
        className="relative aspect-[4/3] bg-neutral-100/70 overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-neutral-900/90 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full shadow-sm">
            {product.badge}
          </div>
        )}

        {/* Quick View Overlay on hover */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-neutral-900 text-xs font-semibold shadow-md">
            <Eye className="w-3.5 h-3.5" />
            <span>Ver fotos y detalles</span>
          </span>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Status */}
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#c9182b] font-semibold mb-1.5">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span className="text-emerald-700">Stock Disponible</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelect(product)}
            className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 group-hover:text-[#c9182b] transition-colors cursor-pointer leading-tight"
          >
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="mt-2 text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed font-light">
            {product.tagline}
          </p>

          {/* Key Included Items preview */}
          {product.includes && product.includes.length > 0 && (
            <ul className="mt-3.5 space-y-1.5 text-xs text-neutral-600 border-t border-neutral-100 pt-3">
              {product.includes.slice(0, 3).map((item, idx) => (
                <li key={idx} className="truncate flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c9182b] shrink-0" />
                  <span className="truncate">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="mt-6 pt-4 border-t border-neutral-100 flex items-end justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-semibold font-mono tabular-nums text-neutral-900">
                {formattedPrice}
              </span>
              {formattedOriginal && (
                <span className="text-xs text-neutral-400 line-through font-mono tabular-nums">
                  {formattedOriginal}
                </span>
              )}
            </div>
            <span className="text-[11px] text-neutral-500 block font-medium mt-0.5">
              Efectivo o Transferencia bancaria
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all active:scale-95 shadow-xs ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-900 hover:bg-neutral-800 text-white'
            }`}
            aria-label={`Agregar ${product.name} al carrito`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Agregado</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
