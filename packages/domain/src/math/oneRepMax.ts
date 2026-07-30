import { WorkoutSet } from '../types/index';

/**
 * Calculates estimated 1RM using Epley Formula: 1RM = Weight * (1 + Reps / 30)
 */
export function calculateEpley1RM(weightKg: number, reps: number): number {
  if (weightKg <= 0 || reps <= 0) return 0;
  if (reps === 1) return weightKg;
  return Number((weightKg * (1 + reps / 30)).toFixed(2));
}

/**
 * Calculates estimated 1RM using Brzycki Formula: 1RM = Weight * (36 / (37 - Reps))
 */
export function calculateBrzycki1RM(weightKg: number, reps: number): number {
  if (weightKg <= 0 || reps <= 0) return 0;
  if (reps === 1) return weightKg;
  if (reps >= 37) return Number((weightKg * 2.5).toFixed(2));
  return Number((weightKg * (36 / (37 - reps))).toFixed(2));
}

/**
 * Calculates recommended 1RM estimation blending Epley and Brzycki
 */
export function calculateEstimated1RM(weightKg: number, reps: number): number {
  if (reps <= 10) {
    return calculateBrzycki1RM(weightKg, reps);
  }
  return calculateEpley1RM(weightKg, reps);
}

/**
 * Calculates total effective volume in kg excluding warmup sets
 */
export function calculateTotalVolume(sets: WorkoutSet[]): number {
  return sets
    .filter((s) => s.isCompleted && s.setType !== 'warmup')
    .reduce((total, s) => total + s.weightKg * s.reps, 0);
}
