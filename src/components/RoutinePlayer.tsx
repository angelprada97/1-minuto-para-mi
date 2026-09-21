import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Heart, 
  Sparkles, 
  ShieldCheck,
  Footprints,
  Armchair
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Routine, RoutineStep } from '../types';
import { soundManager } from '../utils/audio';

interface RoutinePlayerProps {
  routine: Routine;
  onClose: () => void;
  onComplete: (routine: Routine) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const RoutinePlayer: React.FC<RoutinePlayerProps> = ({
  routine,
  onClose,
  onComplete,
  isMuted,
  onToggleMute,
}) => {
  const TOTAL_DURATION = routine.durationSec; // 60s
  const [totalSecondsLeft, setTotalSecondsLeft] = useState(TOTAL_DURATION);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepSecondsLeft, setStepSecondsLeft] = useState(routine.steps[0]?.durationSec || 20);
  const [isCompleted, setIsCompleted] = useState(false);

  // Audio start chime on mount
  useEffect(() => {
    soundManager.playChimeStart();
  }, []);

  const currentStep: RoutineStep | undefined = routine.steps[currentStepIndex];

  // Timer interval effect
  useEffect(() => {
    if (!isPlaying || isCompleted) return;

    const interval = setInterval(() => {
      setTotalSecondsLeft((prevTotal) => {
        if (prevTotal <= 1) {
          clearInterval(interval);
          setIsCompleted(true);
          soundManager.playCompleteChime();
          onComplete(routine);
          return 0;
        }
        return prevTotal - 1;
      });

      setStepSecondsLeft((prevStep) => {
        if (prevStep <= 1) {
          // Advance to next step if available
          setCurrentStepIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            if (nextIndex < routine.steps.length) {
              soundManager.playStepChime();
              setStepSecondsLeft(routine.steps[nextIndex].durationSec);
              return nextIndex;
            } else {
              return prevIndex;
            }
          });
          return 0;
        }
        return prevStep - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, isCompleted, routine, onComplete]);

  // Restart function
  const handleRestart = () => {
    setIsPlaying(true);
    setIsCompleted(false);
    setTotalSecondsLeft(TOTAL_DURATION);
    setCurrentStepIndex(0);
    setStepSecondsLeft(routine.steps[0]?.durationSec || 20);
    soundManager.playChimeStart();
  };

  // Next step manually
  const handleNextStep = () => {
    if (currentStepIndex < routine.steps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      setStepSecondsLeft(routine.steps[nextIdx].durationSec);
      soundManager.playStepChime();
    }
  };

  // SVG circular progress calculations
  const radius = 96;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = ((TOTAL_DURATION - totalSecondsLeft) / TOTAL_DURATION);
  const strokeDashoffset = circumference - progressPercent * circumference;

  return (
    <div id="routine-player-modal" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-900/15 dark:border-emerald-800/40 overflow-hidden my-auto">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-900/10 dark:border-emerald-800/30 bg-emerald-50/40 dark:bg-emerald-950/30">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              <Sparkles className="w-3.5 h-3.5" /> 1 minuto para mí
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">•</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline font-medium">
              HUV Salud en Turno
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="player-sound-toggle"
              onClick={onToggleMute}
              className={`p-2 rounded-xl border text-xs flex items-center gap-1 transition-colors ${
                isMuted
                  ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}
              title={isMuted ? 'Silenciado' : 'Sonido activado'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              id="close-player-btn"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Salir de la pausa"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isCompleted ? (
          <div className="p-6 sm:p-8 flex flex-col items-center text-center">
            {/* Routine Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">
              {routine.title}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-medium mb-6">
              {routine.categoryName} • {routine.steps.length} pasos para tu recuperación
            </p>

            {/* Circular Timer & Animated Visualizer */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-2">
              {/* Pulsing breathing aura backdrop */}
              <motion.div
                animate={{
                  scale: isPlaying ? [1, 1.15, 1] : 1,
                  opacity: isPlaying ? [0.15, 0.35, 0.15] : 0.1,
                }}
                transition={{
                  duration: currentStep?.type === 'respiracion' ? 6 : 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-4 rounded-full bg-emerald-500 blur-xl pointer-events-none"
              />

              {/* SVG Ring */}
              <svg className="w-full h-full transform -rotate-90">
                {/* Background Track */}
                <circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  className="stroke-slate-100 dark:stroke-slate-800"
                  strokeWidth="12"
                  fill="transparent"
                />
                {/* Dynamic Progress Track */}
                <circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  className="stroke-emerald-600 dark:stroke-emerald-400 transition-all duration-1000 ease-linear"
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* Inner Circle Content */}
              <div className="absolute flex flex-col items-center justify-center p-4">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-50 tracking-tight font-mono">
                  {totalSecondsLeft}s
                </span>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold mt-1">
                  de 60 segundos
                </span>
                <div className="mt-2 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  Paso {currentStepIndex + 1} de {routine.steps.length}
                </div>
              </div>
            </div>

            {/* Step Guidance Box */}
            <div className="w-full max-w-lg mt-4 mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep?.id || currentStepIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 rounded-2xl p-4 sm:p-5 text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                      Instrucción del paso actual ({stepSecondsLeft}s restantes)
                    </span>
                    {routine.posture === 'de_pie' && (
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Footprints className="w-3 h-3" /> De pie
                      </span>
                    )}
                    {routine.posture === 'sentado' && (
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Armchair className="w-3 h-3" /> Sentado
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                    {currentStep?.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                    {currentStep?.instruction}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-white/70 dark:bg-slate-900/60 border border-emerald-100 dark:border-emerald-900/40 text-slate-600 dark:text-slate-400">
                      <strong>Postura:</strong> {currentStep?.postureTip}
                    </div>
                    {currentStep?.breathingHint && (
                      <div className="p-2 rounded-lg bg-white/70 dark:bg-slate-900/60 border border-emerald-100 dark:border-emerald-900/40 text-slate-600 dark:text-slate-400">
                        <strong>Ritmo:</strong> {currentStep.breathingHint}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Interactive Player Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                id="player-restart-btn"
                onClick={handleRestart}
                className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
                title="Reiniciar 60 segundos"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                id="player-play-pause-btn"
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/25 flex items-center gap-2 transform active:scale-95 transition-all cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5 fill-current" />
                    <span>Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current" />
                    <span>Reanudar</span>
                  </>
                )}
              </button>

              {currentStepIndex < routine.steps.length - 1 && (
                <button
                  id="player-skip-step-btn"
                  onClick={handleNextStep}
                  className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
                  title="Siguiente paso"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Completion State */
          <div className="p-8 sm:p-12 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/30">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
              ¡1 Minuto de Autocuidado Completado!
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight mb-3">
              Excelente trabajo en tu turno
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mb-6 leading-relaxed">
              Has invertido <strong>60 segundos</strong> para liberar la sobrecarga muscular y reiniciar tu calma mental. Tu bienestar es vital para la atención de excelencia en el <strong>Hospital Universitario del Valle (HUV)</strong>.
            </p>

            <div className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 max-w-md w-full mb-8 text-left text-xs text-slate-600 dark:text-slate-300 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Salud y Seguridad en el Trabajo HUV</span>
              </div>
              <p>
                Hidrátate con agua y recuerda realizar otra pausa dentro de 2 horas. Tus pacientes y tus compañeros te lo agradecerán.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
              <button
                id="player-repeat-btn"
                onClick={handleRestart}
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Repetir rutina</span>
              </button>

              <button
                id="player-finish-btn"
                onClick={onClose}
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Listo, volver al menú</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
