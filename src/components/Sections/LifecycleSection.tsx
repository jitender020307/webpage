import { useState } from 'react';
import { INVESTIGATION_LIFECYCLE_STAGES } from '../../data/sihPlatformData';
import { WorkflowStage } from '../../types';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Hash,
  Clock,
  UserCheck,
  FileSpreadsheet,
  Workflow
} from 'lucide-react';

interface LifecycleSectionProps {
  isDarkMode: boolean;
}

export default function LifecycleSection({ isDarkMode }: LifecycleSectionProps) {
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);
  const currentStage: WorkflowStage = INVESTIGATION_LIFECYCLE_STAGES[selectedStageIndex];

  return (
    <section id="lifecycle" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Workflow className="w-3.5 h-3.5" />
            <span>Investigation & Document Lifecycle</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            The 8-Stage Closed-Loop Lifecycle
          </h2>
          <p
            className={`text-base sm:text-lg ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Every legal and investigative document travels through eight verifiable stages — ensuring complete
            chain of custody, cryptographic integrity, and statutory compliance from incident to archive.
          </p>
        </div>

        {/* 8-Stage Interactive Navigation Bar */}
        <div
          id="lifecycle-stepper-bar"
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-8"
        >
          {INVESTIGATION_LIFECYCLE_STAGES.map((stage, idx) => {
            const isSelected = selectedStageIndex === idx;
            return (
              <button
                key={stage.id}
                type="button"
                id={`stage-tab-${stage.id}`}
                onClick={() => setSelectedStageIndex(idx)}
                className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? isDarkMode
                      ? 'bg-slate-800/95 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)] text-white'
                      : 'bg-white border-emerald-500 shadow-md text-slate-900 ring-2 ring-emerald-500/20'
                    : isDarkMode
                    ? 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span
                    className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950'
                        : isDarkMode
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {stage.stageCode}
                  </span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />}
                </div>
                <p className="text-xs font-semibold line-clamp-1">{stage.title}</p>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Inspector */}
        <div
          id="lifecycle-detail-panel"
          className={`p-6 sm:p-8 rounded-3xl border transition-all ${
            isDarkMode
              ? 'bg-slate-900/40 border-slate-800/90 shadow-2xl'
              : 'bg-white border-slate-200 shadow-lg'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Stage Information & Deliverables (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                  STAGE {currentStage.stageCode} // {currentStage.badge}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Primary Actor: <strong className="text-slate-200">{currentStage.primaryActor}</strong></span>
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className={`text-2xl sm:text-3xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {currentStage.title}
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {currentStage.description}
                </p>
              </div>

              {/* Technical Controls & Mechanisms */}
              <div
                className={`p-4 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 uppercase block text-[10px]">Security Mechanism</span>
                    <span className="text-emerald-400 font-semibold">{currentStage.securityMechanism}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase block text-[10px]">Integrity Assurance</span>
                    <span className="text-cyan-400 font-semibold">{currentStage.integrityAssurance}</span>
                  </div>
                </div>
              </div>

              {/* Key Deliverables */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Stage Deliverables & Controls:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentStage.keyOutputs.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs ${
                        isDarkMode
                          ? 'bg-slate-900/60 border-slate-800/80 text-slate-300'
                          : 'bg-white border-slate-200 text-slate-700 shadow-sm'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Realistic Verified Legal Docket Card (5 Cols) */}
            <div className="lg:col-span-5">
              <div
                className={`p-6 rounded-2xl border shadow-xl flex flex-col justify-between h-full ${
                  isDarkMode
                    ? 'bg-[#0B111A] border-slate-800 text-slate-200'
                    : 'bg-slate-50 border-slate-300 text-slate-800'
                }`}
              >
                <div>
                  {/* Docket Header */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-300">
                        OFFICIAL RECORD SAMPLE
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                      {currentStage.sampleDocket.status}
                    </span>
                  </div>

                  {/* Docket Metadata Details */}
                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase">Docket Identifier</p>
                      <p className="font-bold text-sm text-slate-200">{currentStage.sampleDocket.docketNumber}</p>
                    </div>

                    <div>
                      <p className="text-[10px] text-slate-400 uppercase">Document Class</p>
                      <p className="text-slate-300">{currentStage.sampleDocket.documentType}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase">Timestamp</p>
                        <p className="text-slate-300 text-[11px] flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400 inline" />
                          <span>{currentStage.sampleDocket.timestamp}</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase">Attributed Officer</p>
                        <p className="text-slate-300 text-[11px]">{currentStage.sampleDocket.officer}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] text-slate-400 uppercase">Record Context</p>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {currentStage.sampleDocket.description}
                      </p>
                    </div>

                    {/* SHA-256 Digest Box */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
                          <Hash className="w-3 h-3 text-emerald-400" />
                          <span>SHA-256 Bitstream Digest</span>
                        </span>
                        <span className="text-[9px] text-emerald-400 font-bold">FIPS 180-4</span>
                      </div>
                      <p className="font-mono text-[10px] text-emerald-300/90 break-all leading-tight">
                        {currentStage.sampleDocket.sha256Hash}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation between steps */}
                <div className="pt-5 mt-5 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Step {currentStage.stepNumber} of 8
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedStageIndex((selectedStageIndex + 1) % INVESTIGATION_LIFECYCLE_STAGES.length)
                    }
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
                  >
                    <span>Next Stage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
