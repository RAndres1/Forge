export type HabitType =
  | 'REPEATED_SUBSTITUTION'
  | 'REPEATED_ADDITION'
  | 'PROGRESSIVE_OVERLOAD'
  | 'STAGNATION'
  | 'FREQUENCY_DROP';

export interface DetectedHabit {
  id: string;
  type: HabitType;
  exerciseName: string;
  replacementExerciseName?: string;
  occurrencesCount: number;
  description: string;
  evidenceSummary: string[];
  detectedAt: string;
}

export interface AthleteKnowledgeSummary {
  athleteId: string;
  favoriteExercises: { exerciseName: string; count: number }[];
  averageDurationMinutes: number;
  totalSessionsCompleted: number;
  habits: DetectedHabit[];
  lastUpdatedOn: string;
}
