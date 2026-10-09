import React from 'react';
import { Sparkles, LayoutDashboard, Compass } from 'lucide-react';

interface NavbarProps {
  currentView: 'portal' | 'advisor';
  onViewChange: (view: 'portal' | 'advisor') => void;
  onOpenConcierge: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  onOpenConcierge,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Title, single line wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onViewChange('portal');
            }}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-amber-400 font-display font-black text-xl shadow-sm group-hover:bg-slate-800 transition-colors">
              K
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl tracking-tight text-slate-950 whitespace-nowrap">
                KENREY
              </span>
              <span className="text-[10px] tracking-widest text-slate-500 font-semibold uppercase -mt-1">
                Real Estate · República Dominicana
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: Navigation Links, 4-5 items, single-line text links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a
            href="#propiedades"
            onClick={() => onViewChange('portal')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-slate-900"
          >
            Propiedades Exclusivas
          </a>
          <a
            href="#calculadora-roi"
            onClick={() => onViewChange('portal')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-slate-900"
          >
            Calculadora ROI & CONFOTUR
          </a>
          <a
            href="#financiamiento"
            onClick={() => onViewChange('portal')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-slate-900"
          >
            Simulador Hipotecario
          </a>
          <button
            onClick={() => onViewChange('advisor')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              currentView === 'advisor'
                ? 'text-amber-700 font-semibold border-amber-500'
                : 'text-slate-600 hover:text-slate-950 border-transparent hover:border-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-amber-600" />
            Consola CTO & Asesores
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + View Selector */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Mode Switcher */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => onViewChange('portal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                currentView === 'portal'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Vista de Inversionista y Comprador"
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Portal Inversor</span>
            </button>
            <button
              onClick={() => onViewChange('advisor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                currentView === 'advisor'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Panel Interno de Asesores y Estrategia"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Panel Asesor</span>
            </button>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={onOpenConcierge}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-950 rounded-lg hover:bg-slate-800 transition-colors shadow-xs whitespace-nowrap shrink-0 group"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span>Pre-Calificar Inversión</span>
          </button>
        </div>
      </div>
    </header>
  );
};
