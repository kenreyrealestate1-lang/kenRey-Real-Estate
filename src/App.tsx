import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertySearch } from './components/PropertySearch';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { RoiCalculator } from './components/RoiCalculator';
import { MortgageSimulator } from './components/MortgageSimulator';
import { AiConciergeModal } from './components/AiConciergeModal';
import { AdvisorConsole } from './components/AdvisorConsole';
import { Footer } from './components/Footer';
import { PROPERTIES } from './data/properties';
import { INITIAL_PROSPECT_LEADS } from './data/campaigns';
import { Property, PropertyZone, ProspectLead } from './types';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'portal' | 'advisor'>('portal');
  const [buyerAudience, setBuyerAudience] = useState<'international' | 'local'>('international');
  const [selectedZone, setSelectedZone] = useState<PropertyZone | 'Todas'>('Todas');

  // Modals & Active Selections
  const [activePropertyDetail, setActivePropertyDetail] = useState<Property | null>(null);
  const [propertyForRoi, setPropertyForRoi] = useState<Property | null>(PROPERTIES[0]);
  const [isConciergeOpen, setIsConciergeOpen] = useState<boolean>(false);

  // Live Leads Pipeline
  const [leads, setLeads] = useState<ProspectLead[]>(INITIAL_PROSPECT_LEADS);
  const [showLeadNotification, setShowLeadNotification] = useState<string | null>(null);

  const handleSelectPropertyForRoi = (property: Property) => {
    setPropertyForRoi(property);
    const element = document.getElementById('calculadora-roi');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToSearch = () => {
    const element = document.getElementById('propiedades');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdateLeadStage = (leadId: string, newStage: ProspectLead['hubspotDealStage']) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, hubspotDealStage: newStage } : lead))
    );
  };

  const handleLeadCreated = (newLead: ProspectLead) => {
    setLeads((prev) => [newLead, ...prev]);
    setShowLeadNotification(`Nuevo prospecto procesado: ${newLead.fullName} (${newLead.score.tier} - Score: ${newLead.score.totalScore})`);
    setTimeout(() => {
      setShowLeadNotification(null);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-body selection:bg-amber-100 selection:text-amber-900">
      {/* Top Notification Toast */}
      {showLeadNotification && (
        <div className="fixed top-24 right-4 z-50 bg-slate-950 text-white border border-amber-500/50 shadow-2xl rounded-xl p-3.5 flex items-center gap-3 animate-fade-in text-xs max-w-md">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-medium">{showLeadNotification}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        onOpenConcierge={() => setIsConciergeOpen(true)}
      />

      {/* View Switching */}
      {currentView === 'portal' ? (
        <main className="flex-1">
          {/* Hero Section */}
          <Hero
            buyerAudience={buyerAudience}
            onAudienceChange={setBuyerAudience}
            onOpenConcierge={() => setIsConciergeOpen(true)}
            selectedZone={selectedZone}
            onZoneSelect={setSelectedZone}
            onScrollToSearch={handleScrollToSearch}
          />

          {/* Properties Search & Filter Engine */}
          <PropertySearch
            properties={PROPERTIES}
            selectedZone={selectedZone}
            onZoneSelect={setSelectedZone}
            onSelectPropertyForDetail={(prop) => setActivePropertyDetail(prop)}
            onSelectPropertyForRoi={handleSelectPropertyForRoi}
            onOpenConcierge={() => setIsConciergeOpen(true)}
          />

          {/* ROI & CONFOTUR Tax Engine */}
          <RoiCalculator
            selectedProperty={propertyForRoi}
            onOpenConcierge={() => setIsConciergeOpen(true)}
          />

          {/* Mortgage Simulator */}
          <MortgageSimulator
            onOpenConcierge={() => setIsConciergeOpen(true)}
          />
        </main>
      ) : (
        /* Advisor & CTO Console */
        <main className="flex-1">
          <AdvisorConsole
            leads={leads}
            onUpdateLeadStage={handleUpdateLeadStage}
            onBackToPortal={() => setCurrentView('portal')}
          />
        </main>
      )}

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={activePropertyDetail}
        onClose={() => setActivePropertyDetail(null)}
        onOpenRoi={handleSelectPropertyForRoi}
        onOpenConcierge={() => setIsConciergeOpen(true)}
      />

      {/* AI Concierge Pre-screening Modal */}
      <AiConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        onLeadCreated={handleLeadCreated}
      />

      {/* Footer */}
      <Footer
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onViewChange={setCurrentView}
      />
    </div>
  );
}
