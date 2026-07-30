export interface ExerciseStrengthTier {
  exerciseName: string;
  oneRepMaxKg: number;
  bodyWeightRatio: number;
  tier: 'Novato' | 'Intermedio' | 'Avanzado' | 'Élite' | 'Titán';
  badgeIcon: string;
}

export function calculateExerciseStrengthTier(
  exerciseName: string,
  oneRepMaxKg: number,
  bodyWeightKg: number = 70
): ExerciseStrengthTier {
  const ratio = Number((oneRepMaxKg / bodyWeightKg).toFixed(2));

  let tier: 'Novato' | 'Intermedio' | 'Avanzado' | 'Élite' | 'Titán' = 'Novato';
  let badgeIcon = '🥉';

  if (ratio >= 2.2) {
    tier = 'Titán';
    badgeIcon = '👑';
  } else if (ratio >= 1.8) {
    tier = 'Élite';
    badgeIcon = '💎';
  } else if (ratio >= 1.4) {
    tier = 'Avanzado';
    badgeIcon = '🥇';
  } else if (ratio >= 1.0) {
    tier = 'Intermedio';
    badgeIcon = '🥈';
  }

  return {
    exerciseName,
    oneRepMaxKg,
    bodyWeightRatio: ratio,
    tier,
    badgeIcon,
  };
}
