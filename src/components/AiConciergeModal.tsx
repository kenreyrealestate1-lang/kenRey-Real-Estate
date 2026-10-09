import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, MessageCircle, ArrowRight, ShieldCheck, Globe, DollarSign, Clock, User, Phone, Mail, Award } from 'lucide-react';
import { LeadScoreBreakdown, PropertyZone, ProspectLead } from '../types';

interface AiConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadCreated?: (lead: ProspectLead) => void;
}

export const AiConciergeModal: React.FC<AiConciergeModalProps> = ({
  isOpen,
  onClose,
  onLeadCreated,
}) => {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [residence, setResidence] = useState<string>('Estados Unidos');
  const [budgetRange, setBudgetRange] = useState<string>('250000-450000');
  const [timeline, setTimeline] = useState<string>('immediate'); // immediate, 3months, exploring
  const [purpose, setPurpose] = useState<'Inversión Rentas Vacacionales' | 'Patrimonio Familiar' | 'Retiro / Segunda Vivienda'>('Inversión Rentas Vacacionales');
  const [preferredZone, setPreferredZone] = useState<PropertyZone>('Punta Cana');

  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [completedLead, setCompletedLead] = useState<ProspectLead | null>(null);

  if (!isOpen) return null;

  // Real-time Lead Scoring Algorithm
  const calculateScore = (): LeadScoreBreakdown => {
    let financial = 15;
    if (budgetRange === '450000+') financial = 35;
    else if (budgetRange === '250000-450000') financial = 30;
    else if (budgetRange === '150000-250000') financial = 22;
    else financial = 15;

    let urgency = 10;
    if (timeline === 'immediate') urgency = 25; // < 30 days
    else if (timeline === '3months') urgency = 18; // 1-3 months
    else urgency = 8; // exploring

    let engagement = 18; // engaged via AI concierge
    if (purpose === 'Inversión Rentas Vacacionales') engagement += 2;

    let completeness = 0;
    if (fullName.trim().length > 3) completeness += 7;
    if (email.includes('@')) completeness += 7;
    if (phone.trim().length > 6) completeness += 6;

    const total = financial + urgency + engagement + completeness;
    let tier: 'High-Intent VIP' | 'Warm Qualified' | 'Nurturing Inbound' = 'Nurturing Inbound';
    if (total >= 80) tier = 'High-Intent VIP';
    else if (total >= 50) tier = 'Warm Qualified';

    return {
      financialCapacity: financial,
      urgencyTimeline: urgency,
      engagementTool: engagement,
      profileCompleteness: completeness,
      totalScore: total,
      tier,
    };
  };

  const currentScore = calculateScore();

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setIsSubmitting(true);

    const score = calculateScore();
    const budgetNum =
      budgetRange === '450000+' ? 520000 :
      budgetRange === '250000-450000' ? 350000 :
      budgetRange === '150000-250000' ? 200000 : 130000;

    const newLead: ProspectLead = {
      id: `lead-${Date.now()}`,
      fullName,
      email: email || 'cliente@kenrey.com',
      phone,
      country: residence,
      preferredZone,
      budgetUSD: budgetNum,
      timeline:
        timeline === 'immediate' ? 'Menos de 30 días (Listo para inicial)' :
        timeline === '3months' ? '1 a 3 meses' : 'Explorando mercado',
      purpose,
      score,
      source: residence.includes('Dominicana') ? 'Alianza Bancaria' : 'Google Search Ads',
      hubspotDealStage: score.totalScore >= 80 ? 'MQL Calificado' : 'Nuevo Lead',
      assignedBroker:
        preferredZone === 'Cap Cana' || preferredZone === 'Punta Cana'
          ? 'Lic. Roberto Kenrey (Managing Partner)'
          : 'Karla Morales (Broker Senior)',
      createdAt: 'Hace instantes',
      notes: `Pre-calificado con Kenrey AI Concierge. Score: ${score.totalScore}/100 (${score.tier}). Presupuesto: ~$${budgetNum.toLocaleString()} USD en ${preferredZone}.`,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setCompletedLead(newLead);
      if (onLeadCreated) onLeadCreated(newLead);
    }, 800);
  };

  const handleOpenWhatsApp = () => {
    if (!completedLead) return;
    const text = encodeURIComponent(
      `¡Hola Kenrey Real Estate! Acabo de completar mi pre-calificación en la plataforma.\n\n` +
      `• Nombre: ${completedLead.fullName}\n` +
      `• Zona de Interés: ${completedLead.preferredZone}\n` +
      `• Presupuesto: ~$${completedLead.budgetUSD.toLocaleString('en-US')} USD\n` +
      `• Residencia: ${completedLead.country}\n` +
      `• Objetivo: ${completedLead.purpose}\n` +
      `• Lead Score: ${completedLead.score.totalScore}/100 (${completedLead.score.tier})\n\n` +
      `Deseo conversar con mi asesor asignado (${completedLead.assignedBroker}) para ver las unidades disponibles.`
    );
    window.open(`https://wa.me/18095550199?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-slate-950 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-display font-bold">Kenrey AI Concierge</h3>
              <span className="text-[10px] text-slate-400 block">Pre-calificador inteligente de compradores</span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar pre-calificador"
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Content */}
        <div className="overflow-y-auto p-6">
          {!completedLead ? (
            <div>
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-6">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex-1 flex items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        step >= s ? 'bg-slate-950 text-amber-400' : 'bg-neutral-200 text-slate-500'
                      }`}
                    >
                      {s}
                    </div>
                    {s < 3 && (
                      <div
                        className={`flex-1 h-1 mx-2 rounded transition-all ${
                          step > s ? 'bg-slate-950' : 'bg-neutral-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Residency & Purpose */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <h4 className="text-base font-display font-bold text-slate-900">
                      1. ¿Cuál es tu país de residencia y origen de fondos?
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Esto nos permite optimizar las recomendaciones bajo la Ley CONFOTUR o convenios bancarios locales.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                    {[
                      'Estados Unidos',
                      'Canadá',
                      'República Dominicana (Local)',
                      'Europa (España, Italia, etc.)',
                    ].map((res) => (
                      <button
                        key={res}
                        type="button"
                        onClick={() => setResidence(res)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          residence === res
                            ? 'border-amber-500 bg-amber-50/50 text-slate-950 font-bold shadow-xs'
                            : 'border-neutral-200 hover:bg-neutral-50 text-slate-700'
                        }`}
                      >
                        {res}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <label className="text-xs font-bold text-slate-800 block mb-2">
                      ¿Cuál es el objetivo principal de tu adquisición?
                    </label>
                    <div className="space-y-2 text-xs">
                      {[
                        { id: 'Inversión Rentas Vacacionales', label: 'Inversión para Retorno en Dólares (Airbnb / CONFOTUR)' },
                        { id: 'Retiro / Segunda Vivienda', label: 'Retiro o Segunda Residencia de Vacaciones' },
                        { id: 'Patrimonio Familiar', label: 'Vivienda Residencial / Patrimonio Familiar Urbano' },
                      ].map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPurpose(p.id as any)}
                          className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                            purpose === p.id
                              ? 'border-amber-500 bg-amber-50/50 text-slate-950 font-bold'
                              : 'border-neutral-200 hover:bg-neutral-50 text-slate-700'
                          }`}
                        >
                          <span>{p.label}</span>
                          {purpose === p.id && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 rounded-xl flex items-center gap-2 cursor-pointer"
                    >
                      <span>Siguiente: Presupuesto & Zona</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Budget, Zone & Timeline */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <h4 className="text-base font-display font-bold text-slate-900">
                      2. Presupuesto, Ubicación Preferida y Horizonte de Tiempo
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Evaluamos el rango de inversión para filtrar unidades con disponibilidad inmediata o en planos.
                    </p>
                  </div>

                  {/* Budget Ranges */}
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Rango de Inversión Previsto (USD)
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { val: '120000-200000', label: '$120,000 - $200,000 USD' },
                        { val: '250000-450000', label: '$250,000 - $450,000 USD' },
                        { val: '450000+', label: '$450,000 USD en adelante' },
                        { val: 'under120k', label: 'Menos de $120,000 USD' },
                      ].map((b) => (
                        <button
                          key={b.val}
                          type="button"
                          onClick={() => setBudgetRange(b.val)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            budgetRange === b.val
                              ? 'border-amber-500 bg-amber-50/50 text-slate-950 font-bold'
                              : 'border-neutral-200 hover:bg-neutral-50 text-slate-700'
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Zone */}
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Zona de Mayor Interés
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {(['Punta Cana', 'Cap Cana', 'Las Terrenas', 'Santo Domingo', 'Santiago'] as PropertyZone[]).map((zone) => (
                        <button
                          key={zone}
                          type="button"
                          onClick={() => setPreferredZone(zone)}
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            preferredZone === zone
                              ? 'border-amber-500 bg-amber-50/50 text-slate-950 font-bold'
                              : 'border-neutral-200 hover:bg-neutral-50 text-slate-700'
                          }`}
                        >
                          {zone}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      ¿Cuándo estimas formalizar la separación/reserva?
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {[
                        { id: 'immediate', label: '< 30 días (Listo)' },
                        { id: '3months', label: '1 a 3 meses' },
                        { id: 'exploring', label: 'Solo evaluando' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTimeline(t.id)}
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            timeline === t.id
                              ? 'border-amber-500 bg-amber-50/50 text-slate-950 font-bold'
                              : 'border-neutral-200 hover:bg-neutral-50 text-slate-700'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                    >
                      Atrás
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-5 py-2.5 text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 rounded-xl flex items-center gap-2 cursor-pointer"
                    >
                      <span>Siguiente: Datos de Contacto</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact & Live Score Preview */}
              {step === 3 && (
                <form onSubmit={handleFinish} className="space-y-5">
                  <div>
                    <h4 className="text-base font-display font-bold text-slate-900">
                      3. Datos para Asignación de Broker y Dossier Personalizado
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Enviamos el inventario disponible y conectamos con el asesor senior especialista en {preferredZone}.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1">Nombre Completo *</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          required
                          placeholder="Ej. Dr. Carlos Fernández"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-slate-700 block mb-1">WhatsApp con Código de País *</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                          <input
                            type="tel"
                            required
                            placeholder="+1 (305) 555-0199"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono-numbers"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-slate-700 block mb-1">Correo Electrónico</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                          <input
                            type="email"
                            placeholder="carlos@empresa.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live Lead Score Breakdown Box */}
                  <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-400">Score de Inversionista Proyectado:</span>
                      <span className="text-sm font-bold text-amber-400 font-mono-numbers">
                        {currentScore.totalScore}/100 · {currentScore.tier}
                      </span>
                    </div>

                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full transition-all duration-300"
                        style={{ width: `${currentScore.totalScore}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-2 block">
                      {currentScore.totalScore >= 80
                        ? 'Prioridad VIP: Asignación inmediata al Director Comercial con atención en < 3 min.'
                        : 'Perfil Calificado: Envío de dossier de oportunidades y atención personalizada.'}
                    </span>
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                    >
                      Atrás
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !fullName || !phone}
                      className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-xl flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      {isSubmitting ? (
                        <span>Procesando Perfil con IA...</span>
                      ) : (
                        <>
                          <span>Finalizar Pre-Calificación</span>
                          <CheckCircle2 className="w-4 h-4 text-slate-950" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* Completed Screen */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 mx-auto">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  ¡Pre-Calificación Completada con Éxito!
                </span>
                <h3 className="text-2xl font-display font-bold text-slate-900 mt-1">
                  Bienvenido, {completedLead.fullName}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Tu perfil ha sido procesado por el motor de inteligencia de Kenrey Real Estate y sincronizado con nuestro sistema CRM.
                </p>
              </div>

              {/* Score Results Card */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 max-w-md mx-auto text-left space-y-3">
                <div className="flex justify-between items-center border-b border-neutral-200 pb-2">
                  <span className="text-xs font-medium text-slate-500">Clasificación de Inversionista:</span>
                  <span className="text-xs font-black text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    {completedLead.score.tier}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Lead Score Final:</span>
                    <strong className="text-slate-900 text-base font-mono-numbers">
                      {completedLead.score.totalScore} / 100
                    </strong>
                  </div>

                  <div>
                    <span className="text-slate-400 block">Zona Asignada:</span>
                    <strong className="text-slate-900">{completedLead.preferredZone}</strong>
                  </div>

                  <div>
                    <span className="text-slate-400 block">Asesor Especialista:</span>
                    <strong className="text-slate-900">{completedLead.assignedBroker}</strong>
                  </div>

                  <div>
                    <span className="text-slate-400 block">HubSpot Deal Stage:</span>
                    <strong className="text-emerald-700 font-semibold">{completedLead.hubspotDealStage}</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleOpenWhatsApp}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-950" />
                  <span>Conectar por WhatsApp con {completedLead.assignedBroker}</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-3 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-colors"
                >
                  Cerrar y Ver Propiedades
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
