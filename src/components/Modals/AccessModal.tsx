import { useState } from 'react';
import {
  X,
  Shield,
  Briefcase,
  Gavel,
  User,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  QrCode,
  Check,
  ExternalLink
} from 'lucide-react';
import { RoleId } from '../../types';

interface AccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function AccessModal({ isOpen, onClose, isDarkMode }: AccessModalProps) {
  const [selectedRole, setSelectedRole] = useState<RoleId>('police');
  const [caseNumber, setCaseNumber] = useState('FIR-2026-DEL-1049');
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedHash, setGeneratedHash] = useState('');

  if (!isOpen) return null;

  const handleLaunch = () => {
    const randomHash = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    setGeneratedHash(`0x${randomHash}fa9841b899c7`);
    setIsSuccess(true);
  };

  const resetModal = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        id="access-modal-dialog"
        className={`relative w-full max-w-xl p-6 sm:p-8 rounded-3xl border shadow-2xl transition-all ${
          isDarkMode
            ? 'bg-[#0B1015] border-slate-800 text-slate-200'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={resetModal}
          className="absolute top-5 right-5 p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Access Portal</span>
              </div>
              <h3
                className={`text-2xl font-bold tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                Access the JUSTICE Platform
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Select your statutory role to open an interactive simulation session with sample dockets.
              </p>
            </div>

            {/* Role Options */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { id: 'police', label: 'Police Officer', sub: 'e-FIR & Seizure Memos', icon: <Shield className="w-4 h-4" /> },
                { id: 'prosecutor', label: 'Prosecutor', sub: 'Charge Sheets & Discovery', icon: <Briefcase className="w-4 h-4" /> },
                { id: 'judge', label: 'Court Magistrate', sub: 'Summons & Judgements', icon: <Gavel className="w-4 h-4" /> },
                { id: 'citizen', label: 'Citizen', sub: 'Transparent Case Tracking', icon: <User className="w-4 h-4" /> }
              ].map(r => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRole(r.id as RoleId)}
                  className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                    selectedRole === r.id
                      ? 'bg-emerald-500/10 border-emerald-500 text-white ring-1 ring-emerald-500/30'
                      : isDarkMode
                      ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl shrink-0 ${
                      selectedRole === r.id
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {r.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">{r.label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{r.sub}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Test Case Number Input */}
            <div className="mb-6">
              <label className="text-xs font-mono text-slate-400 block mb-1.5">
                Target Simulated Case Docket Number:
              </label>
              <input
                type="text"
                value={caseNumber}
                onChange={e => setCaseNumber(e.target.value)}
                className={`w-full px-3.5 py-2 text-xs sm:text-sm font-mono rounded-xl border transition-colors ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-700 text-white focus:border-emerald-400 focus:outline-none'
                    : 'bg-white border-slate-300 text-slate-900 focus:border-emerald-500 focus:outline-none'
                }`}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={resetModal}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLaunch}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md active:scale-95"
              >
                <span>Authorize & Launch Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4
              className={`text-xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Session Authenticated & Case Bound
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6">
              You are authenticated as <strong>{selectedRole.toUpperCase()}</strong> on docket{' '}
              <strong className="text-emerald-400 font-mono">{caseNumber}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left font-mono text-xs space-y-2 mb-6">
              <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-900">
                <span>AUTHENTICATION TOKEN</span>
                <span className="text-emerald-400 font-bold">SHA-256 SEALED</span>
              </div>
              <p className="text-emerald-400 break-all text-[11px]">{generatedHash}</p>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 pt-1">
                <Check className="w-3 h-3 text-emerald-400" />
                <span>Statutory RFC 3161 Atomic Timestamp Recorded</span>
              </div>
            </div>

            <button
              type="button"
              onClick={resetModal}
              className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md"
            >
              Return to System Overview
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
