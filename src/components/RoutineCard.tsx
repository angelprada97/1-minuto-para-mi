import React, { useState } from 'react';
import { Play, Clock, CheckCircle2, ChevronDown, ChevronUp, AlertCircle, Sparkles, Footprints, Armchair } from 'lucide-react';
import { Routine, HospitalRoleId } from '../types';

interface RoutineCardProps {
  routine: Routine;
  onStartRoutine: (routine: Routine) => void;
  currentRoleId: HospitalRoleId;
}

export const RoutineCard: React.FC<RoutineCardProps> = ({
  routine,
  onStartRoutine,
  currentRoleId,
}) => {
  const [showSteps, setShowSteps] = useState(false);

  const isRoleRecommended =
    routine.targetRoles.includes(currentRoleId) || routine.targetRoles.includes('todos');

  const getPostureBadge = () => {
    switch (routine.posture) {
      case 'de_pie':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
            <Footprints className="w-3 h-3" /> De pie
          </span>
        );
      case 'sentado':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/60">
            <Armchair className="w-3 h-3" /> Sentado
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Pie o sentado
          </span>
        );
    }
  };

  return (
    <div
      id={`routine-card-${routine.id}`}
      className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-xs rounded-3xl border border-emerald-900/10 dark:border-emerald-800/30 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Card Image Banner */}
        <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
          <img
            src={routine.imageUrl}
            alt={routine.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* 60s Duration Pill top-right */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-950/80 text-white backdrop-blur-md shadow-xs border border-white/20">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>60 segundos</span>
          </div>

          {/* Category Pill top-left */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-600/90 text-white backdrop-blur-xs shadow-xs">
              {routine.categoryName}
            </span>
          </div>

          {/* Title on image overlay bottom */}
          <div className="absolute bottom-3 left-3 right-3">
            {isRoleRecommended && currentRoleId !== 'todos' && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-md mb-1 border border-emerald-500/40">
                <Sparkles className="w-3 h-3" /> Recomendado para tu área
              </span>
            )}
            <h3 className="text-lg font-bold text-white leading-snug drop-shadow-xs">
              {routine.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          {/* Posture & Intensity Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {getPostureBadge()}
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Intensidad: {routine.intensity}
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50">
              {routine.steps.length} {routine.steps.length === 1 ? 'paso continuo' : 'pasos guiados'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">
            {routine.shortDescription}
          </p>

          {/* Benefits list */}
          <div className="space-y-1.5 mb-4">
            {routine.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* HUV Clinical Care Note */}
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-700/60 rounded-xl p-2.5 text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
            <span>
              <strong>Consejo HUV:</strong> {routine.huvCareTip}
            </span>
          </div>

          {/* Step list toggle */}
          <div className="mt-3">
            <button
              onClick={() => setShowSteps(!showSteps)}
              className="w-full flex items-center justify-between text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 py-1.5 border-t border-slate-100 dark:border-slate-700/60"
            >
              <span>{showSteps ? 'Ocultar desglose de pasos' : 'Ver desglose de los 60 segundos'}</span>
              {showSteps ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showSteps && (
              <div className="mt-2 space-y-2 pt-1 pb-1">
                {routine.steps.map((step, idx) => (
                  <div
                    key={step.id}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-700/50 text-xs"
                  >
                    <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200 mb-1">
                      <span>Paso {idx + 1}: {step.title}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 text-[11px]">
                        {step.durationSec}s
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      {step.instruction}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action CTA footer */}
      <div className="p-4 sm:p-5 pt-0">
        <button
          id={`start-routine-btn-${routine.id}`}
          onClick={() => onStartRoutine(routine)}
          className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Iniciar mi minuto (60s)</span>
        </button>
      </div>
    </div>
  );
};
