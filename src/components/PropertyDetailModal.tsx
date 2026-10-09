import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Calculator, MessageCircle, Sparkles, Building, MapPin, DollarSign, Calendar } from 'lucide-react';
import { Property } from '../types';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onOpenRoi: (property: Property) => void;
  onOpenConcierge: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  onOpenRoi,
  onOpenConcierge,
}) => {
  const [selectedImg, setSelectedImg] = useState<number>(0);

  if (!property) return null;

  const images = property.galleryImages.length > 0 ? property.galleryImages : [property.mainImage];

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent(
      `Hola Kenrey Real Estate. Me interesa recibir más información sobre el proyecto "${property.title}" en ${property.zone} (${property.specificLocation}). Precio: $${property.priceUSD.toLocaleString('en-US')} USD. ¿Tienen disponibilidad actualizada?`
    );
    window.open(`https://wa.me/18095550199?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Dossier Exclusivo Kenrey
            </span>
            <span className="text-neutral-300">·</span>
            <span className="text-xs text-slate-500 font-medium">{property.zone}</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-neutral-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Visual Carousel */}
          <div>
            <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-slate-900 mb-3 shadow-sm">
              <img
                src={images[selectedImg] || property.mainImage}
                alt={property.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-slate-950/75 backdrop-blur-xs text-white text-xs font-medium px-3 py-1.5 rounded-lg">
                {property.propertyType} · {property.status}
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImg === idx ? 'border-amber-500 scale-95 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Key Financial Banner */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 pb-5">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>{property.specificLocation}</span>
              </div>
              <h2 className="text-2xl font-display font-bold text-slate-900">{property.title}</h2>
              <div className="flex items-center gap-3 text-xs text-slate-600 mt-2 font-medium">
                <span>{property.bedrooms} Habitaciones</span>
                <span>·</span>
                <span>{property.bathrooms} Baños</span>
                <span>·</span>
                <span className="font-mono-numbers">{property.areaM2} m² Construcción</span>
                <span>·</span>
                <span className="text-emerald-700 font-bold font-mono-numbers">{property.projectedCapRate}% Cap Rate Proyectado</span>
              </div>
            </div>

            <div className="text-left md:text-right">
              <span className="text-xs text-slate-400 block font-medium">Precio de Venta</span>
              <span className="text-2xl font-display font-black text-slate-950 font-mono-numbers">
                ${property.priceUSD.toLocaleString('en-US')} USD
              </span>
              <span className="block text-xs text-slate-500 font-mono-numbers mt-0.5">
                RD${property.priceDOP.toLocaleString('es-DO')} DOP
              </span>
            </div>
          </div>

          {/* CONFOTUR Tax Shield Card */}
          {property.confotur.eligible ? (
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-amber-700" />
                <h4 className="text-sm font-bold text-amber-950">
                  Beneficios Fiscales Amparados por Ley CONFOTUR 158-01
                </h4>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed mb-4">
                Este proyecto cuenta con la aprobación del Consejo de Fomento Turístico. Al adquirirlo como persona física o fiduciaria, disfrutas de los siguientes incentivos estatales:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-white p-3 rounded-lg border border-amber-200/60 shadow-xs">
                  <span className="block text-slate-500 font-medium">Exención Transferencia (3%)</span>
                  <span className="text-sm font-bold text-amber-900 font-mono-numbers mt-0.5 block">
                    ${property.confotur.transferTaxSavingsUSD.toLocaleString('en-US')} USD
                  </span>
                  <span className="text-[10px] text-slate-400">Ahorro en el primer pago</span>
                </div>

                <div className="bg-white p-3 rounded-lg border border-amber-200/60 shadow-xs">
                  <span className="block text-slate-500 font-medium">Exención IPI Anual (1%)</span>
                  <span className="text-sm font-bold text-amber-900 font-mono-numbers mt-0.5 block">
                    ${property.confotur.annualIpiSavingsUSD.toLocaleString('en-US')} USD / año
                  </span>
                  <span className="text-[10px] text-slate-400">Cero impuesto patrimonial</span>
                </div>

                <div className="bg-white p-3 rounded-lg border border-amber-200/60 shadow-xs">
                  <span className="block text-slate-500 font-medium">Ahorro Total a 15 Años</span>
                  <span className="text-sm font-black text-emerald-700 font-mono-numbers mt-0.5 block">
                    ${property.confotur.totalSavings15YearsUSD.toLocaleString('en-US')} USD
                  </span>
                  <span className="text-[10px] text-emerald-600 font-medium">Escudo fiscal 100% legal</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-xs text-slate-600">
              <strong className="text-slate-900 block mb-1">Régimen Estándar Urbano / Residencial</strong>
              Este proyecto en el polígono central está estructurado para plusvalía patrimonial y rentas ejecutivas de largo o mediano plazo con financiamiento bancario local preferencial.
            </div>
          )}

          {/* Description & Highlights */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs">
              Descripción del Proyecto
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {property.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {property.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Plan & Delivery */}
          <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              Estructura del Plan de Pago en Construcción
            </h4>
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-white p-3 rounded-lg border border-neutral-200">
                <span className="block text-slate-400 font-medium">Separación</span>
                <span className="text-sm font-bold text-slate-900 font-mono-numbers mt-1 block">
                  ${property.paymentPlan.reservationUSD.toLocaleString('en-US')} USD
                </span>
                <span className="text-[10px] text-slate-500">Monto bloqueador</span>
              </div>

              <div className="bg-white p-3 rounded-lg border border-neutral-200">
                <span className="block text-slate-400 font-medium">Durante Obra</span>
                <span className="text-sm font-bold text-slate-900 font-mono-numbers mt-1 block">
                  {property.paymentPlan.duringConstructionPct}%
                </span>
                <span className="text-[10px] text-slate-500">Cuotas sin intereses</span>
              </div>

              <div className="bg-white p-3 rounded-lg border border-neutral-200">
                <span className="block text-slate-400 font-medium">Contra Entrega</span>
                <span className="text-sm font-bold text-slate-900 font-mono-numbers mt-1 block">
                  {property.paymentPlan.uponDeliveryPct}%
                </span>
                <span className="text-[10px] text-slate-500">Fondos o Préstamo Hipotecario</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 text-center mt-2.5">
              Fecha estimada de finalización de obra: <strong>{property.deliveryDate}</strong>
            </div>
          </div>

          {/* Amenities Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Amenidades y Características
            </h4>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-neutral-100 text-slate-700 rounded-md text-xs font-medium"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenRoi(property);
            }}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-900 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-100 transition-colors shadow-xs"
          >
            <Calculator className="w-4 h-4 text-amber-600" />
            <span>Simular Flujo de Caja & ROI</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsAppContact}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200/80 border border-emerald-300 rounded-xl transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-700" />
              <span>Consultar Asesor por WhatsApp</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenConcierge();
              }}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 rounded-xl transition-colors shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Pre-Calificar para esta Unidad</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
