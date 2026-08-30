import { Lock, ArrowRight, ShieldCheck, KeyRound, CheckCircle2 } from 'lucide-react';

interface CtaSectionProps {
  isDarkMode: boolean;
  onOpenAccessModal: () => void;
}

export default function CtaSection({
  isDarkMode,
  onOpenAccessModal,
}: CtaSectionProps) {
  return (
    <section id="cta" className="py-24 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none rounded-full blur-[140px] opacity-20"
        style={{
          background: isDarkMode
            ? 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(59,130,246,0.1) 60%, transparent 80%)'
            : 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(59,130,246,0.05) 60%, transparent 80%)',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div
          className={`p-8 sm:p-14 rounded-3xl border text-center shadow-2xl relative overflow-hidden ${
            isDarkMode
              ? 'bg-gradient-to-b from-slate-900/90 to-slate-950/95 border-slate-800 text-white'
              : 'bg-gradient-to-b from-slate-900 to-slate-950 text-white border-slate-800'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-6 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            <Lock className="w-3.5 h-3.5" />
            <span>PROTECTED GATEWAY ENTRY</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 max-w-2xl mx-auto">
            Ready to access the secure workspace?
          </h2>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Authorized personnel can securely access investigation cases, documents, evidence records, and audit history from the protected workspace.
          </p>

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              type="button"
              id="cta-secure-access-btn"
              onClick={onOpenAccessModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full text-base font-bold transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30"
            >
              <KeyRound className="w-4 h-4" />
              <span>Secure Access</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Security Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-6">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Role-Based Authentication</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Encrypted Session Ingress</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Audit Logging Active</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
