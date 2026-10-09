import React, { useState } from 'react';
import { Landmark, Globe2, Home, CheckCircle2, FileText, ArrowRight, DollarSign } from 'lucide-react';

interface MortgageSimulatorProps {
  onOpenConcierge: () => void;
}

export const MortgageSimulator: React.FC<MortgageSimulatorProps> = ({ onOpenConcierge }) => {
  const [borrowerType, setBorrowerType] = useState<'international' | 'local'>('international');

  // Currency & Values
  const [propertyPrice, setPropertyPrice] = useState<number>(borrowerType === 'international' ? 300000 : 12000000);
  const [downPaymentPct, setDownPaymentPct] = useState<number>(30); // 30% down
  const [loanTermYears, setLoanTermYears] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(borrowerType === 'international' ? 8.2 : 11.5);

  // Sync defaults when switching borrower type
  const handleBorrowerTypeSwitch = (type: 'international' | 'local') => {
    setBorrowerType(type);
    if (type === 'international') {
      setPropertyPrice(300000); // USD
      setInterestRate(8.2);
    } else {
      setPropertyPrice(12000000); // DOP (~$200k USD)
      setInterestRate(11.5);
    }
  };

  // Math
  const downPaymentAmount = Math.round((propertyPrice * downPaymentPct) / 100);
  const loanPrincipal = propertyPrice - downPaymentAmount;

  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  const monthlyPayment =
    monthlyRate > 0 && numberOfPayments > 0
      ? Math.round(
          (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
        )
      : 0;

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = Math.max(0, totalPayment - loanPrincipal);

  return (
    <section id="financiamiento" className="py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
            Financiamiento Fiduciario & Banca Asociada
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
            Simulador Hipotecario para Extranjeros & Compradores Locales
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Compara las condiciones de crédito hipotecario en República Dominicana según tu residencia fiscal: préstamos en dólares para no residentes o financiamiento en pesos con bancos dominicanos líderes.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-100 rounded-xl max-w-md mb-8">
          <button
            onClick={() => handleBorrowerTypeSwitch('international')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all ${
              borrowerType === 'international'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe2 className="w-4 h-4 text-amber-600" />
            <span>Extranjero / No Residente (USD)</span>
          </button>
          <button
            onClick={() => handleBorrowerTypeSwitch('local')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all ${
              borrowerType === 'local'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home className="w-4 h-4 text-amber-600" />
            <span>Residente Dominicano (DOP)</span>
          </button>
        </div>

        {/* 2-Column Split: Form and Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form (6 Cols) */}
          <div className="lg:col-span-6 bg-neutral-50 border border-neutral-200 rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-display font-bold text-slate-900 pb-2 border-b border-neutral-200">
              Datos del Crédito ({borrowerType === 'international' ? 'Dólares USD' : 'Pesos Dominicanos DOP'})
            </h3>

            {/* Property Price */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Valor del Inmueble</span>
                <span className="font-bold text-slate-900 font-mono-numbers">
                  {borrowerType === 'international'
                    ? `$${propertyPrice.toLocaleString('en-US')} USD`
                    : `RD$${propertyPrice.toLocaleString('es-DO')} DOP`}
                </span>
              </div>
              <input
                type="range"
                min={borrowerType === 'international' ? 100000 : 4000000}
                max={borrowerType === 'international' ? 800000 : 35000000}
                step={borrowerType === 'international' ? 10000 : 500000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Down Payment % */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Inicial / Pago Inicial (Down Payment)</span>
                <span className="font-bold text-slate-900 font-mono-numbers">
                  {downPaymentPct}% ({borrowerType === 'international'
                    ? `$${downPaymentAmount.toLocaleString('en-US')} USD`
                    : `RD$${downPaymentAmount.toLocaleString('es-DO')} DOP`})
                </span>
              </div>
              <input
                type="range"
                min={borrowerType === 'international' ? 25 : 20}
                max={60}
                step={5}
                value={downPaymentPct}
                onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                {borrowerType === 'international'
                  ? 'La banca exige mínimo 30% a 35% de inicial para no residentes.'
                  : 'Bancos locales permiten 20% de inicial para primera o segunda vivienda.'}
              </span>
            </div>

            {/* Term & Interest Rate */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Plazo del Préstamo
                </label>
                <select
                  value={loanTermYears}
                  onChange={(e) => setLoanTermYears(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-neutral-300 rounded-lg text-xs font-medium text-slate-800"
                >
                  <option value={15}>15 años</option>
                  <option value={20}>20 años (Estándar)</option>
                  <option value={25}>25 años</option>
                  <option value={30}>30 años (Solo local)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Tasa de Interés Anual (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="5"
                    max="18"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-neutral-300 rounded-lg text-xs font-bold text-slate-900 font-mono-numbers"
                  />
                  <span className="absolute right-3 top-2 text-xs text-slate-400">%</span>
                </div>
              </div>
            </div>

            {/* Partner Banks Info */}
            <div className="pt-2 border-t border-neutral-200">
              <span className="text-[11px] text-slate-500 font-medium block mb-1.5">
                Entidades con Convenio Activo:
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-700">
                <span className="bg-white px-2.5 py-1 rounded border border-neutral-200">Banco Popular Dominicano</span>
                <span className="bg-white px-2.5 py-1 rounded border border-neutral-200">Banco BHD</span>
                <span className="bg-white px-2.5 py-1 rounded border border-neutral-200">Banreservas</span>
              </div>
            </div>
          </div>

          {/* Results Card & Document Requirements (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Calculation Card */}
            <div className="bg-slate-950 text-white rounded-2xl p-6 shadow-xl border border-slate-800">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                Cuota Mensual Estimada
              </span>
              <div className="flex items-baseline gap-2 mt-1 mb-5">
                <span className="text-3xl sm:text-4xl font-display font-black text-amber-400 font-mono-numbers">
                  {borrowerType === 'international'
                    ? `$${monthlyPayment.toLocaleString('en-US')} USD`
                    : `RD$${monthlyPayment.toLocaleString('es-DO')} DOP`}
                </span>
                <span className="text-xs text-slate-400">/ mes (capital + intereses)</span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Monto a Financiar</span>
                  <span className="text-sm font-bold text-white font-mono-numbers mt-0.5 block">
                    {borrowerType === 'international'
                      ? `$${loanPrincipal.toLocaleString('en-US')} USD`
                      : `RD$${loanPrincipal.toLocaleString('es-DO')} DOP`}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">Total de Intereses</span>
                  <span className="text-sm font-bold text-slate-300 font-mono-numbers mt-0.5 block">
                    {borrowerType === 'international'
                      ? `$${totalInterest.toLocaleString('en-US')} USD`
                      : `RD$${totalInterest.toLocaleString('es-DO')} DOP`}
                  </span>
                </div>
              </div>
            </div>

            {/* Requirement Checklist */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>
                  Requisitos de Pre-Aprobación para {borrowerType === 'international' ? 'Extranjeros' : 'Locales'}
                </span>
              </h4>

              <div className="space-y-2 text-xs text-slate-600">
                {borrowerType === 'international' ? (
                  <>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Copia de Pasaporte vigente y licencia de conducir de EE. UU. / Canadá.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Últimos 2 años de declaraciones de impuestos (W2 / Tax Returns 1040).</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Reporte de crédito oficial (Credit Score Equifax/TransUnion &gt; 680).</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Estados bancarios de los últimos 6 meses demostrando fondos para el inicial.</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Cédula de Identidad y Electoral dominicana.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Carta de trabajo timbrada con sueldo y antigüedad mínima de 1 año.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Estados de cuenta bancarios de los últimos 3 meses (nómina o ingresos comerciales).</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Calificación de crédito A en DataCrédito / TransUnion República Dominicana.</span>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-neutral-100">
                <button
                  onClick={onOpenConcierge}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  <span>Solicitar Asesoría de Pre-Aprobación Bancaria</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
