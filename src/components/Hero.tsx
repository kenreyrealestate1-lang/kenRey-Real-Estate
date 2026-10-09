import React from 'react';
import { ShieldCheck, Percent, ArrowRight, Sparkles, Building2, Globe2, Home } from 'lucide-react';
import { PropertyZone } from '../types';

interface HeroProps {
  buyerAudience: 'international' | 'local';
  onAudienceChange: (audience: 'international' | 'local') => void;
  onOpenConcierge: () => void;
  selectedZone: PropertyZone | 'Todas';
  onZoneSelect: (zone: PropertyZone | 'Todas') => void;
  onScrollToSearch: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  buyerAudience,
  onAudienceChange,
  onOpenConcierge,
  selectedZone,
  onZoneSelect,
  onScrollToSearch,
}) => {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden pt-8 pb-16 lg:py-20">
      {/* Background Graphic & Accent Glow */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <img
          src="/src/assets/images/hero_punta_cana_luxury_1791564000547.jpg"
          alt="Luxury Villa Punta Cana"
          className="w-full h-full object-cover filter brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Audience Segment Switcher */}
        <div className="inline-flex p-1 bg-slate-900/90 border border-slate-800 rounded-xl mb-6 backdrop-blur-sm">
          <button
            onClick={() => onAudienceChange('international')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              buyerAudience === 'international'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span>Inversionistas Internacionales & Diáspora (USD)</span>
          </button>
          <button
            onClick={() => onAudienceChange('local')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              buyerAudience === 'local'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Compradores & Inversionistas Locales (RD)</span>
          </button>
        </div>

        {/* 2-Column Balanced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Column Left: Value Proposition */}
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white leading-tight max-w-2xl text-balance">
              {buyerAudience === 'international' ? (
                <>
                  Inversiones Inmobiliarias de Alto Retorno con{' '}
                  <span className="text-amber-400">0% Impuestos</span> en República Dominicana
                </>
              ) : (
                <>
                  Patrimonio y Plusvalía Residencial en las{' '}
                  <span className="text-amber-400">Zonas Prime</span> de República Dominicana
                </>
              )}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              {buyerAudience === 'international' ? (
                <>
                  Adquiere villas y apartamentos de lujo en Punta Cana, Cap Cana y Las Terrenas amparados por la{' '}
                  <strong className="text-white font-semibold">Ley CONFOTUR 158-01</strong>. Genera entre 8% y 13% de Cap Rate neto en dólares sin pagar impuestos de transferencia ni IPI durante 15 años.
                </>
              ) : (
                <>
                  Descubre las mejores torres de Santo Domingo (Piantini, Naco, Bella Vista) y proyectos residenciales en Santiago con planes de pago fraccionados en construcción y pre-aprobación bancaria directa con Banco Popular, BHD y Banreservas.
                </>
              )}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenConcierge}
                className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-lg hover:shadow-amber-400/20 group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Pre-Calificar Perfil de Inversión</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onScrollToSearch}
                className="flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>Explorar Propiedades</span>
              </button>
            </div>
          </div>

          {/* Column Right: Live Metric Snapshot */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Garantías de la Inversión Kenrey
                </span>
                <span className="text-xs text-amber-400 font-mono-numbers font-semibold">
                  Actualizado 2026
                </span>
              </div>

              {buyerAudience === 'international' ? (
                <>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                      <Percent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Ley CONFOTUR 158-01</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Exención total del 3% de impuesto de transferencia y 1% anual del IPI durante 15 años. Ahorros de hasta $80,000+ USD por propiedad.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Seguridad Jurídica & Título Limpio</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Todos los proyectos cuentan con Fideicomiso Inmobiliario regulado y verificación en el Registro de Títulos de la República Dominicana.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Polígono Central & Plusvalía Asegurada</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Proyectos en Piantini y Naco con revalorización promedio de obra de 18% a 25% entre preventa y entrega final.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                      <Percent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Convenios con Banca Dominicana</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Financiamiento de hasta el 80% del valor del inmueble a tasas preferenciales de feria hipotecaria en pesos o dólares.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Quick Regional Navigation Filter */}
              <div className="pt-2 border-t border-slate-800">
                <span className="block text-xs text-slate-400 mb-2 font-medium">Zonas de Alta Rentabilidad:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(['Todas', 'Punta Cana', 'Cap Cana', 'Las Terrenas', 'Santo Domingo', 'Santiago'] as const).map((zone) => (
                    <button
                      key={zone}
                      onClick={() => onZoneSelect(zone)}
                      className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                        selectedZone === zone
                          ? 'bg-amber-400 text-slate-950 font-bold'
                          : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      {zone}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof Row below the hero */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-300">
          <div>
            <span className="block text-2xl lg:text-3xl font-display font-bold text-white font-mono-numbers">
              8.5% - 13.2%
            </span>
            <span className="text-xs text-slate-400 mt-0.5 block">
              Cap Rate neto promedio en USD
            </span>
          </div>

          <div>
            <span className="block text-2xl lg:text-3xl font-display font-bold text-amber-400 font-mono-numbers">
              15 Años
            </span>
            <span className="text-xs text-slate-400 mt-0.5 block">
              Exoneración fiscal Ley CONFOTUR
            </span>
          </div>

          <div>
            <span className="block text-2xl lg:text-3xl font-display font-bold text-white font-mono-numbers">
              &lt; 3 Minutos
            </span>
            <span className="text-xs text-slate-400 mt-0.5 block">
              Speed-to-Lead por WhatsApp Business
            </span>
          </div>

          <div>
            <span className="block text-2xl lg:text-3xl font-display font-bold text-emerald-400 font-mono-numbers">
              $145M+ USD
            </span>
            <span className="text-xs text-slate-400 mt-0.5 block">
              Inventario exclusivo en portafolio
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
