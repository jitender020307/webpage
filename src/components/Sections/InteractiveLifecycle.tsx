import { useState, useEffect } from 'react';
import {
  FileText,
  Upload,
  CheckCheck,
  History,
  Archive,
  Scale,
  ShieldCheck,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Clock,
  UserCheck
} from 'lucide-react';
import { WORKFLOW_STAGES } from '../../data/justiceData';
import { StageId, WorkflowStage } from '../../types';
import JusticeCoreScene from '../ThreeCanvas/JusticeCoreScene';

interface InteractiveLifecycleProps {
  isDarkMode: boolean;
}

export default function InteractiveLifecycle({ isDarkMode }: InteractiveLifecycleProps) {
  const [activeStageId, setActiveStageId] = useState<StageId>('fir');
  const [copiedHash, setCopiedHash] = useState(false);
  const [simulatedInput, setSimulatedInput] = useState('Cyber Extortion Incident Docket #0982');
  const [simulatedHash, setSimulatedHash] = useState('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  const [isSimulating, setIsSimulating] = useState(false);

  const activeStage = WORKFLOW_STAGES.find(s => s.id === activeStageId) || WORKFLOW_STAGES[0];

  // Simple browser-safe fast SHA-256 hash calculation for simulation
  const calculateSimulatedHash = async (text: string) => {
    try {
      const msgBuffer = new TextEncoder().encode(text + activeStage.id);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setSimulatedHash(hashHex);
    } catch {
      setSimulatedHash('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
    }
  };

  const handleInputChange = (val: string) => {
    setSimulatedInput(val);
    calculateSimulatedHash(val);
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(simulatedHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  // Node icons map
  const getStageIcon = (id: StageId, className = 'w-5 h-5') => {
    switch (id) {
      case 'fir':
        return <FileText className={className} />;
      case 'upload':
        return <Upload className={className} />;
      case 'verify':
        return <CheckCheck className={className} />;
      case 'audit':
        return <History className={className} />;
      case 'archive':
        return <Archive className={className} />;
    }
  };

  // 5 Nodes positions in radial coordinates for a balanced pentagonal layout
  // Center is at 50%, 50%
  // Node 1 (Top): 50%, 14%
  // Node 2 (Top-Right): 84%, 38%
  // Node 3 (Bottom-Right): 72%, 82%
  // Node 4 (Bottom-Left): 28%, 82%
  // Node 5 (Top-Left): 16%, 38%
  const nodePositions: Record<StageId, { top: string; left: string; mobileOrder: number }> = {
    fir: { top: '10%', left: '50%', mobileOrder: 1 },
    upload: { top: '36%', left: '86%', mobileOrder: 2 },
    verify: { top: '80%', left: '74%', mobileOrder: 3 },
    audit: { top: '80%', left: '26%', mobileOrder: 4 },
    archive: { top: '36%', left: '14%', mobileOrder: 5 },
  };

  return (
    <section id="lifecycle" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Architecture</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-bold tracking-tight mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            The 5-Stage Closed Loop System
          </h2>
          <p
            className={`text-base sm:text-lg ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Click any stage in the cryptographic case cycle to inspect statutory guarantees,
            live cryptographic tokens, and role-based workflows.
          </p>
        </div>

        {/* Radial Diagram Container (Desktop) & Step Selector (Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left / Center Diagram Stage (7 Cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            {/* Desktop Circular Graphic */}
            <div
              className={`relative w-full max-w-[540px] aspect-square rounded-full flex items-center justify-center p-6 border transition-all ${
                isDarkMode
                  ? 'bg-slate-900/40 border-slate-800/80 shadow-[0_0_50px_rgba(0,0,0,0.5)]'
                  : 'bg-slate-50/70 border-slate-200 shadow-sm'
              }`}
            >
              {/* Concentric Decorative Rings */}
              <div className="absolute inset-8 rounded-full border border-dashed border-slate-700/30 pointer-events-none animate-spin-slow opacity-60" />
              <div className="absolute inset-20 rounded-full border border-slate-700/20 pointer-events-none" />

              {/* Connecting SVG Path loop with animated particle pulses */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <polygon
                  points="270,68 450,202 388,422 152,422 90,202"
                  fill="none"
                  stroke={isDarkMode ? 'rgba(16,185,129,0.2)' : 'rgba(16,185,129,0.3)'}
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
              </svg>

              {/* Central Core Emblem with 3D Three.js Animation */}
              <div
                className={`relative z-10 w-40 h-40 rounded-full flex flex-col items-center justify-center text-center p-2 border transition-all overflow-hidden ${
                  isDarkMode
                    ? 'bg-[#0B1015]/90 border-emerald-500/40 shadow-[0_0_35px_rgba(16,185,129,0.25)] text-white'
                    : 'bg-white/95 border-emerald-300 shadow-xl text-slate-900'
                }`}
              >
                {/* Embedded 3D Three.js rotating cryptographic core */}
                <div className="absolute inset-0 z-0 opacity-85">
                  <JusticeCoreScene isDarkMode={isDarkMode} />
                </div>

                {/* Overlay Emblem Badge */}
                <div className="relative z-10 pointer-events-none flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-1">
                    <Scale className="w-4 h-4" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                    JUSTICE CORE
                  </p>
                  <div className="flex items-center gap-1 mt-0.5 text-[8px] font-mono text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>ONLINE</span>
                  </div>
                </div>
              </div>

              {/* 5 Interactive Nodes placed around the perimeter */}
              {WORKFLOW_STAGES.map(stage => {
                const isSelected = activeStageId === stage.id;
                const pos = nodePositions[stage.id];

                return (
                  <button
                    key={stage.id}
                    type="button"
                    id={`lifecycle-node-${stage.id}`}
                    onClick={() => {
                      setActiveStageId(stage.id);
                      calculateSimulatedHash(simulatedInput);
                    }}
                    style={{
                      top: pos.top,
                      left: pos.left,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className={`absolute z-20 group flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      isSelected
                        ? isDarkMode
                          ? 'bg-slate-900 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.4)] text-white ring-2 ring-emerald-500/30'
                          : 'bg-white border-emerald-500 shadow-xl text-slate-900 ring-2 ring-emerald-400/30'
                        : isDarkMode
                        ? 'bg-[#0B1015]/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                        : 'bg-white/90 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {/* Step Number Badge */}
                    <span
                      className={`w-6 h-6 rounded-full text-xs font-bold font-mono flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-emerald-500 text-slate-950 shadow-sm'
                          : isDarkMode
                          ? 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'
                          : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                      }`}
                    >
                      {stage.stepNumber}
                    </span>

                    {/* Icon & Label */}
                    <div className="text-left">
                      <p
                        className={`text-xs font-bold leading-none tracking-tight ${
                          isSelected
                            ? isDarkMode
                              ? 'text-emerald-400'
                              : 'text-emerald-700'
                            : ''
                        }`}
                      >
                        {stage.title}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {stage.badge}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile / Tablet Horizontal Stepper Pill selector */}
            <div className="flex flex-wrap gap-2 justify-center mt-6 lg:hidden w-full">
              {WORKFLOW_STAGES.map(stage => {
                const isSelected = activeStageId === stage.id;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => {
                      setActiveStageId(stage.id);
                      calculateSimulatedHash(simulatedInput);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-semibold'
                        : isDarkMode
                        ? 'bg-slate-900 border-slate-800 text-slate-300'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{stage.stepNumber}.</span>
                    <span>{stage.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Stage Inspector & Simulation Panel (5 Cols on desktop) */}
          <div className="lg:col-span-5">
            <div
              id="stage-inspection-card"
              className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 backdrop-blur-md shadow-xl ${
                isDarkMode
                  ? 'bg-slate-900/70 border-slate-800 text-slate-200 shadow-black/40'
                  : 'bg-white border-slate-200 text-slate-800 shadow-slate-200/50'
              }`}
            >
              {/* Header with Step Tag & Role */}
              <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-800/40">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-sm"
                    style={{ backgroundColor: activeStage.color }}
                  >
                    {getStageIcon(activeStage.id, 'w-5 h-5')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-400">
                        {activeStage.badge}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs font-medium text-slate-400">
                        Step {activeStage.stepNumber} of 5
                      </span>
                    </div>
                    <h3
                      className={`text-xl font-bold tracking-tight ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {activeStage.title}
                    </h3>
                  </div>
                </div>

                <div
                  className={`text-right px-2.5 py-1 rounded-lg text-[11px] font-mono border ${
                    isDarkMode
                      ? 'bg-slate-800/80 border-slate-700 text-slate-300'
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  {activeStage.actorRole}
                </div>
              </div>

              {/* Subtitle & Full Statutory Description */}
              <p className="text-sm font-semibold text-emerald-400 mb-1.5">
                {activeStage.subtitle}
              </p>
              <p
                className={`text-sm leading-relaxed mb-5 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {activeStage.description}
              </p>

              {/* Security & Cryptography Guarantee */}
              <div
                className={`p-3.5 rounded-2xl mb-5 border ${
                  isDarkMode
                    ? 'bg-slate-950/60 border-slate-800/80'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-semibold mb-1 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Statutory Security Guarantee</span>
                </div>
                <p className="text-xs font-medium text-slate-300 leading-normal">
                  {activeStage.securityGuarantee}
                </p>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-800/50 text-[11px] font-mono text-slate-400">
                  <span className="text-slate-400">ALGO:</span>
                  <span className="text-cyan-400 font-semibold">{activeStage.hashAlgorithm}</span>
                </div>
              </div>

              {/* Key Workflow Actions Checklist */}
              <div className="mb-5">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                  Standard Operating Procedures:
                </p>
                <div className="space-y-1.5">
                  {activeStage.actions.map((act, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                        {act}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Live Hash Simulator Box */}
              <div
                className={`p-4 rounded-2xl border ${
                  isDarkMode
                    ? 'bg-[#0B1015] border-slate-800'
                    : 'bg-slate-100 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <RefreshCw className="w-3 h-3 animate-spin-slow" />
                    <span>Live Verification Simulator</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">SHA-256 Token</span>
                </div>

                <div className="mb-2">
                  <label className="text-[11px] text-slate-400 block mb-1">
                    Test Payload Input:
                  </label>
                  <input
                    type="text"
                    id="stage-simulator-input"
                    value={simulatedInput}
                    onChange={e => handleInputChange(e.target.value)}
                    placeholder="Enter case notes, witness memo, or docket ID..."
                    className={`w-full px-3 py-1.5 text-xs rounded-lg border font-mono transition-colors ${
                      isDarkMode
                        ? 'bg-slate-900 border-slate-700 text-white focus:border-emerald-400 focus:outline-none'
                        : 'bg-white border-slate-300 text-slate-900 focus:border-emerald-500 focus:outline-none'
                    }`}
                  />
                </div>

                <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-950 font-mono text-[11px] text-emerald-400 break-all border border-emerald-500/20">
                  <span className="truncate">{simulatedHash}</span>
                  <button
                    type="button"
                    onClick={handleCopyHash}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white shrink-0"
                    title="Copy SHA-256 Hash"
                  >
                    {copiedHash ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Next Stage Quick Trigger */}
              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = WORKFLOW_STAGES.findIndex(s => s.id === activeStageId);
                    const nextIndex = (currentIndex + 1) % WORKFLOW_STAGES.length;
                    setActiveStageId(WORKFLOW_STAGES[nextIndex].id);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>Advance to Step {((activeStage.stepNumber % 5) + 1)}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
