import { SIH_CHALLENGE_MAPPINGS } from '../../data/sihPlatformData';
import { Award, CheckCircle2, Shield, ArrowUpRight, Cpu } from 'lucide-react';

interface SihAlignmentSectionProps {
  isDarkMode: boolean;
}

export default function SihAlignmentSection({
  isDarkMode,
}: SihAlignmentSectionProps) {
  return (
    <section id="sih-alignment" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-3 bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Award className="w-3.5 h-3.5" />
            <span>Problem Statement Alignment</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Built Around the SIH 26190 Challenge
          </h2>
          <p
            className={`text-base sm:text-lg ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            A direct mapping between Smart India Hackathon Problem Statement 26190 requirements
            and the architectural solutions implemented in this Secure Document Management System.
          </p>
        </div>

        {/* Requirements Mapping Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SIH_CHALLENGE_MAPPINGS.map(item => (
            <div
              key={item.requirementId}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
                isDarkMode
                  ? 'bg-slate-900/40 border-slate-800/80 shadow-md hover:border-amber-500/40 hover:bg-slate-900/70'
                  : 'bg-white border-slate-200 shadow-sm hover:border-amber-500/40 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {item.requirementId}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold">
                    SIH 26190 MANDATE
                  </span>
                </div>

                <h3 className={`text-base font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {item.challengeTitle}
                </h3>

                <div className="space-y-3 mb-4">
                  <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
                    <span className="text-[10px] font-mono text-amber-400/90 uppercase block mb-1">
                      SIH Problem Requirement:
                    </span>
                    <p className="text-xs text-slate-300 italic leading-relaxed">
                      "{item.sihRequirement}"
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase block mb-1">
                      Engineered Platform Solution:
                    </span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.platformSolution}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400">{item.implementationNote}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
