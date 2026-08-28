import { Scale, ShieldCheck } from 'lucide-react';
import { SectionId } from '../types';

interface FooterProps {
  isDarkMode: boolean;
  onNavigate: (section: SectionId) => void;
}

export default function Footer({ isDarkMode, onNavigate }: FooterProps) {
  return (
    <footer
      className={`w-full border-t transition-colors ${
        isDarkMode
          ? 'bg-[#06090D] border-slate-800/80 text-slate-400'
          : 'bg-slate-50 border-slate-200 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Scale className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                JUSTICE
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                DIGITAL CASE SYSTEM
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              End-to-end digital case management ensuring complete chain of custody,
              instant verification, and zero tampering from FIR to final court order.
            </p>
          </div>

          {/* Quick Nav */}
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-3">
              Navigation
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('lifecycle')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  The 5-Stage Closed Loop
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('roles')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Statutory Roles (Police, Judge, Counsel)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  How It Works (Pipeline)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('trust')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Statutory Trust & Standards
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Standards */}
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-3">
              Security & Legal
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400 font-mono">
              <li className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>RFC 3161 Atomic Clock</span>
              </li>
              <li>FIPS 180-4 SHA-256 Checksums</li>
              <li>ISO/IEC 27037 Digital Evidence</li>
              <li>Section 65B IT Act Electronic Seal</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-slate-400">
          <div>
            © 2026 JUSTICE — Digital Case Management System. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>NATIONAL JUDICIARY NETWORK: CONNECTED</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
