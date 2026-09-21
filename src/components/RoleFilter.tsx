import React from 'react';
import { 
  Users, 
  HeartHandshake, 
  Stethoscope, 
  Monitor, 
  Activity, 
  FlaskConical, 
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  Armchair,
  Footprints
} from 'lucide-react';
import { HospitalRole, HospitalRoleId, PostureType } from '../types';

interface RoleFilterProps {
  roles: HospitalRole[];
  selectedRoleId: HospitalRoleId;
  onSelectRole: (roleId: HospitalRoleId) => void;
  selectedPosture: PostureType;
  onSelectPosture: (posture: PostureType) => void;
  activeSearchQuery: string;
  onSearchChange: (query: string) => void;
}

const getRoleIcon = (iconName: string) => {
  switch (iconName) {
    case 'HeartHandshake':
      return <HeartHandshake className="w-4 h-4" />;
    case 'Stethoscope':
      return <Stethoscope className="w-4 h-4" />;
    case 'Monitor':
      return <Monitor className="w-4 h-4" />;
    case 'Activity':
      return <Activity className="w-4 h-4" />;
    case 'FlaskConical':
      return <FlaskConical className="w-4 h-4" />;
    default:
      return <Users className="w-4 h-4" />;
  }
};

export const RoleFilter: React.FC<RoleFilterProps> = ({
  roles,
  selectedRoleId,
  onSelectRole,
  selectedPosture,
  onSelectPosture,
  activeSearchQuery,
  onSearchChange
}) => {
  const currentRole = roles.find((r) => r.id === selectedRoleId) || roles[0];

  return (
    <section id="quasipersonalization-panel" className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl border border-emerald-900/10 dark:border-emerald-800/30 p-5 sm:p-7 shadow-xs mb-8 transition-colors">
      <div className="flex flex-col gap-5">
        {/* Header of Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-900/5 dark:border-emerald-800/20 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100/90 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                Personaliza tu pausa según tu rol y estado en turno
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Selecciona tu área o servicio en el HUV para adaptar las recomendaciones
              </p>
            </div>
          </div>

          {/* Posture filter selector */}
          <div className="flex items-center gap-1.5 bg-slate-100/90 dark:bg-slate-950/80 p-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs font-medium self-start sm:self-auto">
            <span className="text-slate-500 dark:text-slate-400 px-2 py-1 text-[11px] hidden md:inline font-semibold">
              Postura:
            </span>
            <button
              id="filter-posture-any"
              onClick={() => onSelectPosture('cualquiera')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedPosture === 'cualquiera'
                  ? 'bg-white dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Cualquiera
            </button>
            <button
              id="filter-posture-standing"
              onClick={() => onSelectPosture('de_pie')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                selectedPosture === 'de_pie'
                  ? 'bg-white dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Footprints className="w-3.5 h-3.5" />
              <span>De pie</span>
            </button>
            <button
              id="filter-posture-sitting"
              onClick={() => onSelectPosture('sentado')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                selectedPosture === 'sentado'
                  ? 'bg-white dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Armchair className="w-3.5 h-3.5" />
              <span>Sentado</span>
            </button>
          </div>
        </div>

        {/* Roles Pills List */}
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5 block">
            Área / Función hospitalaria en turno
          </label>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {roles.map((role) => {
              const isSelected = selectedRoleId === role.id;
              return (
                <button
                  key={role.id}
                  id={`role-btn-${role.id}`}
                  onClick={() => onSelectRole(role.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                    isSelected
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/20 ring-2 ring-emerald-500/30'
                      : 'bg-slate-50 dark:bg-slate-900/50 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-400'
                  }`}
                >
                  <span className={isSelected ? 'text-white' : 'text-slate-600 dark:text-slate-400'}>
                    {getRoleIcon(role.icon)}
                  </span>
                  <span>{role.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Role Insight Banner (Quasipersonalization details) */}
        <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/50 rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 mt-0.5 sm:mt-0 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                <strong className="font-semibold text-emerald-900 dark:text-emerald-200">{currentRole.name}:</strong>{' '}
                {currentRole.description}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Puntos de fatiga típicos:</span>
                {currentRole.commonAilments.map((ailment) => (
                  <span
                    key={ailment}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-white/80 dark:bg-slate-800/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50 font-medium"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    {ailment}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
