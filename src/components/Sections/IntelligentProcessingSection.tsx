import { INTELLIGENT_FEATURES } from '../../data/sihPlatformData';
import {
  Sparkles,
  FileSearch,
  FolderTree,
  FileCheck2,
  CopyCheck,
  GitMerge,
  Cpu
} from 'lucide-react';

interface IntelligentProcessingSectionProps {
  isDarkMode: boolean;
}

export default function IntelligentProcessingSection({
  isDarkMode,
}: IntelligentProcessingSectionProps) {
  const getFeatureIcon = (id: string) => {
    switch (id) {
      case 'ocr_extraction':
        return <FileSearch className="w-5 h-5" />;
      case 'document_classification':
        return <FolderTree className="w-5 h-5" />;
      case 'entity_recognition':
        return <FileCheck2 className="w-5 h-5" />;
      case 'duplicate_detection':
        return <CopyCheck className="w-5 h-5" />;
      case 'case_association':
        return <GitMerge className="w-5 h-5" />;
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <section id="intelligence" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Assistive Document Intelligence</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Intelligent Document Processing
          </h2>
          <p
            className={`text-base sm:text-lg ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Practical, assistive document parsing designed to accelerate search, extract metadata from scanned
            records, and detect duplicate filings without compromising human evidentiary oversight.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INTELLIGENT_FEATURES.map(feat => (
            <div
              key={feat.id}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 ${
                isDarkMode
                  ? 'bg-slate-900/40 border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/70 shadow-lg'
                  : 'bg-white border-slate-200 hover:border-cyan-500/40 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    {getFeatureIcon(feat.id)}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-semibold uppercase">
                    {feat.badge}
                  </span>
                </div>

                <h3 className={`text-base font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {feat.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400 mb-3">{feat.tagline}</p>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {feat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                  Practical Investigative Impact:
                </span>
                <p className="text-xs font-mono text-slate-300">
                  {feat.practicalApplication}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
