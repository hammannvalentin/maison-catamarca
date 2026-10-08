import React from 'react';
import { ShoppingBag, Search, MessageCircle, Lock } from 'lucide-react';
import { STORE_WHATSAPP_NUMBER } from '../data/products';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onNavigate,
  onOpenAdmin,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Brand title, single element wordmark */}
        <button
          onClick={() => onNavigate('hero')}
          className="group flex items-center gap-2.5 text-left focus-visible:outline-none cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#c9182b] transition-transform group-hover:scale-125" />
          <span className="font-serif text-lg tracking-[0.2em] font-medium text-neutral-900 uppercase">
            MAISON CHERRY
          </span>
        </button>

        {/* Zone 2: Clean text navigation links (No packaging) */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.18em] font-medium text-neutral-600">
          <button
            onClick={() => onNavigate('combos')}
            className="hover:text-neutral-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            Los 3 Combos
          </button>
          <button
            onClick={() => onNavigate('promocion')}
            className="hover:text-[#c9182b] transition-colors whitespace-nowrap font-semibold text-[#c9182b] cursor-pointer"
          >
            -$10.000 OFF Inauguración
          </button>
          <button
            onClick={() => onNavigate('contacto')}
            className="hover:text-neutral-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            Contacto & WhatsApp
          </button>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSearch}
            className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
            title="Buscar combos"
            aria-label="Buscar"
          >
            <Search className="w-4 h-4" />
          </button>

          <a
            href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent('¡Hola Maison Cherry! Me gustaría consultar por sus combos.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-neutral-800 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200/80 rounded-full transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={onOpenAdmin}
            className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
            title="Panel de Administración (Dueña)"
            aria-label="Panel Administrador"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center p-2.5 bg-neutral-900 text-white hover:bg-neutral-800 rounded-full transition-transform active:scale-95 shadow-sm cursor-pointer"
            aria-label={`Ver bolsa con ${cartCount} combos`}
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#c9182b] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white tabular-nums animate-in fade-in zoom-in">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
