export type HospitalRoleId = 
  | 'todos'
  | 'enfermeria'
  | 'medicos'
  | 'administrativo'
  | 'camilleros'
  | 'laboratorio';

export interface HospitalRole {
  id: HospitalRoleId;
  name: string;
  shortName: string;
  badge: string;
  icon: string;
  description: string;
  commonAilments: string[];
}

export type PostureType = 'cualquiera' | 'de_pie' | 'sentado';

export interface RoutineStep {
  id: string;
  title: string;
  durationSec: number;
  instruction: string;
  postureTip: string;
  breathingHint?: string;
  type: 'estiramiento' | 'respiracion' | 'visual' | 'movilidad';
}

export interface Routine {
  id: string;
  title: string;
  categoryId: 'estiramiento' | 'descanso-visual' | 'respiracion' | 'descompresion-express';
  categoryName: string;
  targetRoles: HospitalRoleId[];
  posture: PostureType;
  durationSec: number; // Always 60 for "1 minuto para mí"
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  imageUrl: string;
  intensity: 'Suave' | 'Media' | 'Restaurativa';
  huvCareTip: string;
  steps: RoutineStep[];
}

export interface RoutineCategory {
  id: 'estiramiento' | 'descanso-visual' | 'respiracion' | 'descompresion-express';
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  badgeText: string;
  colorClass: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    ring: string;
  };
}

export interface CompletedSession {
  id: string;
  routineId: string;
  routineTitle: string;
  categoryName: string;
  timestamp: number;
  completedSec: number;
}
