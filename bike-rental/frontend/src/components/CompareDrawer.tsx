import React from 'react';
import { Layers, X, ArrowRight, Trash2 } from 'lucide-react';
import { Vehicle } from '../types';

interface CompareDrawerProps {
  vehicles: Vehicle[];
  onRemove: (vehicleId: number) => void;
  onClear: () => void;
  onOpenCompare: () => void;
}

export const CompareDrawer: React.FC<CompareDrawerProps> = ({
  vehicles,
  onRemove,
  onClear,
  onOpenCompare
}) => {
  if (vehicles.length === 0) return null;

  return (
    <aside 
      aria-label="Vehicle comparison drawer"
      className="fixed bottom-0 inset-x-0 z-40 bg-[#141416]/95 backdrop-blur-xl border-t border-[#00E5C7]/30 shadow-2xl p-3 sm:p-4 animate-in slide-in-from-bottom duration-300"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left: Summary & Count */}
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Compare Fleet Models</p>
              <p className="text-[11px] text-slate-400">
                {vehicles.length} of 4 selected {vehicles.length === 1 ? '(add 1 more to compare)' : ''}
              </p>
            </div>
          </div>

          <button
            onClick={onClear}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1 sm:hidden"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>

        {/* Center: Selected Vehicle Badges */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto py-1">
          {vehicles.map((v) => (
            <div
              key={v.id}
              className="flex items-center space-x-2 px-2.5 py-1.5 rounded-xl bg-[#0A0A0B] border border-white/10 shrink-0"
            >
              <img
                src={v.imageUrl}
                alt={v.name}
                className="w-8 h-6 object-cover rounded-md"
              />
              <span className="text-xs font-semibold text-white max-w-[120px] truncate">
                {v.name}
              </span>
              <button
                onClick={() => onRemove(v.id)}
                className="text-slate-400 hover:text-white p-0.5"
                title="Remove from compare"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {vehicles.length < 4 && (
            <button
              onClick={onOpenCompare}
              className="px-3 py-1.5 rounded-xl border border-dashed border-white/20 text-slate-400 hover:text-[#00E5C7] hover:border-[#00E5C7]/50 text-xs font-medium shrink-0 transition"
            >
              + Add {4 - vehicles.length} more
            </button>
          )}
        </div>

        {/* Right: Compare Actions */}
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          <button
            onClick={onClear}
            className="hidden sm:flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-rose-400 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>

          <button
            onClick={onOpenCompare}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5C7] to-[#00B4D8] text-black font-extrabold text-xs shadow-teal-glow hover:opacity-95 transition flex items-center justify-center space-x-2"
          >
            <span>Compare Side-by-Side</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </aside>
  );
};
