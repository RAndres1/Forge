export type RecommendationPriority = 'critical' | 'high' | 'medium' | 'low';

export type RecommendationType =
  | 'RULE_001_OVERLOAD'
  | 'RULE_002_FATIGUE'
  | 'RULE_003_REST'
  | 'RULE_004_PR'
  | 'RULE_005_STREAK';

export interface CoachRecommendation {
  ruleId: RecommendationType;
  title: string;
  message: string;
  reason: string;
  confidence: number; // 0.0 to 1.0
  priority: RecommendationPriority;
  cta: string;
  evidence: string[];
}

export interface AthleteContext {
  athleteId: string;
  currentRank: string;
  // Recent Workout Telemetry
  lastWorkout?: {
    exerciseId: string;
    exerciseName: string;
    isCompound: boolean;
    isHeavy: boolean;
    weightKg: number;
    targetReps: number;
    achievedReps: number;
    lastRpe: number;
    targetCompleted: boolean;
    previousBest1RM: number;
  };
  // Weekly Streak Telemetry
  weeklyStreak?: {
    targetSessionsCount: number;
    completedSessionsCount: number;
    hoursLeftInWeek: number;
  };
}

export interface CoachRule {
  ruleId: RecommendationType;
  evaluate(context: AthleteContext): CoachRecommendation | null;
}
