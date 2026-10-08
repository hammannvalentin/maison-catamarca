import React from 'react';
import { MaisonCherryLogo } from './MaisonCherryLogo';
import { STORE_WHATSAPP_NUMBER, STORE_INSTAGRAM } from '../data/products';
import { Instagram, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  return (
    <footer className="w-full bg-[#111111] text-white pt-16 pb-24 sm:pb-16 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          {/* Logo with inverted style */}
          <MaisonCherryLogo size="md" inverted={true} showSubtitle={true} />

          {/* Clean Navigation Links */}
          <nav className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium">
            <button
              onClick={() => onNavigate('hero')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Inicio
            </button>
            <button
              onClick={() => onNavigate('combos')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Los 3 Combos
            </button>
            <button
              onClick={() => onNavigate('promocion')}
              className="text-[#ff4d6d] hover:text-white transition-colors font-semibold cursor-pointer"
            >
              -$10.000 OFF
            </button>
            <button
              onClick={() => onNavigate('contacto')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contacto
            </button>
          </nav>

          {/* Social Links Badge */}
          <div className="mt-6 flex items-center justify-center gap-4 text-xs">
            <a
              href={`https://instagram.com/${STORE_INSTAGRAM}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-500" />
              <span>@{STORE_INSTAGRAM}</span>
            </a>

            <a
              href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>+54 383 476-5670</span>
            </a>
          </div>

          {/* Location & Terms */}
          <div className="mt-8 pt-6 border-t border-neutral-800 w-full max-w-lg flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-3">
            <p>San Fernando del Valle de Catamarca, Argentina</p>
            <p>Efectivo & Transferencia Bancaria</p>
          </div>

          {/* Legal / Copyright & Admin Access */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-[11px] text-neutral-600">
            <p>© {new Date().getFullYear()} Maison Cherry Concept Store. Todos los derechos reservados.</p>
            <span className="hidden sm:inline">·</span>
            <button
              onClick={onOpenAdmin}
              className="text-neutral-500 hover:text-neutral-300 underline transition-colors cursor-pointer"
            >
              Panel Administrador (Precios y Fotos)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
