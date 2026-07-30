export interface ExerciseCatalogItem {
  id: string;
  name: string;
  muscleGroup: 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core';
  category: 'barbell' | 'dumbbell' | 'machine' | 'cable' | 'bodyweight';
  isCompound: boolean;
  recommendedRestSeconds: number;
}

export const EXERCISE_CATALOG: ExerciseCatalogItem[] = [
  { id: 'ex_bench_press', name: 'Press Banca con Barra', muscleGroup: 'chest', category: 'barbell', isCompound: true, recommendedRestSeconds: 180 },
  { id: 'ex_incline_press', name: 'Press Inclinado con Mancuernas', muscleGroup: 'chest', category: 'dumbbell', isCompound: true, recommendedRestSeconds: 120 },
  { id: 'ex_dips', name: 'Fondos en Paralelas (Dips)', muscleGroup: 'chest', category: 'bodyweight', isCompound: true, recommendedRestSeconds: 90 },
  { id: 'ex_squat', name: 'Sentadilla Trasera con Barra', muscleGroup: 'legs', category: 'barbell', isCompound: true, recommendedRestSeconds: 180 },
  { id: 'ex_leg_press', name: 'Prensa 45°', muscleGroup: 'legs', category: 'machine', isCompound: true, recommendedRestSeconds: 120 },
  { id: 'ex_deadlift', name: 'Peso Muerto Convencional', muscleGroup: 'back', category: 'barbell', isCompound: true, recommendedRestSeconds: 180 },
  { id: 'ex_pull_ups', name: 'Dominadas Pronadas', muscleGroup: 'back', category: 'bodyweight', isCompound: true, recommendedRestSeconds: 120 },
  { id: 'ex_barbell_row', name: 'Remo con Barra', muscleGroup: 'back', category: 'barbell', isCompound: true, recommendedRestSeconds: 120 },
  { id: 'ex_overhead_press', name: 'Press Militar de Pie', muscleGroup: 'shoulders', category: 'barbell', isCompound: true, recommendedRestSeconds: 150 },
  { id: 'ex_lateral_raise', name: 'Elevaciones Laterales', muscleGroup: 'shoulders', category: 'dumbbell', isCompound: false, recommendedRestSeconds: 60 },
  { id: 'ex_bicep_curl', name: 'Curl de Biceps con Mancuernas', muscleGroup: 'arms', category: 'dumbbell', isCompound: false, recommendedRestSeconds: 60 },
  { id: 'ex_tricep_pushdown', name: 'Extensión de Triceps en Polea', muscleGroup: 'arms', category: 'cable', isCompound: false, recommendedRestSeconds: 60 },
];

export interface CustomRoutine {
  id: string;
  title: string;
  exercises: {
    exerciseId: string;
    name: string;
    muscleGroup: string;
    sets: { weightKg: number; reps: number; setType?: 'warmup' | 'working' | 'dropset' | 'failure' }[];
  }[];
}
