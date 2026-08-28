import { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  FileCheck2,
  Award,
  ExternalLink,
  Search,
  Check,
  Copy
} from 'lucide-react';
import { TRUST_PRINCIPLES, RECENT_CASES } from '../../data/justiceData';

interface TrustSectionProps {
  isDarkMode: boolean;
}

export default function TrustSection({ isDarkMode }: TrustSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCaseId, setCopiedCaseId] = useState<string | null>(null);

  const filteredCases = RECENT_CASES.filter(
    c =>
      c.firNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.incidentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.court.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCaseId(id);
    setTimeout(() => setCopiedCaseId(null), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COURT_VERIFIED':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
            VERIFIED
          </span>
        );
      case 'EVIDENCE_SEALED':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
            SEALED
          </span>
        );
      case 'UNDER_TRIAL':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            IN TRIAL
          </span>
        );
      case 'DISPOSED_ARCHIVED':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            ARCHIVED
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-500/15 text-slate-400">
            ACTIVE
          </span>
        );
    }
  };

  return (
    <section id="trust" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Cryptographic Trust</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-bold tracking-tight mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Statutory Trust & Legal Standards
          </h2>
          <p
            className={`text-base sm:text-lg ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Engineered to fulfill judicial standards of proof, digital chain of custody,
            and constitutional requirements of speedy, unadulterated justice.
          </p>
        </div>

        {/* 4 Trust Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {TRUST_PRINCIPLES.map(tp => (
            <div
              key={tp.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                isDarkMode
                  ? 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/40 text-slate-200'
                  : 'bg-white border-slate-200 hover:border-emerald-500 text-slate-800 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                    {tp.status}
                  </span>
                  <Award className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="mb-2">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white">
                    {tp.metric}
                  </span>
                  <span className="block text-xs font-semibold text-emerald-400 mt-1">
                    {tp.unit}
                  </span>
                </div>
                <h4 className="text-sm font-bold mb-1.5">{tp.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{tp.description}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/60 text-[10px] font-mono text-slate-400">
                <span>STD: </span>
                <span className="text-slate-300 font-semibold">{tp.standard}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Case Registry & Verification Table */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border ${
            isDarkMode
              ? 'bg-slate-900/40 border-slate-800'
              : 'bg-white border-slate-200 shadow-md'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/40">
            <div>
              <h3
                className={`text-lg sm:text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                Real-Time Court Registry Ledger
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Publicly verifiable case dockets anchored with cryptographic hashes
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search FIR or Court..."
                className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border transition-colors ${
                  isDarkMode
                    ? 'bg-slate-950 border-slate-800 text-white focus:border-emerald-400 focus:outline-none'
                    : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-500 focus:outline-none'
                }`}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr
                  className={`border-b text-[11px] font-mono uppercase tracking-wider ${
                    isDarkMode
                      ? 'border-slate-800 text-slate-400'
                      : 'border-slate-200 text-slate-500'
                  }`}
                >
                  <th className="py-3 px-3">FIR Number</th>
                  <th className="py-3 px-3">Incident / Title</th>
                  <th className="py-3 px-3">Jurisdiction Court</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">SHA-256 Ledger Seal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 font-mono">
                {filteredCases.map(c => (
                  <tr
                    key={c.id}
                    className={`transition-colors ${
                      isDarkMode ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3 px-3 font-semibold text-emerald-400">
                      {c.firNumber}
                    </td>
                    <td className="py-3 px-3 font-sans font-medium text-white">
                      {c.incidentType}
                    </td>
                    <td className="py-3 px-3 font-sans text-slate-300">
                      {c.court}
                    </td>
                    <td className="py-3 px-3">{getStatusBadge(c.status)}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400 truncate max-w-[140px] sm:max-w-[200px]">
                          {c.hash}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(c.hash, c.id)}
                          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white shrink-0"
                          title="Copy Full Hash"
                        >
                          {copiedCaseId === c.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Statutory Compliance Footer Strip */}
        <div className="mt-12 text-center text-xs font-mono text-slate-400 flex flex-wrap justify-center items-center gap-6">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Section 65B IT Act Certified</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>e-Courts Phase III Ready</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>ISO/IEC 27037 Forensic Admissibility</span>
          </span>
        </div>
      </div>
    </section>
  );
}
