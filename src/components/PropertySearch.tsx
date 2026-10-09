import React, { useState } from 'react';
import { Search, SlidersHorizontal, Calculator, Eye, MessageCircle, ShieldCheck } from 'lucide-react';
import { Property, PropertyZone, PropertyStatus } from '../types';

interface PropertySearchProps {
  properties: Property[];
  selectedZone: PropertyZone | 'Todas';
  onZoneSelect: (zone: PropertyZone | 'Todas') => void;
  onSelectPropertyForDetail: (property: Property) => void;
  onSelectPropertyForRoi: (property: Property) => void;
  onOpenConcierge: () => void;
}

export const PropertySearch: React.FC<PropertySearchProps> = ({
  properties,
  selectedZone,
  onZoneSelect,
  onSelectPropertyForDetail,
  onSelectPropertyForRoi,
}) => {
  const [currency, setCurrency] = useState<'USD' | 'DOP'>('USD');
  const [onlyConfotur, setOnlyConfotur] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<PropertyStatus | 'Todos'>('Todos');
  const [sortBy, setSortBy] = useState<'capRate' | 'priceAsc' | 'priceDesc'>('capRate');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter logic
  const filteredProperties = properties
    .filter((prop) => {
      if (selectedZone !== 'Todas' && prop.zone !== selectedZone) return false;
      if (onlyConfotur && !prop.confotur.eligible) return false;
      if (statusFilter !== 'Todos' && prop.status !== statusFilter) return false;
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(query);
        const matchesLocation = prop.specificLocation.toLowerCase().includes(query);
        const matchesZone = prop.zone.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLocation && !matchesZone) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'capRate') return b.projectedCapRate - a.projectedCapRate;
      if (sortBy === 'priceAsc') return a.priceUSD - b.priceUSD;
      if (sortBy === 'priceDesc') return b.priceUSD - a.priceUSD;
      return 0;
    });

  const formatCurrency = (usdVal: number, dopVal: number) => {
    if (currency === 'USD') {
      return `$${usdVal.toLocaleString('en-US')} USD`;
    }
    return `RD$${dopVal.toLocaleString('es-DO')} DOP`;
  };

  return (
    <section id="propiedades" className="py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
              Catálogo de Activos Prime
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
              Oportunidades de Inversión Seleccionadas
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Propiedades auditadas legalmente en las zonas con mayor plusvalía turística y urbana de República Dominicana.
            </p>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Moneda:</span>
            <div className="flex items-center p-1 bg-slate-100 rounded-lg">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  currency === 'USD'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('DOP')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  currency === 'DOP'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                DOP (RD$)
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por proyecto, sector o zona..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Zone Selector */}
            <div className="flex items-center">
              <select
                value={selectedZone}
                onChange={(e) => onZoneSelect(e.target.value as PropertyZone | 'Todas')}
                aria-label="Filtrar por Zona"
                className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-slate-800"
              >
                <option value="Todas">Todas las Zonas</option>
                <option value="Punta Cana">Punta Cana (Bávaro / Golf)</option>
                <option value="Cap Cana">Cap Cana (Marina & Playa)</option>
                <option value="Las Terrenas">Las Terrenas (Samaná)</option>
                <option value="Santo Domingo">Santo Domingo (Piantini / Polígono Central)</option>
                <option value="Santiago">Santiago (Cerros de Gurabo)</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as PropertyStatus | 'Todos')}
                aria-label="Filtrar por Estado de Construcción"
                className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-slate-800"
              >
                <option value="Todos">Cualquier Estado de Obra</option>
                <option value="En Planos">En Planos (Mayor Plusvalía)</option>
                <option value="En Construcción">En Construcción (Avance de Obra)</option>
                <option value="Entrega Inmediata">Entrega Inmediata (Listo para Rentar)</option>
              </select>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Ordenar propiedades"
                className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-slate-800"
              >
                <option value="capRate">Mayor Rentabilidad (Cap Rate)</option>
                <option value="priceAsc">Menor Precio Primero</option>
                <option value="priceDesc">Mayor Precio Primero</option>
              </select>
            </div>
          </div>

          {/* Quick Filter Toggles & Counter */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-200">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOnlyConfotur(!onlyConfotur)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                  onlyConfotur
                    ? 'bg-amber-500 text-slate-950 font-semibold border-amber-500 shadow-xs'
                    : 'bg-white text-slate-700 border-neutral-300 hover:bg-neutral-100'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Solo proyectos con Ley CONFOTUR (0% Impuestos)</span>
              </button>

              {(selectedZone !== 'Todas' || onlyConfotur || statusFilter !== 'Todos' || searchTerm !== '') && (
                <button
                  onClick={() => {
                    onZoneSelect('Todas');
                    setOnlyConfotur(false);
                    setStatusFilter('Todos');
                    setSearchTerm('');
                  }}
                  className="text-xs text-slate-500 hover:text-slate-900 underline font-medium"
                >
                  Limpiar filtros
                </button>
              )}
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Mostrando <strong className="text-slate-900 font-mono-numbers">{filteredProperties.length}</strong> propiedades disponibles
            </div>
          </div>
        </div>

        {/* Property Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-neutral-200">
            <SlidersHorizontal className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-base font-semibold text-slate-900">No encontramos propiedades con estos filtros</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Intenta cambiar la zona seleccionada o desactivar el filtro de Ley CONFOTUR para ver más opciones.
            </p>
            <button
              onClick={() => {
                onZoneSelect('Todas');
                setOnlyConfotur(false);
                setStatusFilter('Todos');
                setSearchTerm('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image Carrier with Scrim */}
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                    <img
                      src={property.mainImage}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Discreet Top Metadata Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
                      <span className="bg-slate-950/70 backdrop-blur-xs px-2.5 py-1 rounded-md">
                        {property.zone}
                      </span>

                      {property.confotur.eligible && (
                        <span className="bg-amber-500/90 text-slate-950 font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                          <ShieldCheck className="w-3 h-3" />
                          CONFOTUR (0% Imp.)
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between">
                      <div className="text-xs opacity-90 font-medium">
                        {property.status} · Entrega {property.deliveryDate}
                      </div>
                      <div className="bg-emerald-600/90 text-white px-2 py-0.5 rounded text-xs font-bold font-mono-numbers">
                        {property.projectedCapRate}% Cap Rate
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    {/* Unboxed Metadata (Anti-Pill Rule) */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span>{property.propertyType}</span>
                      <span aria-hidden="true">·</span>
                      <span>{property.bedrooms} Hab</span>
                      <span aria-hidden="true">·</span>
                      <span>{property.bathrooms} Baños</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-numbers">{property.areaM2} m²</span>
                    </div>

                    <h3 className="text-base font-display font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                      {property.title}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                      {property.specificLocation}
                    </p>

                    {/* Price and CONFOTUR Savings */}
                    <div className="mt-4 pt-3 border-t border-neutral-100 flex items-baseline justify-between">
                      <div>
                        <span className="text-[11px] text-slate-400 block font-medium">Precio de Adquisición</span>
                        <span className="text-lg font-bold text-slate-950 font-mono-numbers">
                          {formatCurrency(property.priceUSD, property.priceDOP)}
                        </span>
                      </div>

                      {property.confotur.eligible && (
                        <div className="text-right">
                          <span className="text-[10px] text-emerald-700 font-semibold block">Ahorro Fiscal 15 Años</span>
                          <span className="text-xs font-bold text-emerald-800 font-mono-numbers">
                            +${property.confotur.totalSavings15YearsUSD.toLocaleString('en-US')} USD
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-5 pb-5 pt-1 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectPropertyForRoi(property)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <Calculator className="w-3.5 h-3.5 text-amber-600" />
                    <span>Calcular ROI</span>
                  </button>

                  <button
                    onClick={() => onSelectPropertyForDetail(property)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver Ficha</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
