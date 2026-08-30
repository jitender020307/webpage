import { useState } from 'react';
import { SYSTEM_ROLES } from '../../data/sihPlatformData';
import { SystemRole } from '../../types';
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  KeyRound,
  ArrowRight,
  Briefcase,
  Lock
} from 'lucide-react';

interface RolesSectionProps {
  isDarkMode: boolean;
  onOpenAccessModal: () => void;
}

export default function RolesSection({
  isDarkMode,
  onOpenAccessModal,
}: RolesSectionProps) {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number>(0);
  const currentRole: SystemRole = SYSTEM_ROLES[selectedRoleIndex];

  return (
    <section id="roles" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Users className="w-3.5 h-3.5" />
            <span>Stakeholder Clearances</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Built for Authorized Stakeholders
          </h2>
          <p
            className={`text-base sm:text-lg ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Fine-grained Role-Based Access Control (RBAC) maps directly to statutory duties across Police,
            Forensic Laboratories, Public Prosecution, and Judicial Record Desks.
          </p>
        </div>

        {/* Roles Tabs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {SYSTEM_ROLES.map((role, idx) => {
            const isSelected = selectedRoleIndex === idx;
            return (
              <button
                key={role.id}
                type="button"
                id={`role-btn-${role.id}`}
                onClick={() => setSelectedRoleIndex(idx)}
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
                <span className="text-[10px] font-mono uppercase text-slate-500 mb-1">{role.badge}</span>
                <p className="text-xs font-bold line-clamp-1">{role.title}</p>
              </button>
            );
          })}
        </div>

        {/* Active Role Card Inspector */}
        <div
          id="active-role-panel"
          className={`p-6 sm:p-8 rounded-3xl border transition-all ${
            isDarkMode
              ? 'bg-slate-900/40 border-slate-800/90 shadow-2xl'
              : 'bg-white border-slate-200 shadow-lg'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Role Info & Responsibilities (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                  {currentRole.badge}
                </span>
                <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{currentRole.clearanceLevel}</span>
                </span>
              </div>

              <div>
                <h3 className={`text-2xl sm:text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {currentRole.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mb-3">{currentRole.subtitle}</p>
                <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {currentRole.overview}
                </p>
              </div>

              {/* Operational Scope */}
              <div
                className={`p-4 rounded-xl border ${
                  isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                  Assigned Operational Scope:
                </span>
                <p className="text-xs font-mono text-slate-300 font-semibold">{currentRole.operationalScope}</p>
              </div>

              {/* Primary Responsibilities */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Core Responsibilities & Workflows:
                </h4>
                <div className="space-y-2">
                  {currentRole.primaryResponsibilities.map((resp, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs ${
                        isDarkMode
                          ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                          : 'bg-white border-slate-200 text-slate-700 shadow-sm'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Explicit Permissions Matrix (5 Cols) */}
            <div className="lg:col-span-5">
              <div
                className={`p-6 rounded-2xl border shadow-xl flex flex-col justify-between h-full ${
                  isDarkMode
                    ? 'bg-[#0B111A] border-slate-800 text-slate-200'
                    : 'bg-slate-50 border-slate-300 text-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-300">
                        STATUTORY PERMISSION MATRIX
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      LEAST PRIVILEGE
                    </span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    {currentRole.accessPermissions.map((perm, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border ${
                          perm.granted
                            ? isDarkMode
                              ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-300'
                              : 'bg-emerald-50 border-emerald-200 text-slate-800'
                            : isDarkMode
                            ? 'bg-red-500/5 border-red-500/20 text-slate-400'
                            : 'bg-red-50 border-red-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold flex items-center gap-1.5">
                            {perm.granted ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5 text-red-400" />
                            )}
                            <span>{perm.action}</span>
                          </span>
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                              perm.granted
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}
                          >
                            {perm.granted ? 'AUTHORIZED' : 'RESTRICTED'}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 pl-5 leading-tight">
                          {perm.statutoryRationale}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    Role Clearance Level: <strong className="text-emerald-400">{currentRole.clearanceLevel.split('—')[0]}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={onOpenAccessModal}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
                  >
                    <span>Authenticate Role</span>
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
