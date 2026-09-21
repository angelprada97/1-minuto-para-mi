import React from 'react';
import { X, Sparkles, Flame, Play, ShieldAlert } from 'lucide-react';
import { Routine } from '../types';

interface QuickStartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoutine: (routine: Routine) => void;
  routines: Routine[];
}

export const QuickStartModal: React.FC<QuickStartModalProps> = ({
  isOpen,
  onClose,
  onSelectRoutine,
  routines,
}) => {
  if (!isOpen) return null;

  // Curated 3 fastest 60-second emergency pauses for hospital staff
  const emergencyRoutines = routines.filter((r) => 
    r.id === 'descompresion-reset-guardia' || 
    r.id === 'respiracion-cuadrada-estres' || 
    r.id === 'estiramiento-cervical-trapecio'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-emerald-900/15 dark:border-emerald-800/40 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Pausa Rápida de 60 Segundos
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ideal para momentos de alta prisa entre pacientes
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
          Selecciona una de las 3 opciones de reseteo fisiológico instantáneo probadas para el personal de turno del HUV:
        </p>

        <div className="space-y-3">
          {emergencyRoutines.map((routine) => (
            <div
              key={routine.id}
              onClick={() => {
                onSelectRoutine(routine);
                onClose();
              }}
              className="group p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50 dark:bg-slate-850 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-all cursor-pointer flex items-center justify-between gap-3"
            >
              <div>
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                  {routine.categoryName}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                  {routine.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {routine.shortDescription}
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-emerald-600 group-hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
