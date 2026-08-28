import { useState, useEffect } from 'react';
import { SectionId } from '../../types';
import { Shield, Scale, Sun, Moon, ArrowRight, Menu, X } from 'lucide-react';

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
    { id: 'roles', label: 'Roles' },
    { id: 'how-it-works', label: 'How it works' },
    { id: 'trust', label: 'Trust' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? isDarkMode
            ? 'bg-[#090D12]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm'
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
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`font-extrabold text-xl tracking-tight transition-colors ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                JUSTICE
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                SYSTEM
              </span>
            </div>
            <p
              className={`text-[11px] font-medium hidden sm:block ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Digital Case System
            </p>
          </div>
        </button>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            type="button"
            id="nav-link-lifecycle"
            onClick={() => onNavigate('lifecycle')}
            className={`transition-colors py-1 ${
              activeSection === 'lifecycle'
                ? isDarkMode
                  ? 'text-emerald-400 font-semibold'
                  : 'text-emerald-600 font-semibold'
                : isDarkMode
                ? 'text-slate-300 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pipeline
          </button>
          {navLinks.map(link => (
            <button
              key={link.id}
              type="button"
              id={`nav-link-${link.id}`}
              onClick={() => onNavigate(link.id)}
              className={`transition-colors py-1 ${
                activeSection === link.id
                  ? isDarkMode
                    ? 'text-emerald-400 font-semibold'
                    : 'text-emerald-600 font-semibold'
                  : isDarkMode
                  ? 'text-slate-300 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right CTA / Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            type="button"
            id="theme-toggle-btn"
            onClick={onToggleDarkMode}
            className={`p-2 rounded-xl border transition-all ${
              isDarkMode
                ? 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
            aria-label="Toggle theme"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Get Access Button */}
          <button
            type="button"
            id="get-access-btn"
            onClick={onOpenAccessModal}
            className={`group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all transform active:scale-95 shadow-sm ${
              isDarkMode
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 hover:shadow-emerald-500/30'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            <span>Get access</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={onToggleDarkMode}
            className={`p-2 rounded-xl border ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-slate-300'
                : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}
            aria-label="Toggle mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl border ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-slate-200'
                : 'bg-slate-100 border-slate-200 text-slate-800'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className={`md:hidden px-4 pt-3 pb-6 border-b transition-colors ${
            isDarkMode
              ? 'bg-[#0B1015] border-slate-800 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                onNavigate('lifecycle');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg hover:bg-emerald-500/10 font-medium"
            >
              Pipeline (5 Stages)
            </button>
            {navLinks.map(link => (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'hover:bg-slate-800/40'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 border-t border-slate-800/50">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccessModal();
                }}
                className="w-full py-3 px-4 rounded-xl text-center font-semibold bg-emerald-500 text-slate-950 shadow-md flex items-center justify-center gap-2"
              >
                <span>Get access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
