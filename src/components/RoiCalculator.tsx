import React, { useState } from 'react';
import { Calculator, ShieldCheck, TrendingUp, DollarSign, Percent, ArrowUpRight, MessageCircle, HelpCircle } from 'lucide-react';
import { Property } from '../types';

interface RoiCalculatorProps {
  selectedProperty: Property | null;
  onOpenConcierge: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({
  selectedProperty,
  onOpenConcierge,
}) => {
  // Inputs with sensible defaults or selected property values
  const [purchasePrice, setPurchasePrice] = useState<number>(
    selectedProperty ? selectedProperty.priceUSD : 285000
  );
  const [nightlyRate, setNightlyRate] = useState<number>(
    selectedProperty ? selectedProperty.estimatedNightlyRateUSD : 240
  );
  const [occupancyRate, setOccupancyRate] = useState<number>(
    selectedProperty ? selectedProperty.estimatedOccupancyPct : 70
  );
  const [propertyManagementPct, setPropertyManagementPct] = useState<number>(20); // 20% standard
  const [monthlyHoa, setMonthlyHoa] = useState<number>(250);
  const [annualUtilities, setAnnualUtilities] = useState<number>(2400);
  const [isConfotur, setIsConfotur] = useState<boolean>(
    selectedProperty ? selectedProperty.confotur.eligible : true
  );

  // Calculations
  const annualNightsRented = Math.round((365 * occupancyRate) / 100);
  const grossAnnualRevenue = annualNightsRented * nightlyRate;

  const annualPropertyManagementCost = Math.round((grossAnnualRevenue * propertyManagementPct) / 100);
  const annualHoaCost = monthlyHoa * 12;
  const totalOperatingExpenses = annualPropertyManagementCost + annualHoaCost + annualUtilities;

  const netOperatingIncome = grossAnnualRevenue - totalOperatingExpenses;
  const capRate = purchasePrice > 0 ? ((netOperatingIncome / purchasePrice) * 100).toFixed(2) : '0';

  // CONFOTUR calculations
  const transferTaxSaved = isConfotur ? Math.round(purchasePrice * 0.03) : 0;
  const annualIpiSaved = isConfotur ? Math.round(purchasePrice * 0.01) : 0;
  const totalConfotur15Years = transferTaxSaved + annualIpiSaved * 15;

  // Comparison: without CONFOTUR, client pays 3% at start + 1% yearly
  const nonConfoturEffectiveNet = netOperatingIncome - (purchasePrice * 0.01);
  const nonConfoturCapRate = purchasePrice > 0 ? ((nonConfoturEffectiveNet / purchasePrice) * 100).toFixed(2) : '0';

  const handleShareToWhatsApp = () => {
    const text = encodeURIComponent(
      `Hola Kenrey Real Estate. He generado una proyección de rentabilidad:\n\n` +
      `• Precio de Compra: $${purchasePrice.toLocaleString('en-US')} USD\n` +
      `• Ingresos Brutos Anuales: $${grossAnnualRevenue.toLocaleString('en-US')} USD (${occupancyRate}% ocupación a $${nightlyRate}/noche)\n` +
      `• Ingreso Neto Anual (NOI): $${netOperatingIncome.toLocaleString('en-US')} USD\n` +
      `• Cap Rate Neto: ${capRate}%\n` +
      `• Ahorro Ley CONFOTUR (15 años): $${totalConfotur15Years.toLocaleString('en-US')} USD\n\n` +
      `Quiero revisar propiedades que cumplan con estos parámetros de retorno.`
    );
    window.open(`https://wa.me/18095550199?text=${text}`, '_blank');
  };

  return (
    <section id="calculadora-roi" className="py-16 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Motor de Simulación Financiera & Fiscal
            </span>
            <span className="text-neutral-300">·</span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
              Algoritmo PropTech Kenrey
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
            Calculadora de Retorno de Inversión (ROI) & Escudo Fiscal CONFOTUR
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Proyecta con precisión matemática el flujo de caja en dólares, los costos operativos de renta vacacional y el impacto de la exención impositiva de la Ley 158-01 durante 15 años.
          </p>
        </div>

        {/* 2-Column Split: Controls vs Real-time Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Sliders & Inputs (5 Cols) */}
          <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-5">
            <h3 className="text-sm font-display font-bold text-slate-900 pb-3 border-b border-neutral-100 flex items-center justify-between">
              <span>Parámetros de la Inversión</span>
              {selectedProperty && (
                <span className="text-xs text-amber-700 font-normal">
                  Basado en: {selectedProperty.title}
                </span>
              )}
            </h3>

            {/* Purchase Price Input */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium text-slate-700 mb-1.5">
                <span>Precio de Compra (USD)</span>
                <span className="font-bold text-slate-950 font-mono-numbers">
                  ${purchasePrice.toLocaleString('en-US')}
                </span>
              </div>
              <input
                type="range"
                min="120000"
                max="1000000"
                step="5000"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono-numbers mt-1">
                <span>$120k</span>
                <span>$500k</span>
                <span>$1M+</span>
              </div>
            </div>

            {/* Nightly Rate Input */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium text-slate-700 mb-1.5">
                <span>Tarifa Promedio Noche Airbnb (USD)</span>
                <span className="font-bold text-slate-950 font-mono-numbers">
                  ${nightlyRate} / noche
                </span>
              </div>
              <input
                type="range"
                min="80"
                max="650"
                step="10"
                value={nightlyRate}
                onChange={(e) => setNightlyRate(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono-numbers mt-1">
                <span>$80/noche</span>
                <span>$350/noche</span>
                <span>$650/noche</span>
              </div>
            </div>

            {/* Occupancy Rate Input */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium text-slate-700 mb-1.5">
                <span>Ocupación Anual Estimada</span>
                <span className="font-bold text-slate-950 font-mono-numbers">
                  {occupancyRate}% ({annualNightsRented} noches)
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="90"
                step="2"
                value={occupancyRate}
                onChange={(e) => setOccupancyRate(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono-numbers mt-1">
                <span>40% (Baja)</span>
                <span>65% (Promedio Bávaro)</span>
                <span>90% (Alta demanda)</span>
              </div>
            </div>

            {/* Operating Expenses Settings */}
            <div className="pt-2 border-t border-neutral-100 space-y-3">
              <span className="text-xs font-bold text-slate-800 block">Costos Operativos</span>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">
                    Gestor / Operator Fee
                  </label>
                  <select
                    value={propertyManagementPct}
                    onChange={(e) => setPropertyManagementPct(Number(e.target.value))}
                    className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-slate-800 font-medium font-mono-numbers"
                  >
                    <option value={15}>15% (Autogestionado con co-host)</option>
                    <option value={20}>20% (Operador Hotelero Estándar)</option>
                    <option value={25}>25% (Full Service Luxury)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">
                    Mantenimiento HOA Mensual
                  </label>
                  <select
                    value={monthlyHoa}
                    onChange={(e) => setMonthlyHoa(Number(e.target.value))}
                    className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-slate-800 font-medium font-mono-numbers"
                  >
                    <option value={180}>$180 USD / mes</option>
                    <option value={250}>$250 USD / mes (Residencial)</option>
                    <option value={400}>$400 USD / mes (Resort / Golf)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* CONFOTUR Toggle */}
            <div className="pt-3 border-t border-neutral-100">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isConfotur}
                  onChange={(e) => setIsConfotur(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                />
                <span className="text-xs font-semibold text-slate-900">
                  Aplicar Beneficios de Ley CONFOTUR (15 Años 0% Impuestos)
                </span>
              </label>
            </div>
          </div>

          {/* Right Column: Real-time Output & Comparison (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Primary KPI Card */}
            <div className="bg-slate-950 text-white rounded-2xl p-6 shadow-xl border border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800">
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                    Rentabilidad Proyectada en Dólares
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-display font-black text-amber-400 font-mono-numbers">
                      {capRate}%
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Cap Rate Neto Anual</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                    Flujo de Caja Neto Anual (NOI)
                  </span>
                  <span className="text-2xl sm:text-3xl font-display font-black text-emerald-400 font-mono-numbers mt-1 block">
                    ${netOperatingIncome.toLocaleString('en-US')} USD
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono-numbers">
                    ~${Math.round(netOperatingIncome / 12).toLocaleString('en-US')} USD / mes libre de gastos
                  </span>
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-3 gap-4 pt-5 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Ingreso Bruto Anual</span>
                  <span className="text-sm font-bold text-white font-mono-numbers mt-0.5 block">
                    ${grossAnnualRevenue.toLocaleString('en-US')} USD
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono-numbers">{annualNightsRented} noches rentadas</span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">Gastos Operativos</span>
                  <span className="text-sm font-bold text-rose-300 font-mono-numbers mt-0.5 block">
                    -${totalOperatingExpenses.toLocaleString('en-US')} USD
                  </span>
                  <span className="text-[10px] text-slate-500">HOA + Operador + Servicios</span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">Retorno en 5 Años</span>
                  <span className="text-sm font-bold text-amber-300 font-mono-numbers mt-0.5 block">
                    ${(netOperatingIncome * 5).toLocaleString('en-US')} USD
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono-numbers">+ plusvalía del suelo</span>
                </div>
              </div>
            </div>

            {/* CONFOTUR Tax Exemption Comparison Card */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-amber-700" />
                <h4 className="text-sm font-display font-bold text-slate-900">
                  Impacto Comparativo: Con CONFOTUR vs Inversión Tradicional
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* With CONFOTUR */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-amber-950">Bajo Ley CONFOTUR 158-01</span>
                    <span className="text-[10px] font-bold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded">
                      Recomendado
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs text-amber-900">
                    <div className="flex justify-between">
                      <span>Impuesto de Transferencia (3%):</span>
                      <strong className="text-emerald-700 font-mono-numbers">$0 (Ahorras ${transferTaxSaved.toLocaleString('en-US')})</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>IPI Anual (1% a 15 años):</span>
                      <strong className="text-emerald-700 font-mono-numbers">$0 (Ahorras ${(annualIpiSaved * 15).toLocaleString('en-US')})</strong>
                    </div>
                    <div className="pt-2 border-t border-amber-200 flex justify-between font-bold">
                      <span>Escudo Fiscal Total:</span>
                      <span className="text-emerald-800 font-mono-numbers">+${totalConfotur15Years.toLocaleString('en-US')} USD</span>
                    </div>
                  </div>
                </div>

                {/* Without CONFOTUR */}
                <div className="p-4 rounded-xl bg-neutral-100 border border-neutral-200">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-slate-700">Régimen Tradicional (Sin Ley)</span>
                    <span className="text-[10px] text-slate-500 font-medium">Estándar</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Impuesto de Transferencia:</span>
                      <span className="text-rose-600 font-mono-numbers">Pagas ${Math.round(purchasePrice * 0.03).toLocaleString('en-US')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IPI Anual (15 años):</span>
                      <span className="text-rose-600 font-mono-numbers">Pagas ${Math.round(purchasePrice * 0.01 * 15).toLocaleString('en-US')}</span>
                    </div>
                    <div className="pt-2 border-t border-neutral-200 flex justify-between font-semibold text-slate-900">
                      <span>Cap Rate Real Ajustado:</span>
                      <span className="font-mono-numbers">{nonConfoturCapRate}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleShareToWhatsApp}
                  className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-xl transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-700" />
                  <span>Enviar esta Simulación por WhatsApp a un Asesor</span>
                </button>

                <button
                  onClick={onOpenConcierge}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  <span>Pre-Calificar con este Presupuesto</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
