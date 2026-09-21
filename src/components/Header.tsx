import React from 'react';
import { Heart, Moon, Sun, Volume2, VolumeX, ShieldAlert, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  isNightShift: boolean;
  setIsNightShift: (val: boolean) => void;
  isMuted: boolean;
  setIsMuted: (val: boolean) => void;
  todayMinutes: number;
  onQuickStart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isNightShift,
  setIsNightShift,
  isMuted,
  setIsMuted,
  todayMinutes,
  onQuickStart,
}) => {
  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMuted(next);
  };

  return (
    <header id="app-header" className="border-b border-emerald-900/10 dark:border-emerald-900/40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-30 transition-colors duration-500 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand & HUV Hospital Badge */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 ring-4 ring-emerald-50/80 dark:ring-emerald-950/80">
              <Heart className="w-6 h-6 fill-current animate-pulse text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-50 font-sans">
                  1 minuto para mí
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100/80 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 border border-emerald-300/50 dark:border-emerald-700/50">
                  HUV
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                Pausas activas y bienestar en turno • Hospital Universitario del Valle
              </p>
            </div>
          </div>

          {/* Right actions: Quick Start, Shift mode, Sound mode, Minutes badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick emergency pause button */}
            <button
              id="quick-start-emergency-btn"
              onClick={onQuickStart}
              className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium text-xs sm:text-sm shadow-sm transition-all transform active:scale-95"
              title="Iniciar reseteo de 60 segundos inmediatamente"
            >
              <Sparkles className="w-4 h-4" />
              <span>Pausa Rápida (60s)</span>
            </button>

            {/* Shift Tracker Pill */}
            <div 
              id="today-minutes-pill"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs font-bold"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>{todayMinutes} min hoy</span>
            </div>

            {/* Quiet Zone Toggle (for ICU, patient rooms) */}
            <button
              id="sound-toggle-btn"
              onClick={toggleMute}
              className={`p-2.5 rounded-xl border transition-colors flex items-center justify-center ${
                isMuted
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title={isMuted ? 'Sonido silenciado (Modo UCI / Habitación)' : 'Sonido activado (Campanilla de guía)'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Shift Mode Toggle: Diurno vs Nocturno */}
            <button
              id="shift-theme-toggle-btn"
              onClick={() => setIsNightShift(!isNightShift)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 text-xs font-medium"
              title={isNightShift ? 'Cambiar a Turno Diurno' : 'Cambiar a Turno Nocturno (Protege tus ojos en guardia)'}
            >
              {isNightShift ? (
                <>
                  <Moon className="w-4 h-4 text-indigo-400 fill-indigo-400/20" />
                  <span className="hidden lg:inline text-indigo-300">Turno Noche</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span className="hidden lg:inline">Turno Día</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
