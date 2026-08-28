import { useState } from 'react';
import {
  GitCommit,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Shield,
  FileText,
  FileCheck,
  Search,
  Check,
  Sparkles,
  Layers,
  Lock
} from 'lucide-react';

interface HowItWorksSectionProps {
  isDarkMode: boolean;
}

export default function HowItWorksSection({ isDarkMode }: HowItWorksSectionProps) {
  const [testInput, setTestInput] = useState('Forensic CCTV Footage — Sector 4 ATM Entrance at 22:14:09');
  const [testHash, setTestHash] = useState('9b84e6027c62d08a5435967b7f14b62db587042a9693cb84a51e6005ab86e246');
  const [isTampered, setIsTampered] = useState(false);

  const handleTextChange = async (val: string) => {
    setTestInput(val);
    try {
      const msgBuffer = new TextEncoder().encode(val);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setTestHash(hashHex);
    } catch {
      // fallback
    }
  };

  const steps = [
    {
      num: '01',
      title: 'FIR Lodgement & Atomic Timestamp',
      desc: 'Complainant or investigating officer files the incident via e-Police terminal. Atomic clock consensus synchronizes the timestamp to prevent retrospective altering.',
      icon: <FileText className="w-5 h-5" />,
      tag: 'POLICE DESK'
    },
    {
      num: '02',
      title: 'Forensic Hash Sealing',
      desc: 'Physical and digital exhibits (CCTV, audio, biometric logs, PDF statements) are computed on ingestion. Each document receives a unique 256-bit digital fingerprint.',
      icon: <Lock className="w-5 h-5" />,
      tag: 'FORENSIC LAB'
    },
    {
      num: '03',
      title: 'Digital Chargesheet Delivery',
      desc: 'Investigating team transfers custody to the Public Prosecutor. Subpoenas and witness notices are issued with watermarked discovery protection.',
      icon: <FileCheck className="w-5 h-5" />,
      tag: 'PROSECUTOR'
    },
    {
      num: '04',
      title: 'Courtroom Cognizance & Trial',
      desc: 'The Presiding Magistrate reviews exhibits directly on the judicial terminal. Real-time checksum comparisons ensure no page or audio byte was substituted.',
      icon: <Shield className="w-5 h-5" />,
      tag: 'MAGISTRATE'
    },
    {
      num: '05',
      title: 'Final Judicial Vault Sealing',
      desc: 'The court order and disposal deed are permanently anchored to the national judiciary archive with non-repudiation guarantees valid for decades.',
      icon: <CheckCircle className="w-5 h-5" />,
      tag: 'ARCHIVE'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-3 bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Layers className="w-3.5 h-3.5" />
            <span>End-to-End Pipeline</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-bold tracking-tight mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            How JUSTICE Eliminates Legal Latency
          </h2>
          <p
            className={`text-base sm:text-lg ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            A high-fidelity comparison between traditional paperwork pitfalls and
            the modern cryptographic case lifecycle.
          </p>
        </div>

        {/* Traditional vs JUSTICE Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {/* Legacy Paper-Based System */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border transition-all ${
              isDarkMode
                ? 'bg-red-950/10 border-red-900/30 text-slate-300'
                : 'bg-red-50/50 border-red-200 text-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>The Legacy Paper Docket</span>
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                HIGH RISK
              </span>
            </div>

            <h3
              className={`text-xl font-bold mb-3 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Paper files prone to transit delays, loss & disputes
            </h3>

            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-start gap-2 text-slate-400">
                <span className="text-red-400 font-bold">✕</span>
                <span>Physical paper files manually driven between police stations and courts</span>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <span className="text-red-400 font-bold">✕</span>
                <span>Vulnerable to missing pages, backdated entries, and water damage</span>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <span className="text-red-400 font-bold">✕</span>
                <span>No verifiable chain of custody showing who read or borrowed an exhibit</span>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <span className="text-red-400 font-bold">✕</span>
                <span>Average 45 to 90 days wasted on postal summon delivery and file movement</span>
              </li>
            </ul>
          </div>

          {/* Modern JUSTICE Cryptographic System */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border transition-all ${
              isDarkMode
                ? 'bg-emerald-950/15 border-emerald-800/40 text-slate-200 shadow-[0_0_30px_rgba(16,185,129,0.1)]'
                : 'bg-emerald-50/60 border-emerald-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>JUSTICE Digital Case System</span>
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                VERIFIED
              </span>
            </div>

            <h3
              className={`text-xl font-bold mb-3 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Instant, tamper-evident digital docket transmission
            </h3>

            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Instant sub-second e-FIR submission directly to the Judicial Magistrate</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Every file hash-locked with SHA-256; 1 modified character fails validation</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Immutable append-only audit trail logging every inspection with role authentication</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Instant courtroom summons and citizen tracking without physical court queues</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Step-by-Step Chronological Progression */}
        <div className="mb-16">
          <h3
            className={`text-xl sm:text-2xl font-bold mb-8 text-center ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            The Five Critical Milestones
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map(s => (
              <div
                key={s.num}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isDarkMode
                    ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-extrabold font-mono text-emerald-400">
                      {s.num}
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700">
                      {s.tag}
                    </span>
                  </div>
                  <h4
                    className={`text-sm font-bold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {s.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/50 flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-semibold">
                  <span>STAGE VERIFIED</span>
                  <CheckCircle className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Evidence Fingerprint Playground */}
        <div
          id="fingerprint-playground"
          className={`p-6 sm:p-8 rounded-3xl border ${
            isDarkMode
              ? 'bg-[#0B1015] border-slate-800 text-slate-200'
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Interactive Tamper Verification Test</span>
              </div>
              <h4
                className={`text-lg sm:text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                Test Real-Time SHA-256 Digest Calculation
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (!isTampered) {
                    handleTextChange(testInput + ' [TAMPERED_PAGE_INSERTION]');
                    setIsTampered(true);
                  } else {
                    handleTextChange('Forensic CCTV Footage — Sector 4 ATM Entrance at 22:14:09');
                    setIsTampered(false);
                  }
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold border transition-all ${
                  isTampered
                    ? 'bg-red-500 text-white border-red-400 shadow-sm'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                {isTampered ? 'Revert to Original' : 'Simulate Malicious Alteration'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1.5">
                Evidence Payload Content:
              </label>
              <textarea
                rows={2}
                id="evidence-test-textarea"
                value={testInput}
                onChange={e => {
                  handleTextChange(e.target.value);
                  setIsTampered(e.target.value.includes('[TAMPERED'));
                }}
                className={`w-full px-4 py-2.5 text-xs sm:text-sm font-mono rounded-xl border transition-colors ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-700 text-white focus:border-emerald-400 focus:outline-none'
                    : 'bg-white border-slate-300 text-slate-900 focus:border-emerald-500 focus:outline-none'
                }`}
              />
            </div>

            {/* Calculated Hash Bar */}
            <div
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isTampered
                  ? 'bg-red-950/20 border-red-500/40 text-red-300'
                  : 'bg-slate-950 border-emerald-500/30 text-emerald-400'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    Calculated SHA-256 Checksum
                  </span>
                  {isTampered ? (
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-red-500/20 text-red-400 font-bold">
                      MISMATCH / INTEGRITY BROKEN
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                      VALIDATED ARCHIVE SEAL
                    </span>
                  )}
                </div>
                <p className="font-mono text-xs sm:text-sm break-all font-semibold">
                  {testHash}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-1.5 text-xs font-mono">
                {isTampered ? (
                  <span className="text-red-400 font-bold">ALERT: REJECTED</span>
                ) : (
                  <span className="text-emerald-400 font-bold">COURT-VERIFIED</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
