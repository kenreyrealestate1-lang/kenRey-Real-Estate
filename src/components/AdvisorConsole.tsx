import React, { useState } from 'react';
import { LayoutDashboard, Users, Flame, CheckCircle2, Phone, MessageCircle, ExternalLink, Sliders, Database, Send, AlertCircle, ArrowUpRight, ShieldCheck, TrendingUp, Sparkles, Code2, Bot } from 'lucide-react';
import { CHANNELS_DATA, WHATSAPP_CADENCE_STEPS } from '../data/campaigns';
import { ProspectLead } from '../types';

interface AdvisorConsoleProps {
  leads: ProspectLead[];
  onUpdateLeadStage: (leadId: string, newStage: ProspectLead['hubspotDealStage']) => void;
  onBackToPortal: () => void;
}

export const AdvisorConsole: React.FC<AdvisorConsoleProps> = ({
  leads,
  onUpdateLeadStage,
  onBackToPortal,
}) => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'omnichannel' | 'architecture' | 'cadence'>('pipeline');
  const [selectedLead, setSelectedLead] = useState<ProspectLead>(leads[0]);

  // CAC Simulator State
  const [monthlyBudgetUSD, setMonthlyBudgetUSD] = useState<number>(6500); // $6,500 USD/month default
  const [blendedCplUSD, setBlendedCplUSD] = useState<number>(23); // Average blended CPL
  const [avgCommissionUSD, setAvgCommissionUSD] = useState<number>(13500); // 5% of $270k

  // Calculated Metrics
  const estimatedLeads = Math.round(monthlyBudgetUSD / blendedCplUSD);
  const estimatedMqls = Math.round(estimatedLeads * 0.32); // 32% qualification
  const estimatedClosedDeals = Math.max(1, Math.round(estimatedMqls * 0.08)); // 8% of MQLs close
  const grossCommissionsRevenue = estimatedClosedDeals * avgCommissionUSD;
  const netMarketingRoiMultiple = (grossCommissionsRevenue / monthlyBudgetUSD).toFixed(1);
  const cacPerDeal = Math.round(monthlyBudgetUSD / estimatedClosedDeals);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      {/* Internal Navigation Header */}
      <div className="bg-slate-950 border-b border-slate-800 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-display font-bold text-white">
                  Kenrey Executive Command & Lead Intelligence
                </h1>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded border border-amber-500/30">
                  Consola CTO & Brokers
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Monitor de prospectos en tiempo real, sincronización con HubSpot CRM y optimización de CAC
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto text-xs">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === 'pipeline'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Pipeline & Lead Scoring ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab('omnichannel')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === 'omnichannel'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Estrategia Omnicanal & CAC
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === 'architecture'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Stack PropTech & Webhooks
            </button>
            <button
              onClick={() => setActiveTab('cadence')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === 'cadence'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Cadencia WhatsApp API
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Tab 1: Pipeline & Lead Scoring */}
        {activeTab === 'pipeline' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Leads Queue (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h2 className="text-sm font-display font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>Cola de Prospectos Calificados (Lead Scoring Engine)</span>
                </h2>
                <span className="text-xs text-slate-400 font-mono-numbers">
                  {leads.filter((l) => l.score.totalScore >= 80).length} High-Intent VIP
                </span>
              </div>

              <div className="space-y-3">
                {leads.map((lead) => {
                  const isHighIntent = lead.score.totalScore >= 80;
                  const isSelected = selectedLead?.id === lead.id;

                  return (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-800 border-amber-400 shadow-md ring-1 ring-amber-400/40'
                          : 'bg-slate-950/70 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-white">{lead.fullName}</h3>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                isHighIntent
                                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                                  : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              {lead.score.tier}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
                            <span>{lead.country}</span>
                            <span>·</span>
                            <span className="text-amber-400 font-semibold">{lead.preferredZone}</span>
                            <span>·</span>
                            <span className="font-mono-numbers text-white font-semibold">
                              ~${lead.budgetUSD.toLocaleString('en-US')} USD
                            </span>
                          </div>
                        </div>

                        {/* Score Badge */}
                        <div className="text-right shrink-0">
                          <div className="flex items-center gap-1 justify-end">
                            {isHighIntent && <Flame className="w-4 h-4 text-amber-400" />}
                            <span className="text-lg font-black text-amber-400 font-mono-numbers">
                              {lead.score.totalScore}
                            </span>
                            <span className="text-[10px] text-slate-500">/100</span>
                          </div>
                          <span className="text-[10px] text-slate-400 block font-mono-numbers">
                            {lead.createdAt}
                          </span>
                        </div>
                      </div>

                      {/* Deal Stage and Source Row */}
                      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">Origen:</span>
                          <span className="text-slate-200 font-medium">{lead.source}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">HubSpot:</span>
                          <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded text-[11px] font-semibold">
                            {lead.hubspotDealStage}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lead Detail & Broker Actions Drawer (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 sticky top-40 space-y-5">
              {selectedLead ? (
                <>
                  <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                        Expediente de Calificación
                      </span>
                      <h3 className="text-lg font-display font-bold text-white mt-0.5">
                        {selectedLead.fullName}
                      </h3>
                      <span className="text-xs text-slate-400">{selectedLead.country}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-2xl font-black text-amber-400 font-mono-numbers">
                        {selectedLead.score.totalScore}
                      </span>
                      <span className="text-[10px] text-slate-400 block">Lead Score Ponderado</span>
                    </div>
                  </div>

                  {/* Score Breakdown Radar */}
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2.5 text-xs">
                    <span className="font-bold text-slate-200 block text-[11px] uppercase tracking-wider">
                      Desglose del Score
                    </span>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-slate-400 mb-1">
                          <span>Capacidad Financiera (Max 35):</span>
                          <strong className="text-white font-mono-numbers">{selectedLead.score.financialCapacity}/35</strong>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="bg-amber-400 h-full" style={{ width: `${(selectedLead.score.financialCapacity / 35) * 100}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-400 mb-1">
                          <span>Urgencia & Horizonte (Max 25):</span>
                          <strong className="text-white font-mono-numbers">{selectedLead.score.urgencyTimeline}/25</strong>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="bg-amber-400 h-full" style={{ width: `${(selectedLead.score.urgencyTimeline / 25) * 100}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-400 mb-1">
                          <span>Interacción con Herramientas (Max 20):</span>
                          <strong className="text-white font-mono-numbers">{selectedLead.score.engagementTool}/20</strong>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="bg-amber-400 h-full" style={{ width: `${(selectedLead.score.engagementTool / 20) * 100}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-400 mb-1">
                          <span>Completitud de Perfil (Max 20):</span>
                          <strong className="text-white font-mono-numbers">{selectedLead.score.profileCompleteness}/20</strong>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="bg-amber-400 h-full" style={{ width: `${(selectedLead.score.profileCompleteness / 20) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Financial & Intent Profile */}
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-400">Presupuesto Estimado:</span>
                      <strong className="text-white font-mono-numbers">${selectedLead.budgetUSD.toLocaleString('en-US')} USD</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-400">Horizonte de Decisión:</span>
                      <span className="text-white font-medium">{selectedLead.timeline}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-400">Objetivo Inmobiliario:</span>
                      <span className="text-white font-medium">{selectedLead.purpose}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-400">Broker Responsable:</span>
                      <span className="text-amber-400 font-semibold">{selectedLead.assignedBroker}</span>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400 font-medium block mb-1">Bitácora / Notas Fiduciarias:</span>
                    <p className="text-slate-300 italic">{selectedLead.notes}</p>
                  </div>

                  {/* HubSpot Deal Stage Controls */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Actualizar Etapa del Trato en HubSpot:
                    </label>
                    <select
                      value={selectedLead.hubspotDealStage}
                      onChange={(e) => onUpdateLeadStage(selectedLead.id, e.target.value as any)}
                      aria-label="Etapa del Trato en HubSpot"
                      className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold text-amber-300"
                    >
                      <option value="Nuevo Lead">1. Nuevo Lead Inbound</option>
                      <option value="MQL Calificado">2. MQL Calificado (Score 70+)</option>
                      <option value="Tour / Zoom Agendado">3. Tour / Zoom Agendado</option>
                      <option value="Propuesta Enviada">4. Propuesta / Reserva Enviada</option>
                      <option value="Cierre">5. Cierre & Escrituración</option>
                    </select>
                  </div>

                  {/* Action Handlers */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <a
                      href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Estimado ${selectedLead.fullName}, le saluda ${selectedLead.assignedBroker} de Kenrey Real Estate. Me comunico referente a su consulta en ${selectedLead.preferredZone}.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Inmediato</span>
                    </a>

                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs transition-colors"
                    >
                      <Phone className="w-4 h-4 text-amber-400" />
                      <span>Llamar Directo</span>
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-center py-10 text-slate-500 text-xs">
                  Selecciona un prospecto para ver sus métricas de calificación.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Omnichannel Acquisition & CAC Simulator */}
        {activeTab === 'omnichannel' && (
          <div className="space-y-8">
            {/* Interactive CAC & ROI Budget Simulator */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Planificador de Inversión en Medios Pagados
                  </span>
                  <h3 className="text-xl font-display font-bold text-white mt-1">
                    Simulador de Costo de Adquisición de Cliente (CAC) & Retorno de Comisiones
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Modula el presupuesto mensual de marketing para proyectar el volumen de leads, conversiones a venta y multiplicador sobre la inversión.
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Retorno Proyectado sobre la Pauta</span>
                  <span className="text-3xl font-display font-black text-emerald-400 font-mono-numbers">
                    {netMarketingRoiMultiple}x ROI
                  </span>
                </div>
              </div>

              {/* Slider Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                    <span>Presupuesto Mensual de Medios</span>
                    <strong className="text-amber-400 font-mono-numbers">
                      ${monthlyBudgetUSD.toLocaleString('en-US')} USD
                    </strong>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="25000"
                    step="500"
                    value={monthlyBudgetUSD}
                    onChange={(e) => setMonthlyBudgetUSD(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono-numbers mt-1">
                    <span>$2,000 USD</span>
                    <span>$12,500 USD</span>
                    <span>$25,000 USD</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                    <span>Costo por Lead Promedio (CPL)</span>
                    <strong className="text-white font-mono-numbers">${blendedCplUSD} USD</strong>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="45"
                    step="1"
                    value={blendedCplUSD}
                    onChange={(e) => setBlendedCplUSD(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono-numbers mt-1">
                    <span>$10 (Local / SEO)</span>
                    <span>$25 (Promedio)</span>
                    <span>$45 (PMax US Luxury)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                    <span>Comisión Promedio por Cierre</span>
                    <strong className="text-white font-mono-numbers">
                      ${avgCommissionUSD.toLocaleString('en-US')} USD
                    </strong>
                  </div>
                  <input
                    type="range"
                    min="8000"
                    max="30000"
                    step="1000"
                    value={avgCommissionUSD}
                    onChange={(e) => setAvgCommissionUSD(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono-numbers mt-1">
                    <span>$8,000 USD</span>
                    <span>$15,000 USD</span>
                    <span>$30,000 USD</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Projection Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-8 pt-6 border-t border-slate-800 text-center">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Leads Inbound Totales</span>
                  <span className="text-xl font-bold text-white font-mono-numbers mt-1 block">
                    {estimatedLeads}
                  </span>
                  <span className="text-[10px] text-slate-500">volumen mensual</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">MQLs Calificados (70+)</span>
                  <span className="text-xl font-bold text-amber-400 font-mono-numbers mt-1 block">
                    {estimatedMqls}
                  </span>
                  <span className="text-[10px] text-slate-500">tasa calif. ~32%</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Ventas / Cierres Estimados</span>
                  <span className="text-xl font-bold text-emerald-400 font-mono-numbers mt-1 block">
                    {estimatedClosedDeals}
                  </span>
                  <span className="text-[10px] text-slate-500">tasa cierre ~8%</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">CAC por Comprador</span>
                  <span className="text-xl font-bold text-white font-mono-numbers mt-1 block">
                    ${cacPerDeal.toLocaleString('en-US')}
                  </span>
                  <span className="text-[10px] text-slate-500">USD por cierre final</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Facturación Comisiones</span>
                  <span className="text-xl font-bold text-emerald-300 font-mono-numbers mt-1 block">
                    ${grossCommissionsRevenue.toLocaleString('en-US')}
                  </span>
                  <span className="text-[10px] text-slate-500">USD facturados</span>
                </div>
              </div>
            </div>

            {/* Channels Performance Cards */}
            <div>
              <h3 className="text-base font-display font-bold text-white mb-4">
                Playbooks de Adquisición por Canal (Benchmarks Auditados)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {CHANNELS_DATA.map((ch, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-900 text-amber-400 border border-slate-800">
                          {ch.targetAudience}
                        </span>
                        <span className="text-xs font-black text-emerald-400 font-mono-numbers">
                          {ch.roiMultiple}x ROI
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white mt-2.5">{ch.channelName}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{ch.description}</p>

                      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800 text-xs">
                        <div>
                          <span className="text-slate-500 block">CPL Estimado:</span>
                          <strong className="text-white font-mono-numbers">${ch.cplUSD} USD</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block">CAC por Cierre:</span>
                          <strong className="text-white font-mono-numbers">${ch.cacUSD} USD</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Calificación (MQL):</span>
                          <strong className="text-amber-400 font-mono-numbers">{ch.leadQualificationRate}%</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Comisión Promedio:</span>
                          <strong className="text-emerald-400 font-mono-numbers">${ch.averageCommissionUSD.toLocaleString()} USD</strong>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800">
                      <span className="text-[10px] font-bold text-slate-400 block mb-1">Palabras Clave / Segmentación:</span>
                      <ul className="text-[11px] text-slate-300 space-y-1">
                        {ch.topKeywordsOrTargeting.map((item, kIdx) => (
                          <li key={kIdx} className="truncate">· {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Tech Stack & HubSpot Webhook Architecture */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-base font-display font-bold text-white mb-2">
                Arquitectura PropTech & Flujo de Integración en Tiempo Real
              </h3>
              <p className="text-xs text-slate-400 max-w-3xl mb-6">
                Estructura de micro-servicios y conectores para procesar prospectos en menos de 180 segundos mediante webhooks REST, sincronización con HubSpot CRM Professional y disparadores de WhatsApp Cloud API.
              </p>

              {/* ASCII / Box Architecture Diagram */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 overflow-x-auto font-mono text-xs text-slate-300">
                <pre className="leading-relaxed">
{`┌────────────────────────────────────────────────────────────────────────┐
│                   CAPA DE CAPTACIÓN & EXPERIENCIA                      │
│  - Google Ads (PMax) + Meta Ads Diáspora + Landing Pages CONFOTUR      │
│  - Calculadora de ROI Interactiva + Pre-calificador Kenrey Concierge   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Webhook POST /api/leads/qualify
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│               MOTOR DE LEAD SCORING & INTELIGENCIA (IA)                │
│  - Capacidad Financiera (35%) + Urgencia (25%) + Interacción (20%)     │
│  - Clasificación Automática: High-Intent VIP (≥80) vs Nurturing (<80)   │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
                    ▼                                ▼
┌──────────────────────────────────────┐  ┌──────────────────────────────┐
│       HUBSPOT CRM INMOBILIARIO       │  │  META CLOUD API (WHATSAPP)   │
│  - Creación de Contacto & Trato      │  │  - Disparo de Mensaje 0 Min  │
│  - Asignación de Broker por Zona     │  │  - Enlace al Broker Asignado │
│  - Pipeline Stage: MQL Calificado    │  │  - Dossier Digital en PDF    │
└──────────────────────────────────────┘  └──────────────────────────────┘`}
                </pre>
              </div>
            </div>

            {/* Simulated Live Webhook Payload */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-bold text-white">Payload JSON de Sincronización Webhook a HubSpot CRM</h4>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono-numbers px-2 py-0.5 rounded">
                  HTTP 200 OK · Sync Live
                </span>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 overflow-x-auto text-xs font-mono text-emerald-400">
                <pre>{JSON.stringify(
                  {
                    event: "lead.qualified",
                    timestamp: new Date().toISOString(),
                    lead_id: selectedLead?.id || "lead-live-01",
                    contact: {
                      firstname: selectedLead?.fullName.split(" ")[0] || "Michael",
                      lastname: selectedLead?.fullName.split(" ").slice(1).join(" ") || "Vance",
                      email: selectedLead?.email || "mvance.med@healthlink.com",
                      phone: selectedLead?.phone || "+13055558941",
                      country_of_residence: selectedLead?.country || "Estados Unidos",
                    },
                    deal_properties: {
                      dealname: `${selectedLead?.fullName} - Inversión ${selectedLead?.preferredZone}`,
                      amount_usd: selectedLead?.budgetUSD || 480000,
                      pipeline: "inversiones_dominicana_2026",
                      dealstage: selectedLead?.hubspotDealStage || "MQL Calificado",
                      assigned_agent: selectedLead?.assignedBroker || "Lic. Roberto Kenrey",
                      confotur_interest: true,
                      lead_score: selectedLead?.score.totalScore || 95,
                      lead_tier: selectedLead?.score.tier || "High-Intent VIP",
                    },
                    automation_triggers: {
                      whatsapp_instant_notification_sent: true,
                      sms_broker_alert_sent: true,
                      speed_to_lead_target_seconds: 180,
                    }
                  },
                  null,
                  2
                )}</pre>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: WhatsApp Business API Automated Cadence */}
        {activeTab === 'cadence' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <h3 className="text-base font-display font-bold text-white">
                    Playbook de Nutrición Automatizada por WhatsApp Business API
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Cadencia estructurada en 5 etapas para compradores internacionales y locales, reduciendo la fricción y acelerando el agendamiento de videollamadas con brokers.
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-lg">
                  Tasa de Apertura ~94%
                </span>
              </div>

              <div className="space-y-4">
                {WHATSAPP_CADENCE_STEPS.map((step, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-white">{step.title}</h4>
                      </div>

                      <span className="text-xs font-mono-numbers text-amber-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                        {step.timing}
                      </span>
                    </div>

                    <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-xs text-slate-200 leading-relaxed">
                      {step.content}
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                      <span><strong>Objetivo:</strong> {step.purpose}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
