import { Shield, ShieldCheck, Scale, Lock, ArrowUp } from 'lucide-react';
import { SectionId } from '../types';

interface FooterProps {
  isDarkMode: boolean;
  onNavigate: (section: SectionId) => void;
}

export default function Footer({ isDarkMode, onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className={`w-full border-t transition-colors ${
        isDarkMode
          ? 'bg-[#06090D] border-slate-800/80 text-slate-400'
          : 'bg-slate-50 border-slate-200 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Shield className="w-4 h-4" />
              </div>
              <span className={`font-extrabold text-lg tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                SIH 26190
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                SECURE DMS
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A secure digital document management system engineered for legal and investigation records.
              Enforcing granular Role-Based Access Control, deterministic SHA-256 integrity verification,
              non-destructive version lineage, immutable audit logging, and Section 65B evidentiary chain of custody.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-emerald-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SIH Problem Statement 26190</span>
              </span>
              <span>•</span>
              <span>Ministry & Law Enforcement Ready</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <p className={`text-xs font-mono font-bold uppercase tracking-wider mb-4 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              Platform Navigation
            </p>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('product')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Product Overview & Architecture
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('security')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Security Pillars & Live Hashing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('lifecycle')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  The 8-Stage Investigation Lifecycle
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('roles')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Stakeholder Roles & Clearance
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('trust')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Statutory Trust & Section 65B
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('sih-alignment')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  SIH 26190 Challenge Alignment
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Standards */}
          <div>
            <p className={`text-xs font-mono font-bold uppercase tracking-wider mb-4 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              Legal & Security Standards
            </p>
            <ul className="space-y-2 text-xs text-slate-400 font-mono">
              <li className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>FIPS 180-4 SHA-256 Integrity</span>
              </li>
              <li>ISO/IEC 27037 Digital Evidence</li>
              <li>Section 65B Indian Evidence Act</li>
              <li>Bharatiya Sakshya Adhiniyam (BSA)</li>
              <li>Least-Privilege RBAC Model</li>
              <li>WORM Long-Term Archival Sealing</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>
            © 2026 SIH 26190 // Secure Digital Document Management System. Built for Smart India Hackathon.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
