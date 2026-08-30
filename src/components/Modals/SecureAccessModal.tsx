import { useState, FormEvent } from 'react';
import { SYSTEM_ROLES } from '../../data/sihPlatformData';
import { SystemRole, RoleId } from '../../types';
import {
  X,
  Lock,
  KeyRound,
  ShieldCheck,
  Building,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

interface SecureAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function SecureAccessModal({
  isOpen,
  onClose,
  isDarkMode,
}: SecureAccessModalProps) {
  const [selectedRoleId, setSelectedRoleId] = useState<RoleId>('investigating_officer');
  const [officerId, setOfficerId] = useState<string>('DL-POLICE-8821');
  const [passcode, setPasscode] = useState<string>('••••••••••••');
  const [mfaCode, setMfaCode] = useState<string>('491820');
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [authenticatedSuccess, setAuthenticatedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentRole = SYSTEM_ROLES.find(r => r.id === selectedRoleId) || SYSTEM_ROLES[0];

  const handleRoleSelect = (role: SystemRole) => {
    setSelectedRoleId(role.id);
    // Auto-populate realistic sample badge for quick testing
    switch (role.id) {
      case 'investigating_officer':
        setOfficerId('DL-POLICE-8821');
        break;
      case 'forensic_analyst':
        setOfficerId('CFSL-EXAM-041');
        break;
      case 'legal_officer':
        setOfficerId('PROSECUTION-DL-902');
        break;
      case 'reviewer':
        setOfficerId('SUPV-INSP-331');
        break;
      case 'auditor':
        setOfficerId('VIGILANCE-AUD-108');
        break;
      case 'administrator':
        setOfficerId('SYS-ADMIN-SEC-01');
        break;
    }
  };

  const handleAuthenticate = (e: FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthenticatedSuccess(true);
    }, 900);
  };

  return (
    <div
      id="secure-access-gateway-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div
        className={`w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh] transition-all ${
          isDarkMode
            ? 'bg-[#090E17] border-slate-800 text-slate-200'
            : 'bg-white border-slate-300 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Authorized Personnel Access Portal
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  MFA REQUIRED
                </span>
              </div>
              <p className="text-xs text-slate-400">
                SIH Problem Statement 26190 // Secure Document Management System Gateway
              </p>
            </div>
          </div>

          <button
            type="button"
            id="close-access-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {authenticatedSuccess ? (
            /* Successful Session Handshake Screen */
            <div className="py-8 text-center space-y-5 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto animate-pulse">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-bold">
                  AUTHENTICATION SUCCESSFUL // TOKEN ISSUED
                </span>
                <h4 className={`text-2xl font-bold mt-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Authorized for: {currentRole.title}
                </h4>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  CLEARANCE: {currentRole.clearanceLevel} | BADGE: {officerId}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 max-w-lg mx-auto text-left text-xs font-mono space-y-2 text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">SESSION TOKEN:</span>
                  <span className="text-emerald-400">SES-2026-DL-JWT-99182</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">ASSIGNED SCOPE:</span>
                  <span className="text-slate-200">{currentRole.operationalScope}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">AUDIT LOG ENTRY:</span>
                  <span className="text-slate-400">#EVT-LOGIN-AUTHENTICATED</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 max-w-md mx-auto">
                In a production deployment, this gateway redirects authorized officers to the separate, air-gapped
                Secure DMS Dashboard with their role-scoped access tokens.
              </p>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAuthenticatedSuccess(false)}
                  className="px-6 py-2.5 rounded-full text-xs font-mono font-bold border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
                >
                  Switch Role / Test Another
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                >
                  Return to Landing Page
                </button>
              </div>
            </div>
          ) : (
            /* Role Selection & Credentials Input */
            <form onSubmit={handleAuthenticate} className="space-y-6">
              {/* Role Selection Selector */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  1. Select Department Clearance / Role:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SYSTEM_ROLES.map(role => {
                    const isSelected = selectedRoleId === role.id;
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => handleRoleSelect(role)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? isDarkMode
                              ? 'bg-slate-800 border-emerald-500 text-white shadow-md ring-1 ring-emerald-500'
                              : 'bg-emerald-50 border-emerald-500 text-slate-900 ring-1 ring-emerald-500'
                            : isDarkMode
                            ? 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                        }`}
                      >
                        <span className="text-[9px] font-mono text-slate-500 uppercase block mb-0.5">
                          {role.badge}
                        </span>
                        <p className="text-xs font-bold leading-snug line-clamp-1">{role.title}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Role Clearance Notice */}
              <div
                className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-mono ${
                  isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block">Selected Clearance:</span>
                  <span className="text-emerald-400 font-semibold">{currentRole.clearanceLevel}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 text-[10px] uppercase block">Assigned Scope:</span>
                  <span className="text-slate-300">{currentRole.operationalScope}</span>
                </div>
              </div>

              {/* Credentials Fields */}
              <div className="space-y-4">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  2. Department Credentials:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block mb-1">
                      Department / Badge ID
                    </span>
                    <input
                      type="text"
                      value={officerId}
                      onChange={e => setOfficerId(e.target.value)}
                      required
                      className={`w-full p-2.5 rounded-xl text-xs font-mono border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        isDarkMode
                          ? 'bg-slate-950 border-slate-800 text-slate-200'
                          : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block mb-1">
                      Hardware Token / Secret
                    </span>
                    <input
                      type="password"
                      value={passcode}
                      onChange={e => setPasscode(e.target.value)}
                      required
                      className={`w-full p-2.5 rounded-xl text-xs font-mono border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        isDarkMode
                          ? 'bg-slate-950 border-slate-800 text-slate-200'
                          : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block mb-1">
                      MFA OTP (Time-Based)
                    </span>
                    <input
                      type="text"
                      value={mfaCode}
                      onChange={e => setMfaCode(e.target.value)}
                      required
                      maxLength={6}
                      className={`w-full p-2.5 rounded-xl text-xs font-mono border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        isDarkMode
                          ? 'bg-slate-950 border-slate-800 text-slate-200'
                          : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className={`w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                    isAuthenticating
                      ? 'bg-emerald-600/50 text-slate-950 cursor-wait'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25'
                  }`}
                >
                  <KeyRound className="w-4 h-4" />
                  <span>{isAuthenticating ? 'Verifying Department Clearance...' : 'Authenticate & Enter Secure Workspace'}</span>
                  {!isAuthenticating && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800/80">
                <span className="flex items-center gap-1">
                  <Building className="w-3 h-3 text-slate-400" />
                  <span>AIR-GAPPED PROTOCOL READY</span>
                </span>
                <span>SIH PROBLEM STATEMENT 26190</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
