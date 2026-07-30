import { Exercise, MuscleGroup, Workout, WorkoutSet } from '../types/index';

export interface RoutineExercise {
  exerciseId: string;
  exerciseName: string;
  muscleGroup: MuscleGroup;
  targetSetsCount: number;
  targetRepsRange: string; // e.g. "8-12"
  targetRestSeconds: number;
}

export interface RoutineDay {
  id: string;
  dayName: string; // e.g. "Día 1: Push (Pecho, Hombro, Tríceps)"
  exercises: RoutineExercise[];
}

export interface Routine {
  id: string;
  title: string;
  description: string;
  targetGoal: 'hypertrophy' | 'fat_loss' | 'strength' | 'general_health';
  daysPerWeek: number;
  isPreset: boolean;
  days: RoutineDay[];
}

/**
 * Preset Routine 1: Push / Pull / Legs (Hypertrophy - 6 Days/Week)
 */
export const PUSH_PULL_LEGS_PRESET: Routine = {
  id: 'preset-ppl-6day',
  title: 'Rutina Hypertrophy Push / Pull / Legs',
  description: 'Rutina optimizada para ganancia muscular e incremento de fuerza de 6 días a la semana.',
  targetGoal: 'hypertrophy',
  daysPerWeek: 6,
  isPreset: true,
  days: [
    {
      id: 'day-push',
      dayName: 'Día 1 & 4: Empuje (Push - Pecho, Hombro, Tríceps)',
      exercises: [
        { exerciseId: 'e-1', exerciseName: 'Press de Banca Plano con Barra', muscleGroup: 'chest', targetSetsCount: 4, targetRepsRange: '6-8', targetRestSeconds: 120 },
        { exerciseId: 'e-4', exerciseName: 'Press Militar de Pie con Barra', muscleGroup: 'shoulders', targetSetsCount: 3, targetRepsRange: '8-10', targetRestSeconds: 90 },
        { exerciseId: 'e-dips', exerciseName: 'Fondos en Paralelas (Dips)', muscleGroup: 'chest', targetSetsCount: 3, targetRepsRange: '10-12', targetRestSeconds: 90 },
      ],
    },
    {
      id: 'day-pull',
      dayName: 'Día 2 & 5: Tracción (Pull - Espalda, Bíceps, Posterior)',
      exercises: [
        { exerciseId: 'e-3', exerciseName: 'Peso Muerto Convencional', muscleGroup: 'back', targetSetsCount: 3, targetRepsRange: '5', targetRestSeconds: 180 },
        { exerciseId: 'e-5', exerciseName: 'Dominadas Pronadas (Pull-Ups)', muscleGroup: 'back', targetSetsCount: 4, targetRepsRange: '8-10', targetRestSeconds: 90 },
        { exerciseId: 'e-6', exerciseName: 'Curl de Bíceps con Mancuernas', muscleGroup: 'arms', targetSetsCount: 3, targetRepsRange: '10-12', targetRestSeconds: 60 },
      ],
    },
    {
      id: 'day-legs',
      dayName: 'Día 3 & 6: Pierna Completa (Legs - Cuádriceps, Isquios, Gemelo)',
      exercises: [
        { exerciseId: 'e-2', exerciseName: 'Sentadilla Trasera con Barra', muscleGroup: 'legs', targetSetsCount: 4, targetRepsRange: '8-10', targetRestSeconds: 150 },
      ],
    },
  ],
};

/**
 * Preset Routine 2: Tonificación & Moldear Figura (5 Days/Week for Sister & Mom)
 */
export const TONING_FULLBODY_PRESET: Routine = {
  id: 'preset-toning-5day',
  title: 'Rutina Tonificación & Moldear Figura',
  description: 'Rutina enfocada en quema calórica, firmeza muscular y moldeado corporal de 5 días a la semana.',
  targetGoal: 'fat_loss',
  daysPerWeek: 5,
  isPreset: true,
  days: [
    {
      id: 'day-lower-glute',
      dayName: 'Día 1, 3 & 5: Glúteo, Pierna & Tonificación',
      exercises: [
        { exerciseId: 'e-2', exerciseName: 'Sentadilla Trasera con Barra', muscleGroup: 'legs', targetSetsCount: 4, targetRepsRange: '12-15', targetRestSeconds: 60 },
      ],
    },
    {
      id: 'day-upper-core',
      dayName: 'Día 2 & 4: Tren Superior & Abdomen',
      exercises: [
        { exerciseId: 'e-5', exerciseName: 'Dominadas Asistidas', muscleGroup: 'back', targetSetsCount: 3, targetRepsRange: '12-15', targetRestSeconds: 60 },
      ],
    },
  ],
};

/**
 * Converts a RoutineDay into an active Workout session
 */
export function startWorkoutFromRoutineDay(userId: string, routineTitle: string, day: RoutineDay): Workout {
  const workoutId = `w-${Date.now()}`;
  const sets: WorkoutSet[] = [];

  let globalSetIndex = 1;
  day.exercises.forEach((ex) => {
    for (let i = 1; i <= ex.targetSetsCount; i++) {
      sets.push({
        id: `set-${workoutId}-${globalSetIndex}`,
        workoutId,
        exerciseId: ex.exerciseId,
        setIndex: i,
        setType: i === 1 ? 'warmup' : 'working',
        weightKg: 0,
        reps: 10,
        isCompleted: false,
      });
      globalSetIndex++;
    }
  });

  return {
    id: workoutId,
    userId,
    title: `${routineTitle} - ${day.dayName}`,
    status: 'in_progress',
    startedAt: new Date().toISOString(),
    totalDurationSeconds: 0,
    totalVolumeKg: 0,
    xpEarned: 0,
    sets,
  };
}
