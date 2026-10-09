import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Globe, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenConcierge: () => void;
  onViewChange: (view: 'portal' | 'advisor') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConcierge, onViewChange }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-display font-black text-lg flex items-center justify-center">
                K
              </div>
              <span className="font-display font-bold text-lg text-white tracking-tight">
                KENREY REAL ESTATE
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Plataforma PropTech líder en captación e inteligencia de inversión inmobiliaria en la República Dominicana. Especialistas en propiedades de alta rentabilidad con exenciones bajo la Ley CONFOTUR 158-01 y desarrollos corporativos de primer nivel.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Torre Empresarial Piantini, Piso 11, Santo Domingo, R.D.</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-mono-numbers">+1 (809) 555-0199 / WhatsApp Business</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>inversiones@kenreyrealestate.com</span>
              </div>
            </div>
          </div>

          {/* Destinos Prime */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Destinos de Inversión
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#propiedades" className="hover:text-white transition-colors">Punta Cana & Bávaro</a></li>
              <li><a href="#propiedades" className="hover:text-white transition-colors">Cap Cana Marina & Golf</a></li>
              <li><a href="#propiedades" className="hover:text-white transition-colors">Las Terrenas (Samaná)</a></li>
              <li><a href="#propiedades" className="hover:text-white transition-colors">Santo Domingo (Piantini & Naco)</a></li>
              <li><a href="#propiedades" className="hover:text-white transition-colors">Santiago de los Caballeros</a></li>
            </ul>
          </div>

          {/* Herramientas Financieras */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Herramientas PropTech
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#calculadora-roi" className="hover:text-white transition-colors">Calculadora de ROI Airbnb</a></li>
              <li><a href="#calculadora-roi" className="hover:text-white transition-colors">Escudo Fiscal CONFOTUR (15 años)</a></li>
              <li><a href="#financiamiento" className="hover:text-white transition-colors">Préstamos para No Residentes</a></li>
              <li><a href="#financiamiento" className="hover:text-white transition-colors">Hipotecas Banco Popular / BHD</a></li>
              <li>
                <button
                  onClick={() => onViewChange('advisor')}
                  className="text-amber-400 hover:text-amber-300 font-semibold"
                >
                  Consola de Asesor & CTO
                </button>
              </li>
            </ul>
          </div>

          {/* Marco Legal & Fiduciario */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Marco Legal y Fiscal
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Ley 158-01 CONFOTUR</span>
              </li>
              <li>Registro de Títulos de RD</li>
              <li>Fideicomisos Inmobiliarios (Ley 189-11)</li>
              <li>Régimen Tributario DGII</li>
              <li>Asesoría Legal Bilingüe</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Kenrey Real Estate Dominicana S.R.L. Todos los derechos reservados.
          </div>

          <div className="flex items-center gap-6">
            <button onClick={scrollToTop} className="flex items-center gap-1 hover:text-white transition-colors">
              <span>Volver arriba</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
