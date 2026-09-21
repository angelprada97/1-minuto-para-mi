import React, { useState, useEffect, useMemo } from 'react';
import { 
  HOSPITAL_ROLES, 
  ROUTINE_CATEGORIES, 
  ROUTINES 
} from './data/routines';
import { 
  HospitalRoleId, 
  PostureType, 
  Routine, 
  CompletedSession 
} from './types';
import { Header } from './components/Header';
import { StatsBar } from './components/StatsBar';
import { RoleFilter } from './components/RoleFilter';
import { CategoryList } from './components/CategoryList';
import { RoutineCard } from './components/RoutineCard';
import { RoutinePlayer } from './components/RoutinePlayer';
import { QuickStartModal } from './components/QuickStartModal';
import { soundManager } from './utils/audio';
import { 
  Heart, 
  Sparkles, 
  Search, 
  FilterX, 
  ShieldCheck, 
  PhoneCall, 
  Building2, 
  Stethoscope 
} from 'lucide-react';

const STORAGE_KEY_SESSIONS = 'huv_1minuto_sessions';
const STORAGE_KEY_ROLE = 'huv_1minuto_role';
const STORAGE_KEY_NIGHT = 'huv_1minuto_nightshift';
const STORAGE_KEY_MUTE = 'huv_1minuto_mute';

export default function App() {
  // 1. Initial State from localStorage / Defaults
  const [selectedRoleId, setSelectedRoleId] = useState<HospitalRoleId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_ROLE);
      if (saved && HOSPITAL_ROLES.some((r) => r.id === saved)) {
        return saved as HospitalRoleId;
      }
    }
    return 'todos';
  });

  const [selectedPosture, setSelectedPosture] = useState<PostureType>('cualquiera');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Night shift auto-detection based on hour (19:00 - 06:00 is night shift) or storage
  const [isNightShift, setIsNightShift] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_NIGHT);
      if (saved !== null) return saved === 'true';
      const hour = new Date().getHours();
      return hour >= 19 || hour < 7;
    }
    return false;
  });

  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_MUTE);
      return saved === 'true';
    }
    return false;
  });

  const [sessions, setSessions] = useState<CompletedSession[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_SESSIONS);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  const [activeRoutine, setActiveRoutine] = useState<Routine | null>(null);
  const [isQuickStartOpen, setIsQuickStartOpen] = useState(false);

  // Sync Night Shift theme to document element
  useEffect(() => {
    if (isNightShift) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEY_NIGHT, String(isNightShift));
  }, [isNightShift]);

  // Sync mute state
  useEffect(() => {
    soundManager.setMuted(isMuted);
    localStorage.setItem(STORAGE_KEY_MUTE, String(isMuted));
  }, [isMuted]);

  // Sync role preference
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ROLE, selectedRoleId);
  }, [selectedRoleId]);

  // Sync sessions
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions));
  }, [sessions]);

  // Routine completion handler
  const handleCompleteRoutine = (routine: Routine) => {
    const newSession: CompletedSession = {
      id: `session-${Date.now()}`,
      routineId: routine.id,
      routineTitle: routine.title,
      categoryName: routine.categoryName,
      timestamp: Date.now(),
      completedSec: 60,
    };
    setSessions((prev) => [...prev, newSession]);
  };

  // Reset shift handler
  const handleResetShift = () => {
    if (window.confirm('¿Deseas iniciar el conteo de pausas para un nuevo turno hospitalario?')) {
      setSessions([]);
    }
  };

  // Filtered Routines logic
  const filteredRoutines = useMemo(() => {
    return ROUTINES.filter((routine) => {
      // 1. Category Filter
      if (selectedCategoryId && routine.categoryId !== selectedCategoryId) {
        return false;
      }

      // 2. Role Filter (Quasipersonalization)
      if (selectedRoleId !== 'todos') {
        const matchesRole =
          routine.targetRoles.includes(selectedRoleId) || routine.targetRoles.includes('todos');
        if (!matchesRole) return false;
      }

      // 3. Posture Filter
      if (selectedPosture !== 'cualquiera') {
        const matchesPosture =
          routine.posture === selectedPosture || routine.posture === 'cualquiera';
        if (!matchesPosture) return false;
      }

      // 4. Search Filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          routine.title.toLowerCase().includes(q) ||
          routine.shortDescription.toLowerCase().includes(q) ||
          routine.categoryName.toLowerCase().includes(q) ||
          routine.benefits.some((b) => b.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      return true;
    });
  }, [selectedCategoryId, selectedRoleId, selectedPosture, searchQuery]);

  // Reset all active filters
  const handleClearFilters = () => {
    setSelectedCategoryId(null);
    setSelectedRoleId('todos');
    setSelectedPosture('cualquiera');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-pattern-zen-calm text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-500 relative">
      {/* Soft ambient breathing orbs for tranquil atmosphere */}
      <div className="fixed top-12 left-1/4 w-[32rem] h-[32rem] bg-emerald-200/25 dark:bg-emerald-950/25 rounded-full blur-3xl pointer-events-none -z-10 animate-breathe-slow" />
      <div className="fixed bottom-20 right-1/4 w-[28rem] h-[28rem] bg-teal-200/20 dark:bg-teal-950/20 rounded-full blur-3xl pointer-events-none -z-10 animate-breathe-slow" style={{ animationDelay: '-4.5s' }} />

      {/* Top Header */}
      <Header
        isNightShift={isNightShift}
        setIsNightShift={setIsNightShift}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        todayMinutes={sessions.length}
        onQuickStart={() => setIsQuickStartOpen(true)}
      />

      {/* Shift Tracker Bar */}
      <StatsBar
        sessions={sessions}
        onResetShift={handleResetShift}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Hospital Welcome Banner */}
        <div className="mb-8 bg-gradient-to-br from-emerald-800/95 via-teal-900/90 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-teal-950/15 relative overflow-hidden border border-emerald-700/40">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-200 text-xs font-semibold mb-3 border border-white/20">
              <Building2 className="w-3.5 h-3.5" />
              <span>Hospital Universitario del Valle Evaristo García</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-2 leading-tight">
              Regálate 1 minuto en medio de tu turno
            </h2>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed mb-6 font-normal">
              Diseñado para enfermeros, médicos, personal de apoyo, administrativo y laboratorio del HUV. Elige tu categoría y realiza una pausa guiada de <strong>60 segundos</strong> sin depender de internet ni interrumpir tus funciones críticas.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                id="hero-quick-start-btn"
                onClick={() => setIsQuickStartOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-white text-emerald-900 font-bold text-sm shadow-md hover:bg-emerald-50 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Iniciar Pausa Rápida (60s)</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-emerald-200 font-medium bg-emerald-950/40 px-3.5 py-2 rounded-xl border border-emerald-500/30">
                <Stethoscope className="w-4 h-4 text-emerald-300" />
                <span>100% estático • Sin conexión a API • Seguro en servicio</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quasipersonalization Panel (Rol HUV & Postura) */}
        <RoleFilter
          roles={HOSPITAL_ROLES}
          selectedRoleId={selectedRoleId}
          onSelectRole={setSelectedRoleId}
          selectedPosture={selectedPosture}
          onSelectPosture={setSelectedPosture}
          activeSearchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Categories List with Images & Names */}
        <CategoryList
          categories={ROUTINE_CATEGORIES}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
          routines={filteredRoutines}
        />

        {/* Search & Active Filters Status */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Paso 2: Selecciona tu rutina
            </span>
            <span className="text-xs text-slate-400 font-semibold">•</span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {filteredRoutines.length} {filteredRoutines.length === 1 ? 'rutina disponible' : 'rutinas disponibles'}
            </span>
          </div>

          {/* Search bar */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="routine-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por síntoma (ej. cuello, ojos, estrés)..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>
        </div>

        {/* Routines Grid */}
        {filteredRoutines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoutines.map((routine) => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                onStartRoutine={(r) => setActiveRoutine(r)}
                currentRoleId={selectedRoleId}
              />
            ))}
          </div>
        ) : (
          /* Empty State when filters yield no match */
          <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-md mx-auto my-8">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <FilterX className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              No hay rutinas con este filtro
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Intenta cambiar la postura o seleccionar "Ver Todas las Categorías" para explorar todo el catálogo del HUV.
            </p>
            <button
              onClick={handleClearFilters}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              Restablecer todos los filtros
            </button>
          </div>
        )}

      </main>

      {/* Hospital Ergonomics Institutional Footer */}
      <footer id="app-footer" className="border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 py-8 px-4 sm:px-6 lg:px-8 mt-16 transition-colors shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5 fill-current text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                1 minuto para mí • Salud Ocupacional HUV
              </p>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Hospital Universitario del Valle "Evaristo García" E.S.E. • Cali, Valle del Cauca
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              Comité Paritario de Seguridad y Salud en el Trabajo (COPASST)
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Aplicación estática para personal en turno</span>
          </div>
        </div>
      </footer>

      {/* 60-Second Interactive Player Modal */}
      {activeRoutine && (
        <RoutinePlayer
          routine={activeRoutine}
          onClose={() => setActiveRoutine(null)}
          onComplete={handleCompleteRoutine}
          isMuted={isMuted}
          onToggleMute={() => {
            const next = !isMuted;
            setIsMuted(next);
            soundManager.setMuted(next);
          }}
        />
      )}

      {/* Fast Emergency 60s Start Modal */}
      <QuickStartModal
        isOpen={isQuickStartOpen}
        onClose={() => setIsQuickStartOpen(false)}
        onSelectRoutine={(r) => setActiveRoutine(r)}
        routines={ROUTINES}
      />
    </div>
  );
}
