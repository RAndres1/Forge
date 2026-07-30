export type SetType = 'warmup' | 'working' | 'failure' | 'drop_set';

export type MuscleGroup = 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core' | 'full_body';

export type EquipmentCategory = 'barbell' | 'dumbbell' | 'machine' | 'cable' | 'bodyweight' | 'cardio';

export type FitnessGoal = 'hypertrophy' | 'strength' | 'fat_loss' | 'endurance' | 'general_health';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export type RankName =
  | 'Bronce I'
  | 'Bronce II'
  | 'Bronce III'
  | 'Plata I'
  | 'Plata II'
  | 'Plata III'
  | 'Oro I'
  | 'Oro II'
  | 'Oro III'
  | 'Platino I'
  | 'Platino II'
  | 'Platino III'
  | 'Diamante'
  | 'Gladiador'
  | 'Inmortal';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  secondaryMuscles?: MuscleGroup[];
  category: EquipmentCategory;
  equipment?: string;
  instructions?: string;
  videoUrl?: string;
  isCustom: boolean;
  createdBy?: string;
}

export interface WorkoutSet {
  id: string;
  workoutId: string;
  exerciseId: string;
  setIndex: number;
  setType: SetType;
  weightKg: number;
  reps: number;
  rpe?: number;
  isCompleted: boolean;
}

export interface Workout {
  id: string;
  userId: string;
  title: string;
  notes?: string;
  status: 'in_progress' | 'completed' | 'discarded';
  startedAt: string;
  completedAt?: string;
  totalDurationSeconds: number;
  totalVolumeKg: number;
  xpEarned: number;
  sets?: WorkoutSet[];
}

export interface Profile {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  heightCm?: number;
  weightKg?: number;
  fitnessGoal: FitnessGoal;
  experienceLevel: ExperienceLevel;
}

export interface UserRank {
  userId: string;
  currentRank: RankName;
  totalXp: number;
  currentStreakDays: number;
  longestStreakDays: number;
  lastWorkoutAt?: string;
}
