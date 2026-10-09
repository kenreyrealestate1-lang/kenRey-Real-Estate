export type PropertyZone = 'Punta Cana' | 'Cap Cana' | 'Las Terrenas' | 'Santo Domingo' | 'Santiago';

export type PropertyStatus = 'En Planos' | 'En Construcción' | 'Entrega Inmediata';

export type PropertyType = 'Villa de Lujo' | 'Apartamento Frente al Mar' | 'Condo Resort' | 'Torre Residencial' | 'Penthouse';

export interface ConfoturBenefit {
  eligible: boolean;
  transferTaxSavingsUSD: number; // 3% exemption
  annualIpiSavingsUSD: number; // 1% annual IPI
  totalSavings15YearsUSD: number;
}

export interface PaymentPlan {
  reservationUSD: number;
  duringConstructionPct: number;
  uponDeliveryPct: number;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  zone: PropertyZone;
  specificLocation: string;
  priceUSD: number;
  priceDOP: number;
  bedrooms: number;
  bathrooms: number;
  areaM2: number;
  propertyType: PropertyType;
  status: PropertyStatus;
  confotur: ConfoturBenefit;
  projectedCapRate: number; // e.g., 10.8%
  estimatedNightlyRateUSD: number;
  estimatedOccupancyPct: number;
  mainImage: string;
  galleryImages: string[];
  highlights: string[];
  description: string;
  deliveryDate: string;
  paymentPlan: PaymentPlan;
  targetAudience: 'international' | 'local' | 'both';
  amenities: string[];
}

export interface LeadScoreBreakdown {
  financialCapacity: number; // Max 35
  urgencyTimeline: number; // Max 25
  engagementTool: number; // Max 20
  profileCompleteness: number; // Max 20
  totalScore: number; // 0-100
  tier: 'High-Intent VIP' | 'Warm Qualified' | 'Nurturing Inbound';
}

export interface ProspectLead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  preferredZone: PropertyZone;
  budgetUSD: number;
  timeline: string;
  purpose: 'Inversión Rentas Vacacionales' | 'Patrimonio Familiar' | 'Retiro / Segunda Vivienda';
  score: LeadScoreBreakdown;
  source: 'Google Search Ads' | 'Meta Ads Diáspora' | 'SEO Orgánico' | 'Alianza Bancaria' | 'Webinar Local';
  hubspotDealStage: 'Nuevo Lead' | 'MQL Calificado' | 'Tour / Zoom Agendado' | 'Propuesta Enviada' | 'Cierre';
  assignedBroker: string;
  createdAt: string;
  notes: string;
}

export interface ChannelPerformance {
  channelName: string;
  targetAudience: 'Extranjeros / Diáspora' | 'Locales Dominicana';
  cplUSD: number;
  cacUSD: number;
  leadQualificationRate: number; // %
  conversionToCloseRate: number; // %
  averageCommissionUSD: number;
  roiMultiple: number;
  description: string;
  topKeywordsOrTargeting: string[];
}
