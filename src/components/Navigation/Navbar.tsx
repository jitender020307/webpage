import { useState, useEffect } from 'react';
import { SectionId } from '../../types';
import { Shield, Sun, Moon, ArrowRight, Menu, X, Lock, KeyRound } from 'lucide-react';

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAccessModal: () => void;
}

export default function Navbar({
  activeSection,
  onNavigate,
  isDarkMode,
  onToggleDarkMode,
  onOpenAccessModal,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: SectionId; label: string }[] = [
    { id: 'product', label: 'Product' },
    { id: 'security', label: 'Security' },
    { id: 'lifecycle', label: 'Workflow' },
    { id: 'roles', label: 'Roles' },
    { id: 'trust', label: 'Trust' },
    { id: 'sih-alignment', label: 'About SIH' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? isDarkMode
            ? 'bg-[#090D12]/92 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/25'
            : 'bg-white/92 backdrop-blur-md border-b border-slate-200 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          type="button"
          id="nav-logo-btn"
          onClick={() => {
            onNavigate('hero');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
              isDarkMode
                ? 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                : 'bg-emerald-50 border border-emerald-200 text-emerald-600'
            }`}
          >
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`font-extrabold text-lg sm:text-xl tracking-tight transition-colors ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                SIH 26190
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-semibold">
                SECURE DMS
              </span>
            </div>
            <p
              className={`text-[11px] font-medium hidden sm:block ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Legal & Investigation Document Management
            </p>
          </div>
        </button>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map(link => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                type="button"
                id={`nav-link-${link.id}`}
                onClick={() => onNavigate(link.id)}
                className={`transition-colors py-1 relative ${
                  isActive
                    ? isDarkMode
                      ? 'text-emerald-400 font-semibold'
                      : 'text-emerald-600 font-semibold'
                    : isDarkMode
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            type="button"
            id="nav-theme-toggle-btn"
            onClick={onToggleDarkMode}
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`p-2 rounded-xl border transition-colors ${
              isDarkMode
                ? 'border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white hover:border-slate-700'
                : 'border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Primary CTA: Secure Access */}
          <button
            type="button"
            id="nav-secure-access-btn"
            onClick={onOpenAccessModal}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-md ${
              isDarkMode
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 font-bold'
                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/15'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Secure Access</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            id="nav-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={`md:hidden p-2 rounded-xl border transition-colors ${
              isDarkMode
                ? 'border-slate-800 bg-slate-900/80 text-slate-300'
                : 'border-slate-200 bg-white text-slate-700'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-panel"
          className={`md:hidden border-b px-4 pt-3 pb-6 transition-all animate-fade-in ${
            isDarkMode ? 'bg-[#090D12] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map(link => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? isDarkMode
                        ? 'bg-emerald-500/10 text-emerald-400 font-semibold'
                        : 'bg-emerald-50 text-emerald-700 font-semibold'
                      : isDarkMode
                      ? 'text-slate-300 hover:bg-slate-900'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            <div className="pt-3 mt-2 border-t border-slate-800/60">
              <button
                type="button"
                onClick={() => {
                  onOpenAccessModal();
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-bold shadow-md ${
                  isDarkMode
                    ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span>Enter Secure Workspace</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
