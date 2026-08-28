import { useState, useEffect } from 'react';
import { SectionId } from './types';
import Navbar from './components/Navigation/Navbar';
import HeroSection from './components/Sections/HeroSection';
import InteractiveLifecycle from './components/Sections/InteractiveLifecycle';
import RolesSection from './components/Sections/RolesSection';
import HowItWorksSection from './components/Sections/HowItWorksSection';
import TrustSection from './components/Sections/TrustSection';
import AccessModal from './components/Modals/AccessModal';
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
      'lifecycle',
      'roles',
      'how-it-works',
      'trust',
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
      {/* Dynamic Background Shader */}
      <BackgroundShader isDarkMode={isDarkMode} />

      {/* 3D Animated Background Floating Legal Documents on Scroll */}
      <BackgroundVaultScene isDarkMode={isDarkMode} />

      {/* Main Top Navigation matching Lovable preview */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenAccessModal={() => setIsAccessModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Hero Section with "LESS PAPER. MORE JUSTICE." */}
        <HeroSection
          onNavigate={handleNavigate}
          isDarkMode={isDarkMode}
          onOpenAccessModal={() => setIsAccessModalOpen(true)}
        />

        {/* The 5-Stage Closed Loop System (Register FIR, Upload Documents, Verify & Process, Audit Trail, Archive & Secure) */}
        <InteractiveLifecycle isDarkMode={isDarkMode} />

        {/* Stakeholder Roles (Police, Prosecutors, Judges, Citizens) */}
        <RolesSection
          isDarkMode={isDarkMode}
          onOpenAccessModal={() => setIsAccessModalOpen(true)}
        />

        {/* How It Works & Pipeline Comparison */}
        <HowItWorksSection isDarkMode={isDarkMode} />

        {/* Statutory Trust & Real-Time Case Registry */}
        <TrustSection isDarkMode={isDarkMode} />
      </main>

      {/* Technical Footer */}
      <Footer isDarkMode={isDarkMode} onNavigate={handleNavigate} />

      {/* Role Access / Interactive Sandbox Modal */}
      <AccessModal
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
