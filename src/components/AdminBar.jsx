import { usePortfolio } from '../context/PortfolioContext';
import { LogOut, RotateCcw } from 'lucide-react';

export default function AdminBar() {
  const { adminMode, logout, resetData } = usePortfolio();
  if (!adminMode) return null;

  const handleReset = () => {
    if (window.confirm('Reset all content to the original CV data? This cannot be undone.')) {
      resetData();
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[500] animate-fadeUp">
      <div className="flex items-center gap-3 bg-bark text-cream rounded-full px-5 py-3 shadow-2xl border border-white/10">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[0.78rem] font-medium text-cream/80">Admin Mode Active</span>
        <span className="text-cream/20">|</span>
        <span className="text-[0.72rem] text-cream/50">Click any section's ✏️ button to edit</span>
        <span className="text-cream/20">|</span>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-[0.72rem] text-cream/60 hover:text-amber-400 transition-colors"
        >
          <RotateCcw size={11} /> Reset
        </button>
        <button
          onClick={logout}
          className="flex items-center gap-1.5 text-[0.72rem] text-cream/60 hover:text-red-400 transition-colors"
        >
          <LogOut size={11} /> Exit
        </button>
      </div>
    </div>
  );
}
