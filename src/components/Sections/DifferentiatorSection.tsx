import { DIFFERENTIATOR_COMPARISONS } from '../../data/sihPlatformData';
import { Shield, Check, X, Scale, FileText, ArrowRight } from 'lucide-react';

interface DifferentiatorSectionProps {
  isDarkMode: boolean;
}

export default function DifferentiatorSection({
  isDarkMode,
}: DifferentiatorSectionProps) {
  return (
    <section id="differentiator" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Scale className="w-3.5 h-3.5" />
            <span>Platform Differentiators</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            More Than a Document Repository
          </h2>
          <p
            className={`text-base sm:text-lg ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Traditional document management systems are designed for general business file sharing.
            The SIH 26190 platform is purpose-built for legal rigor, tamper detection, and courtroom admissibility.
          </p>
        </div>

        {/* High-Level Comparison Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Traditional DMS */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border ${
              isDarkMode
                ? 'bg-slate-900/30 border-slate-800/80 text-slate-400'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>
                  Traditional Enterprise DMS
                </h3>
                <p className="text-xs text-slate-500 font-mono">Generic Cloud / On-Premise Storage</p>
              </div>
            </div>

            <p className="text-xs leading-relaxed mb-6">
              Primarily provides basic file storage, folder organization, keyword search, and routine document sharing.
              Files can be overwritten without detection, audit logs are easily cleared, and no forensic chain of custody exists.
            </p>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-500">
                <X className="w-4 h-4 text-red-400/80 shrink-0" />
                <span>No mathematical tamper-detection (SHA-256 hash locking)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <X className="w-4 h-4 text-red-400/80 shrink-0" />
                <span>Vulnerable to accidental or malicious file overwriting</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <X className="w-4 h-4 text-red-400/80 shrink-0" />
                <span>No Section 65B Electronic Evidence Certification</span>
              </div>
            </div>
          </div>

          {/* Secure Investigation DMS */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden ${
              isDarkMode
                ? 'bg-slate-900/80 border-emerald-500/40 text-slate-200 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
                : 'bg-white border-emerald-500/40 text-slate-900 shadow-xl'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Secure Investigation DMS (SIH 26190)
                </h3>
                <p className="text-xs text-emerald-400 font-mono">High-Trust Legal & Investigation Architecture</p>
              </div>
            </div>

            <p className="text-xs leading-relaxed mb-6 text-slate-400">
              Integrates store, search, role-based access control, cryptographic integrity verification,
              non-destructive version lineage, immutable audit trails, and legal evidence traceability.
            </p>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-emerald-400">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>FIPS 180-4 SHA-256 hash locking on every ingestion</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Append-only revision trees with parent-hash verification</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Section 65B IT Act evidentiary chain of custody tracking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Side-by-Side Comparison Matrix */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border overflow-x-auto ${
            isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <h3 className={`text-base font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Detailed Functional & Legal Comparison Matrix
          </h3>

          <table className="w-full text-left text-xs font-mono min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-3 px-3">Dimension</th>
                <th className="py-3 px-3">Traditional DMS</th>
                <th className="py-3 px-3 text-emerald-400">Secure Investigation DMS (SIH 26190)</th>
                <th className="py-3 px-3">Statutory Legal Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {DIFFERENTIATOR_COMPARISONS.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-900/30">
                  <td className="py-3.5 px-3 font-bold text-slate-300">{item.dimension}</td>
                  <td className="py-3.5 px-3 text-slate-400">{item.traditionalDms}</td>
                  <td className="py-3.5 px-3 text-emerald-300 font-semibold">{item.secureInvestigationDms}</td>
                  <td className="py-3.5 px-3 text-slate-400 italic">{item.legalImpact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
