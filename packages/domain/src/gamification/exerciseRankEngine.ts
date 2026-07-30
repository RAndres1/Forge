export type StrengthTier = 'Principiante' | 'Intermedio' | 'Avanzado' | 'Élite' | 'Titán';

export interface ExerciseRankResult {
  exerciseName: string;
  oneRepMaxKg: number;
  bodyWeightRatio: number;
  tier: StrengthTier;
  badgeIcon: string;
}

/**
 * Calculates strength tier based on 1RM to bodyweight ratio
 */
export function calculateExerciseStrengthTier(
  exerciseName: string,
  estimated1RM: number,
  bodyWeightKg: number = 70
): ExerciseRankResult {
  const ratio = Number((estimated1RM / Math.max(1, bodyWeightKg)).toFixed(2));
  let tier: StrengthTier = 'Principiante';
  let badgeIcon = '🥉';

  // Benchmark ratios (e.g. for Bench Press / Squat / Deadlift)
  if (ratio >= 2.2) {
    tier = 'Titán';
    badgeIcon = '👑';
  } else if (ratio >= 1.75) {
    tier = 'Élite';
    badgeIcon = '💎';
  } else if (ratio >= 1.25) {
    tier = 'Avanzado';
    badgeIcon = '🥇';
  } else if (ratio >= 0.85) {
    tier = 'Intermedio';
    badgeIcon = '🥈';
  }

  return {
    exerciseName,
    oneRepMaxKg: estimated1RM,
    bodyWeightRatio: ratio,
    tier,
    badgeIcon,
  };
}
