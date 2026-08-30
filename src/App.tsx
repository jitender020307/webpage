import { useState, useEffect } from 'react';
import { SectionId } from './types';
import Navbar from './components/Navigation/Navbar';
import HeroSection from './components/Sections/HeroSection';
import ProductOverviewSection from './components/Sections/ProductOverviewSection';
import SecurityArchitectureSection from './components/Sections/SecurityArchitectureSection';
import LifecycleSection from './components/Sections/LifecycleSection';
import DocumentPipelineSection from './components/Sections/DocumentPipelineSection';
import DifferentiatorSection from './components/Sections/DifferentiatorSection';
import RolesSection from './components/Sections/RolesSection';
import IntelligentProcessingSection from './components/Sections/IntelligentProcessingSection';
import TrustPrinciplesSection from './components/Sections/TrustPrinciplesSection';
import SihAlignmentSection from './components/Sections/SihAlignmentSection';
import CtaSection from './components/Sections/CtaSection';
import SecureAccessModal from './components/Modals/SecureAccessModal';
import Footer from './components/Footer';
import BackgroundShader from './components/ThreeCanvas/BackgroundShader';
import BackgroundVaultScene from './components/ThreeCanvas/BackgroundVaultScene';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState<boolean>(false);

  // Synchronize Dark / Light Mode with document root class
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [isDarkMode]);

  // Smooth scroll navigation handler
  const handleNavigate = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Scrollspy to detect active section in view
  useEffect(() => {
    const sectionIds: SectionId[] = [
      'hero',
      'product',
      'security',
      'lifecycle',
      'pipeline',
      'differentiator',
      'roles',
      'intelligence',
      'trust',
      'sih-alignment',
      'cta',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden transition-colors duration-300 font-sans ${
        isDarkMode
          ? 'bg-[#090D12] text-slate-100'
          : 'bg-[#F8FAFC] text-slate-900'
      }`}
    >
      {/* Dynamic Background Atmospheric Shader */}
      <BackgroundShader isDarkMode={isDarkMode} />

      {/* 3D Animated Background Floating Verified Legal Dockets on Scroll */}
      <BackgroundVaultScene isDarkMode={isDarkMode} />

      {/* Top Header Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenAccessModal={() => setIsAccessModalOpen(true)}
      />

      {/* Main Landing Page Content */}
      <main className="relative z-10">
        {/* 1. Hero Section */}
        <HeroSection
          onNavigate={handleNavigate}
          isDarkMode={isDarkMode}
          onOpenAccessModal={() => setIsAccessModalOpen(true)}
        />

        {/* 2. Product Overview Section & Conceptual Architecture Flow */}
        <ProductOverviewSection
          isDarkMode={isDarkMode}
          onOpenAccessModal={() => setIsAccessModalOpen(true)}
        />

        {/* 3. Security Architecture & Interactive Live SHA-256 Verifier */}
        <SecurityArchitectureSection isDarkMode={isDarkMode} />

        {/* 4. The 8-Stage Investigation & Document Lifecycle */}
        <LifecycleSection isDarkMode={isDarkMode} />

        {/* 5. Document Security Pipeline Flow */}
        <DocumentPipelineSection isDarkMode={isDarkMode} />

        {/* 6. Platform Differentiators (Traditional DMS vs. Secure Investigation DMS) */}
        <DifferentiatorSection isDarkMode={isDarkMode} />

        {/* 7. Stakeholder Roles & Granular Clearance Matrix */}
        <RolesSection
          isDarkMode={isDarkMode}
          onOpenAccessModal={() => setIsAccessModalOpen(true)}
        />

        {/* 8. Intelligent Document Processing (Assistive Parsing, OCR, Categorization) */}
        <IntelligentProcessingSection isDarkMode={isDarkMode} />

        {/* 9. Statutory Trust Principles & Section 65B IT Act Admissibility */}
        <TrustPrinciplesSection isDarkMode={isDarkMode} />

        {/* 10. SIH Problem Statement 26190 Challenge Alignment */}
        <SihAlignmentSection isDarkMode={isDarkMode} />

        {/* 11. Final Call To Action */}
        <CtaSection
          isDarkMode={isDarkMode}
          onOpenAccessModal={() => setIsAccessModalOpen(true)}
        />
      </main>

      {/* Official Footer */}
      <Footer isDarkMode={isDarkMode} onNavigate={handleNavigate} />

      {/* Secure Access / Authentication Portal Modal */}
      <SecureAccessModal
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
