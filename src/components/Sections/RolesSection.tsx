import { useState } from 'react';
import {
  Shield,
  Briefcase,
  Gavel,
  User,
  CheckCircle2,
  XCircle,
  Clock,
  FileCheck2,
  Lock,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { SYSTEM_ROLES } from '../../data/justiceData';
import { RoleId } from '../../types';

interface RolesSectionProps {
  isDarkMode: boolean;
  onOpenAccessModal: () => void;
}

export default function RolesSection({ isDarkMode, onOpenAccessModal }: RolesSectionProps) {
  const [selectedRoleId, setSelectedRoleId] = useState<RoleId>('police');

  const activeRole = SYSTEM_ROLES.find(r => r.id === selectedRoleId) || SYSTEM_ROLES[0];

  const getRoleIcon = (id: RoleId, className = 'w-5 h-5') => {
    switch (id) {
      case 'police':
        return <Shield className={className} />;
      case 'prosecutor':
        return <Briefcase className={className} />;
      case 'judge':
        return <Gavel className={className} />;
      case 'citizen':
        return <User className={className} />;
    }
  };

  return (
    <section id="roles" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Shield className="w-3.5 h-3.5" />
            <span>Role-Based Governance</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-bold tracking-tight mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Built for Every Stakeholder
          </h2>
          <p
            className={`text-base sm:text-lg ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Strict Role-Based Access Control (RBAC) ensures law enforcement, prosecutors,
            magistrates, and citizens access only what statutory law authorizes.
          </p>
        </div>

        {/* 4 Role Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {SYSTEM_ROLES.map(role => {
            const isSelected = selectedRoleId === role.id;
            return (
              <button
                key={role.id}
                type="button"
                id={`role-tab-${role.id}`}
                onClick={() => setSelectedRoleId(role.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col gap-2 ${
                  isSelected
                    ? isDarkMode
                      ? 'bg-slate-800/90 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)] text-white'
                      : 'bg-white border-emerald-500 shadow-md text-slate-900 ring-2 ring-emerald-400/20'
                    : isDarkMode
                    ? 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                    : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : isDarkMode
                        ? 'bg-slate-800 text-slate-300'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {getRoleIcon(role.id, 'w-4 h-4')}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                    {role.badge.split(' ')[0]}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold leading-snug">
                    {role.title.split(' ')[0]}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-normal truncate">
                    {role.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Role Deep-Dive Card */}
        <div
          id="active-role-card"
          className={`p-6 sm:p-10 rounded-3xl border transition-all backdrop-blur-md ${
            isDarkMode
              ? 'bg-slate-900/60 border-slate-800 shadow-2xl text-slate-200'
              : 'bg-white border-slate-200 shadow-lg text-slate-800'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: Role Summary & Permissions Matrix (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  {activeRole.badge}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {activeRole.clearanceLevel}
                </span>
              </div>

              <h3
                className={`text-2xl sm:text-3xl font-bold tracking-tight mb-3 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                {activeRole.title}
              </h3>

              <p
                className={`text-sm sm:text-base leading-relaxed mb-6 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {activeRole.summary}
              </p>

              {/* Responsibilities list */}
              <div className="mb-6">
                <h5 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-400 mb-3">
                  Statutory Responsibilities:
                </h5>
                <ul className="space-y-2">
                  {activeRole.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
                        {resp}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Strict Access Protocol Matrix */}
              <div>
                <h5 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-400 mb-3">
                  Cryptographic RBAC Matrix:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeRole.permissions.map((p, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                        p.allowed
                          ? isDarkMode
                            ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : isDarkMode
                          ? 'bg-red-950/20 border-red-900/40 text-red-300'
                          : 'bg-red-50 border-red-200 text-red-800'
                      }`}
                    >
                      {p.allowed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-semibold">{p.name}</p>
                        <p className="text-[10px] opacity-80 mt-0.5">{p.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Live Operational Metrics & Sandbox Trigger (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* Operational Stats Widget */}
              <div
                className={`p-5 rounded-2xl border ${
                  isDarkMode
                    ? 'bg-slate-950/80 border-slate-800'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/50">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Live Portal Metrics
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>SYNCHRONIZED</span>
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">
                      Active Managed Dockets
                    </span>
                    <p className="text-3xl font-extrabold font-mono text-white">
                      {activeRole.activeCasesSummary.total.toLocaleString()}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/40">
                    <span className="text-xs text-slate-400 block mb-1">
                      Pending Action Queue
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-amber-400">
                      {activeRole.activeCasesSummary.pendingAction}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/40">
                    <span className="text-xs text-slate-400 block mb-1">
                      Statutory SLA Compliance
                    </span>
                    <p className="text-xl font-bold font-mono text-emerald-400">
                      {activeRole.activeCasesSummary.slaScore}
                    </p>
                  </div>
                </div>
              </div>

              {/* Fast Sandbox Test Trigger */}
              <div
                className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800'
                    : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Instant Interactive Sandbox</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Test the live portal interface configured specifically for{' '}
                    <strong className="text-white">{activeRole.title}</strong> with sample
                    prosecution exhibits and digital docket entries.
                  </p>
                </div>

                <button
                  type="button"
                  id={`open-role-sandbox-${activeRole.id}`}
                  onClick={onOpenAccessModal}
                  className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Launch {activeRole.title.split(' ')[0]} Sandbox</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
