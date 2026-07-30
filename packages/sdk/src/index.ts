import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Workout, WorkoutSet, Profile } from '@forge/domain';
import { ForgeAuthService } from './auth';

export * from './auth';

export class ForgeSDK {
  public supabase: SupabaseClient;
  public auth: ForgeAuthService;

  constructor(supabaseUrl: string, supabaseAnonKey: string) {
    this.supabase = createClient(supabaseUrl, supabaseAnonKey);
    this.auth = new ForgeAuthService(this.supabase);
  }

  // --- PROFILES ---
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      username: data.username,
      displayName: data.display_name,
      avatarUrl: data.avatar_url,
      bio: data.bio,
      heightCm: data.height_cm,
      weightKg: data.weight_kg,
      fitnessGoal: data.fitness_goal,
      experienceLevel: data.experience_level,
    };
  }

  // --- WORKOUTS ---
  async startWorkout(userId: string, title: string = 'Entrenamiento'): Promise<Workout | null> {
    const { data, error } = await this.supabase
      .from('workouts')
      .insert({
        user_id: userId,
        title,
        status: 'in_progress',
      })
      .select('*')
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      userId: data.user_id,
      title: data.title,
      notes: data.notes,
      status: data.status,
      startedAt: data.started_at,
      completedAt: data.completed_at,
      totalDurationSeconds: data.total_duration_seconds,
      totalVolumeKg: data.total_volume_kg,
      xpEarned: data.xp_earned,
    };
  }

  async saveWorkoutSet(set: Omit<WorkoutSet, 'id'>): Promise<WorkoutSet | null> {
    const { data, error } = await this.supabase
      .from('workout_sets')
      .insert({
        workout_id: set.workoutId,
        exercise_id: set.exerciseId,
        set_index: set.setIndex,
        set_type: set.setType,
        weight_kg: set.weightKg,
        reps: set.reps,
        rpe: set.rpe,
        is_completed: set.isCompleted,
      })
      .select('*')
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      workoutId: data.workout_id,
      exerciseId: data.exercise_id,
      setIndex: data.set_index,
      setType: data.set_type,
      weightKg: data.weight_kg,
      reps: data.reps,
      rpe: data.rpe,
      isCompleted: data.is_completed,
    };
  }

  async finishWorkout(workoutId: string, durationSeconds: number, totalVolumeKg: number, xpEarned: number): Promise<boolean> {
    const { error } = await this.supabase
      .from('workouts')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        total_duration_seconds: durationSeconds,
        total_volume_kg: totalVolumeKg,
        xp_earned: xpEarned,
      })
      .eq('id', workoutId);

    return !error;
  }
}
