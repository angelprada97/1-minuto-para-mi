import React from 'react';
import { Clock, Award, ShieldCheck, RefreshCw, Flame } from 'lucide-react';
import { CompletedSession } from '../types';

interface StatsBarProps {
  sessions: CompletedSession[];
  onResetShift: () => void;
}

export const StatsBar: React.FC<StatsBarProps> = ({ sessions, onResetShift }) => {
  const totalMinutes = sessions.length; // Each completed session is 1 minute
  const lastSession = sessions[sessions.length - 1];

  const getTimeAgo = (timestamp: number) => {
    const diffMin = Math.round((Date.now() - timestamp) / (1000 * 60));
    if (diffMin < 1) return 'hace un instante';
    if (diffMin === 1) return 'hace 1 minuto';
    if (diffMin < 60) return `hace ${diffMin} min`;
    const hours = Math.floor(diffMin / 60);
    return `hace ${hours} h`;
  };

  return (
    <section id="huv-shift-stats-section" className="bg-white/95 dark:bg-slate-900/95 border-y border-emerald-900/15 dark:border-emerald-800/40 py-4 px-4 sm:px-6 lg:px-8 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Summary Metrics */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full md:w-auto justify-center md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 dark:bg-emerald-600 text-white flex items-center justify-center font-bold shadow-sm">
              <Clock className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Autocuidado en turno</p>
              <p className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                {totalMinutes} {totalMinutes === 1 ? 'minuto' : 'minutos'}
              </p>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-teal-600 dark:bg-teal-600 text-white flex items-center justify-center font-bold shadow-sm">
              <Award className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Pausas de 60s completadas</p>
              <p className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                {sessions.length} {sessions.length === 1 ? 'pausa' : 'pausas'}
              </p>
            </div>
          </div>

          {lastSession && (
            <>
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden lg:block"></div>
              <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                <span>Última pausa: <strong className="font-bold text-slate-950 dark:text-white">{lastSession.routineTitle}</strong> ({getTimeAgo(lastSession.timestamp)})</span>
              </div>
            </>
          )}
        </div>

        {/* Right: Hospital Occupational Health Badge & Reset Shift Button */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2 text-xs text-slate-800 dark:text-slate-200 bg-emerald-50 dark:bg-emerald-950/60 py-2 px-3.5 rounded-xl border border-emerald-300 dark:border-emerald-800/80 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <span className="font-semibold text-emerald-950 dark:text-emerald-200">HUV Salud en el Trabajo:</span> 1 min cada 2 horas
          </div>

          {sessions.length > 0 && (
            <button
              id="reset-shift-btn"
              onClick={onResetShift}
              className="text-xs text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-semibold flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              title="Iniciar conteo para un nuevo turno hospitalario"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Nuevo turno</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
