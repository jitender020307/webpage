import { TRUST_PRINCIPLES } from '../../data/sihPlatformData';
import { ShieldCheck, Scale, CheckCircle2, Lock, FileCheck } from 'lucide-react';

interface TrustPrinciplesSectionProps {
  isDarkMode: boolean;
}

export default function TrustPrinciplesSection({
  isDarkMode,
}: TrustPrinciplesSectionProps) {
  return (
    <section id="trust" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Scale className="w-3.5 h-3.5" />
            <span>Statutory Trust & Principles</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Designed for High-Trust Records
          </h2>
          <p
            className={`text-base sm:text-lg ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Built from the ground up on core legal engineering principles: strict confidentiality,
            uncompromising data integrity, comprehensive auditability, and statutory evidentiary preservation.
          </p>
        </div>

        {/* 6 Trust Principle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {TRUST_PRINCIPLES.map(principle => (
            <div
              key={principle.id}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
                isDarkMode
                  ? 'bg-slate-900/40 border-slate-800/80 shadow-md'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-extrabold font-mono text-emerald-400">
                    {principle.metric}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">
                    {principle.status}
                  </span>
                </div>

                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  {principle.metricLabel}
                </p>

                <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {principle.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {principle.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-0.5">
                  Statutory Alignment:
                </span>
                <span className="text-xs font-mono text-slate-300 font-semibold">
                  {principle.statutoryStandard}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Evidentiary Note */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border ${
            isDarkMode
              ? 'bg-slate-950/60 border-slate-800 text-slate-300'
              : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`text-base font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Section 65B Electronic Evidence Admissibility Guarantee
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                  By strictly recording the device source, operating conditions, deterministic cryptographic checksums,
                  and custodian transfer events, every digital exhibit managed in the platform is ready for statutory
                  affidavit generation under Indian Evidence law.
                </p>
              </div>
            </div>
            <div className="shrink-0 font-mono text-xs text-emerald-400 font-semibold px-3 py-1.5 rounded-xl border border-emerald-500/25 bg-emerald-500/5">
              LEGAL CERTIFICATE READY
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
