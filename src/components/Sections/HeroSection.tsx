import { ArrowRight, Lock, ShieldCheck, FileCheck, History, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { SectionId } from '../../types';

interface HeroSectionProps {
  onNavigate: (section: SectionId) => void;
  isDarkMode: boolean;
  onOpenAccessModal: () => void;
}

export default function HeroSection({
  onNavigate,
  isDarkMode,
  onOpenAccessModal,
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Subtle Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[350px] sm:h-[480px] pointer-events-none rounded-full blur-[130px] opacity-20"
        style={{
          background: isDarkMode
            ? 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(6,182,212,0.12) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(6,182,212,0.06) 50%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Official SIH Problem Statement Badge */}
        <div
          id="hero-badge"
          className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-7 border transition-all ${
            isDarkMode
              ? 'bg-slate-900/85 border-slate-700/60 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.12)]'
              : 'bg-emerald-50 border-emerald-200 text-emerald-700'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono">SIH PROBLEM STATEMENT 26190</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300 font-mono hidden sm:inline">LEGAL & INVESTIGATION DMS</span>
        </div>

        {/* Hero Main Headline */}
        <h1
          id="hero-main-title"
          className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 max-w-4xl ${
            isDarkMode ? 'text-white' : 'text-slate-950'
          }`}
        >
          Secure the Record.{' '}
          <span
            className={
              isDarkMode
                ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent'
                : 'text-emerald-700'
            }
          >
            Preserve the Evidence.
          </span>
        </h1>

        {/* Hero Subheading Description */}
        <p
          id="hero-subtitle"
          className={`text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-3xl mb-10 ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          A secure platform for managing sensitive legal and investigation documents with
          controlled access, document integrity verification, complete auditability, and evidentiary
          traceability.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14">
          <button
            type="button"
            id="hero-primary-cta-btn"
            onClick={onOpenAccessModal}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-base font-bold transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg ${
              isDarkMode
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25'
                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Secure Access</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            id="hero-secondary-cta-btn"
            onClick={() => onNavigate('product')}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-base font-semibold border transition-all ${
              isDarkMode
                ? 'border-slate-700/80 bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 hover:text-white'
                : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
            }`}
          >
            <span>Explore Platform</span>
            <ChevronRight className="w-4 h-4 text-emerald-400" />
          </button>
        </div>

        {/* Trust Indicators Strip */}
        <div
          id="hero-trust-strip"
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl p-4 sm:p-5 rounded-2xl border backdrop-blur-sm ${
            isDarkMode
              ? 'bg-slate-900/50 border-slate-800/80 text-slate-300'
              : 'bg-white/80 border-slate-200 text-slate-700 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Access Control</p>
              <p className="text-xs sm:text-sm font-semibold">Strict RBAC Model</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <FileCheck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Integrity</p>
              <p className="text-xs sm:text-sm font-semibold">SHA-256 Hash Lock</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <History className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Accountability</p>
              <p className="text-xs sm:text-sm font-semibold">Append-Only Audit</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Admissibility</p>
              <p className="text-xs sm:text-sm font-semibold">Section 65B IT Act</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
