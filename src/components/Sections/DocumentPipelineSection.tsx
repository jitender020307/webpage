import {
  UploadCloud,
  FileCheck2,
  Hash,
  Tags,
  ShieldCheck,
  History,
  Archive,
  ArrowRight,
  Workflow
} from 'lucide-react';

interface DocumentPipelineSectionProps {
  isDarkMode: boolean;
}

export default function DocumentPipelineSection({
  isDarkMode,
}: DocumentPipelineSectionProps) {
  const pipelineSteps = [
    {
      step: '01',
      title: 'Upload & Ingestion',
      icon: <UploadCloud className="w-5 h-5" />,
      desc: 'Client uploads multi-format documents into temporary isolated ingress buffer.',
      action: 'MIME validation & antivirus sweep',
    },
    {
      step: '02',
      title: 'Metadata Validation',
      icon: <FileCheck2 className="w-5 h-5" />,
      desc: 'System parses case number, station jurisdiction, date, and submitting officer credentials.',
      action: 'Structure & page validation',
    },
    {
      step: '03',
      title: 'SHA-256 Hashing',
      icon: <Hash className="w-5 h-5" />,
      desc: 'Deterministic cryptographic hash digest computed and permanently bound to document UID.',
      action: 'FIPS 180-4 checksum lock',
    },
    {
      step: '04',
      title: 'Classification & OCR',
      icon: <Tags className="w-5 h-5" />,
      desc: 'Identifies document taxonomy (FIR, Seizure Memo, Affidavit) and indexes searchable text.',
      action: 'Automated entity & statutory tag indexing',
    },
    {
      step: '05',
      title: 'RBAC Access Policy',
      icon: <ShieldCheck className="w-5 h-5" />,
      desc: 'Assigns role-based read/write/redact permissions according to case clearance level.',
      action: 'Least-privilege policy enforcement',
    },
    {
      step: '06',
      title: 'Audit Logging',
      icon: <History className="w-5 h-5" />,
      desc: 'Chronological event record written to append-only activity journal.',
      action: 'Immutable activity timestamping',
    },
    {
      step: '07',
      title: 'Permanent Preservation',
      icon: <Archive className="w-5 h-5" />,
      desc: 'Protected document committed to secure partition under statutory retention rules.',
      action: 'Write-Once Read-Many (WORM) storage',
    },
  ];

  return (
    <section id="pipeline" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Workflow className="w-3.5 h-3.5" />
            <span>Document Pipeline</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            How Documents Travel Securely Through the System
          </h2>
          <p
            className={`text-base sm:text-lg ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            A step-by-step verification pipeline enforcing validation, cryptographic locking,
            and audit logging before any document becomes accessible in the repository.
          </p>
        </div>

        {/* Pipeline Visual Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          {pipelineSteps.map((step, idx) => (
            <div
              key={step.step}
              className={`p-5 rounded-2xl border flex flex-col justify-between relative transition-all duration-200 hover:-translate-y-1 ${
                isDarkMode
                  ? 'bg-slate-900/50 border-slate-800/80 hover:border-emerald-500/40 hover:bg-slate-900/80 shadow-md'
                  : 'bg-white border-slate-200 hover:border-emerald-500/40 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {step.step}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
                    {step.icon}
                  </div>
                </div>

                <h3 className={`text-sm font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {step.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {step.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <span className="text-[10px] font-mono text-emerald-400 block font-semibold leading-tight">
                  ✓ {step.action}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
