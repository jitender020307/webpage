import { ArrowRight, Play, ShieldCheck, FileCheck, CheckCircle2, Lock } from 'lucide-react';
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
      {/* Background Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[350px] sm:h-[450px] pointer-events-none rounded-full blur-[120px] opacity-25"
        style={{
          background: isDarkMode
            ? 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(6,182,212,0.15) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(6,182,212,0.08) 50%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center">
        {/* Eyebrow Badge matching Lovable screenshot */}
        <div
          id="hero-badge"
          className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-8 border transition-all ${
            isDarkMode
              ? 'bg-slate-900/80 border-slate-700/60 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
              : 'bg-emerald-50 border-emerald-200 text-emerald-700'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono">DIGITAL CASE SYSTEM</span>
        </div>

        {/* Hero Title matching the exact typography: LESS PAPER. MORE JUSTICE. */}
        <h1
          id="hero-main-title"
          className={`text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 ${
            isDarkMode ? 'text-white' : 'text-slate-950'
          }`}
        >
          LESS PAPER.
          <br />
          <span
            className={
              isDarkMode
                ? 'bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent'
                : 'text-slate-900'
            }
          >
            MORE JUSTICE.
          </span>
        </h1>

        {/* Hero Subtitle description */}
        <p
          id="hero-subtitle"
          className={`text-lg sm:text-xl md:text-2xl font-normal leading-relaxed max-w-3xl mb-10 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          A secure, end-to-end digital platform that carries every case from FIR
          filing to final court order — verified, tracked and auditable.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14">
          <button
            type="button"
            id="hero-explore-btn"
            onClick={() => onNavigate('lifecycle')}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-base font-semibold transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg ${
              isDarkMode
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25'
                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20'
            }`}
          >
            <span>Explore System</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            id="hero-how-it-works-btn"
            onClick={() => onNavigate('how-it-works')}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-base font-semibold border transition-all ${
              isDarkMode
                ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white'
                : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
            }`}
          >
            <Play className="w-4 h-4 text-emerald-500 fill-emerald-500/30" />
            <span>See How It Works</span>
          </button>
        </div>

        {/* Live System Trust Strip */}
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
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Custody</p>
              <p className="text-xs sm:text-sm font-semibold">Zero-Tamper Hash</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <FileCheck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Protocol</p>
              <p className="text-xs sm:text-sm font-semibold">RFC 3161 Timestamp</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Encryption</p>
              <p className="text-xs sm:text-sm font-semibold">FIPS 180-4 SHA-256</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Integrity</p>
              <p className="text-xs sm:text-sm font-semibold">100% Traceability</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
