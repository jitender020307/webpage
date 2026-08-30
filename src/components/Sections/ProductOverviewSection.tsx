import { useState } from 'react';
import {
  FolderLock,
  FileText,
  Shield,
  FileCheck2,
  GitBranch,
  History,
  Archive,
  ArrowRight,
  Sparkles,
  Layers,
  Lock,
  CheckCircle2,
  Scale
} from 'lucide-react';

interface ProductOverviewSectionProps {
  isDarkMode: boolean;
  onOpenAccessModal: () => void;
}

export default function ProductOverviewSection({
  isDarkMode,
  onOpenAccessModal,
}: ProductOverviewSectionProps) {
  const [activeLayer, setActiveLayer] = useState<number>(0);

  const architectureLayers = [
    {
      step: '01',
      id: 'case',
      label: 'CASE',
      title: 'Case Registration & Organization',
      icon: <FolderLock className="w-5 h-5" />,
      desc: 'Creates the unified master case record with jurisdictional metadata, assigning lead officers and enforcing repository partitioning.',
      guarantee: 'Isolated Case Partitioning',
      outputs: ['Case Identifier (UID)', 'Jurisdiction & Section Tagging', 'Lead Officer Assignment'],
      color: '#10b981',
    },
    {
      step: '02',
      id: 'documents',
      label: 'DOCUMENTS',
      title: 'Multi-Source Document Ingestion',
      icon: <FileText className="w-5 h-5" />,
      desc: 'Securely registers FIRs, chargesheets, witness statements, and crime scene memos into structured encrypted partitions.',
      guarantee: 'MIME Validation & Ingestion Logs',
      outputs: ['Non-Destructive Storage', 'Standardized Taxonomy', 'Origin Attribution'],
      color: '#06b6d4',
    },
    {
      step: '03',
      id: 'security',
      label: 'SECURITY',
      title: 'Cryptographic Integrity & RBAC',
      icon: <Shield className="w-5 h-5" />,
      desc: 'Computes SHA-256 cryptographic digests on ingestion and validates user credentials against the Role-Based Access Control matrix.',
      guarantee: 'FIPS 180-4 SHA-256 Checksum Lock',
      outputs: ['1-Byte Tamper Detection', 'Role Clearance Enforcement', 'Dynamic Watermarking'],
      color: '#3b82f6',
    },
    {
      step: '04',
      id: 'review',
      label: 'REVIEW',
      title: 'Controlled Review & Version Lineage',
      icon: <GitBranch className="w-5 h-5" />,
      desc: 'Facilitates supervisory scrutiny, legal review, and protected redactions with complete non-destructive revision tracking.',
      guarantee: 'Append-Only Revision Chain',
      outputs: ['Parent-Hash Revision Nodes', 'Protected Redaction Layers', 'Supervisory Endorsements'],
      color: '#8b5cf6',
    },
    {
      step: '05',
      id: 'evidence',
      label: 'EVIDENCE',
      title: 'Digital Evidence Chain of Custody',
      icon: <FileCheck2 className="w-5 h-5" />,
      desc: 'Tracks forensic disk clones, mobile extraction manifests, and electronic exhibits conforming to Section 65B IT Act legal requirements.',
      guarantee: 'Section 65B Evidentiary Certificate',
      outputs: ['Dual Forensic Hashes (MD5/SHA)', 'Transfer Handshake Receipts', 'Laboratory Audit Trail'],
      color: '#ec4899',
    },
    {
      step: '06',
      id: 'audit',
      label: 'AUDIT',
      title: 'Continuous Immutable Audit Trail',
      icon: <History className="w-5 h-5" />,
      desc: 'Records all document views, downloads, edits, and state transitions in an append-only, chronologically indexed activity log.',
      guarantee: 'Non-Repudiation Accountability',
      outputs: ['Actor ID & Exact Timestamp', 'Terminal & Operation Signatures', 'Judicial Compliance Reports'],
      color: '#f59e0b',
    },
    {
      step: '07',
      id: 'archive',
      label: 'ARCHIVE',
      title: 'Long-Term Legal Preservation',
      icon: <Archive className="w-5 h-5" />,
      desc: 'Enforces statutory record retention, preserving disposal orders and certified judgement copies in a tamper-sealed archival vault.',
      guarantee: 'Write-Once Read-Many (WORM)',
      outputs: ['Statutory Retention Rules', 'Certified Copy Verification', 'Permanent Archival Seal'],
      color: '#14b8a6',
    },
  ];

  const currentLayer = architectureLayers[activeLayer];

  return (
    <section id="product" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Layers className="w-3.5 h-3.5" />
            <span>Product Overview</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            One Secure Record System for the Entire Investigation Lifecycle
          </h2>
          <p
            className={`text-base sm:text-lg ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            A unified architecture interconnecting cases, sensitive documents, forensic evidence,
            access permissions, and evidentiary audit records into a single, verifiable environment.
          </p>
        </div>

        {/* Conceptual Architecture Diagram Pipeline (CASE -> DOCUMENTS -> SECURITY -> REVIEW -> EVIDENCE -> AUDIT -> ARCHIVE) */}
        <div
          id="architecture-flow-diagram"
          className={`p-6 sm:p-8 rounded-3xl border mb-12 backdrop-blur-sm transition-all ${
            isDarkMode
              ? 'bg-slate-900/40 border-slate-800/90 shadow-xl'
              : 'bg-white border-slate-200 shadow-md'
          }`}
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/60">
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                ARCHITECTURE FLOW DIAGRAM
              </p>
              <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Sequential Security & Verification Flow
              </h3>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 hidden sm:inline-block">
              CLICK ANY STEP TO INSPECT
            </span>
          </div>

          {/* Interactive Flow Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 mb-8">
            {architectureLayers.map((layer, idx) => {
              const isSelected = activeLayer === idx;
              return (
                <button
                  key={layer.id}
                  type="button"
                  id={`arch-layer-btn-${layer.id}`}
                  onClick={() => setActiveLayer(idx)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[96px] ${
                    isSelected
                      ? isDarkMode
                        ? 'bg-slate-800/95 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.25)] text-white'
                        : 'bg-white border-emerald-500 shadow-md text-slate-900 ring-2 ring-emerald-500/20'
                      : isDarkMode
                      ? 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono font-bold text-slate-500">{layer.step}</span>
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isSelected
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : isDarkMode
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {layer.icon}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-mono font-bold tracking-wider">{layer.label}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Layer Detailed Blueprint Card */}
          <div
            className={`p-6 sm:p-8 rounded-2xl border transition-all ${
              isDarkMode
                ? 'bg-slate-950/70 border-slate-800/80 text-slate-300'
                : 'bg-slate-50/80 border-slate-200 text-slate-800'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Left Summary */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-bold">
                    LAYER {currentLayer.step} // {currentLayer.label}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Security Guarantee: <span className="text-emerald-400 font-semibold">{currentLayer.guarantee}</span>
                  </span>
                </div>

                <h4 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {currentLayer.title}
                </h4>

                <p className="text-sm leading-relaxed text-slate-400">
                  {currentLayer.desc}
                </p>

                {/* Key Deliverables Chips */}
                <div className="pt-2">
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Key Outputs & Controls:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentLayer.outputs.map((output, i) => (
                      <span
                        key={i}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border ${
                          isDarkMode
                            ? 'bg-slate-900 border-slate-800 text-slate-300'
                            : 'bg-white border-slate-200 text-slate-700 shadow-sm'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{output}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Summary Badge */}
              <div
                className={`p-5 rounded-xl border flex flex-col justify-between h-full ${
                  isDarkMode
                    ? 'bg-slate-900/80 border-slate-800 text-slate-300'
                    : 'bg-white border-slate-200 text-slate-700 shadow-sm'
                }`}
              >
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                    Evidentiary Impact
                  </p>
                  <p className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Continuous Record Authenticity
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Maintains an unbroken digital custody trail from field registration to courtroom presentation.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>ZERO TAMPER RISK</span>
                  </span>
                  <button
                    type="button"
                    onClick={onOpenAccessModal}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Interconnected Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className={`p-6 rounded-2xl border ${
              isDarkMode
                ? 'bg-slate-900/30 border-slate-800/80'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-4">
              <FolderLock className="w-5 h-5" />
            </div>
            <h4 className={`text-base font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Case-Centric Repository
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every document, exhibit, forensic clone, and witness transcript is strictly mapped to its parent investigation docket with granular access boundaries.
            </p>
          </div>

          <div
            className={`p-6 rounded-2xl border ${
              isDarkMode
                ? 'bg-slate-900/30 border-slate-800/80'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className={`text-base font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Multi-Agency Clearance
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enables secure collaboration across Police Stations, CFSL Forensic Laboratories, Directorate of Prosecution, and Judicial Courtrooms without data leakage.
            </p>
          </div>

          <div
            className={`p-6 rounded-2xl border ${
              isDarkMode
                ? 'bg-slate-900/30 border-slate-800/80'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 mb-4">
              <Scale className="w-5 h-5" />
            </div>
            <h4 className={`text-base font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Statutory Admissibility
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Conforms strictly to Section 65B Indian Evidence Act / Bharatiya Sakshya Adhiniyam standards for digital evidence integrity and non-repudiation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
