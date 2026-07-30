import { WorkoutId, Volume, Duration } from '../value-objects/WorkoutValueObjects';
import { WorkoutExerciseEntity } from './WorkoutExerciseEntity';
import { ExerciseId } from '../value-objects/WorkoutValueObjects';
import {
  DomainEvent,
  WorkoutStartedEvent,
  SetCompletedEvent,
  WorkoutFinishedEvent,
  EvidenceGeneratedEvent,
} from '../events/WorkoutEvents';

export type WorkoutStatus = 'draft' | 'in_progress' | 'completed';

export interface PrescribedExerciseInput {
  exerciseId: string;
  name: string;
  muscleGroup: string;
  targetSetsCount: number;
  targetWeightKg: number;
  targetReps: number;
}

export class WorkoutAggregate {
  public readonly id: WorkoutId;
  public title: string;
  public status: WorkoutStatus;
  public exercises: WorkoutExerciseEntity[];
  public startedAt?: Date;
  public completedAt?: Date;
  public domainEvents: DomainEvent[] = [];

  constructor(id: WorkoutId, title: string, exercises: WorkoutExerciseEntity[] = []) {
    this.id = id;
    this.title = title;
    this.status = 'draft';
    this.exercises = exercises;
  }

  static create(title: string): WorkoutAggregate {
    return new WorkoutAggregate(WorkoutId.generate(), title);
  }

  static fromRoutine(routineTitle: string, prescribedExercises: PrescribedExerciseInput[]): WorkoutAggregate {
    const workout = new WorkoutAggregate(WorkoutId.generate(), routineTitle);

    for (const pEx of prescribedExercises) {
      const exerciseEntity = new WorkoutExerciseEntity(
        new ExerciseId(pEx.exerciseId),
        pEx.name,
        pEx.muscleGroup,
        []
      );

      for (let i = 0; i < pEx.targetSetsCount; i++) {
        exerciseEntity.addSet(pEx.targetWeightKg, pEx.targetReps, 'working');
      }

      workout.addExercise(exerciseEntity);
    }

    return workout;
  }

  start(): void {
    if (this.status === 'in_progress') {
      throw new Error('Workout is already in progress');
    }
    this.status = 'in_progress';
    this.startedAt = new Date();
    this.domainEvents.push(new WorkoutStartedEvent(this.id.value, this.title));
  }

  addExercise(exercise: WorkoutExerciseEntity): void {
    this.exercises.push(exercise);
  }

  removeExercise(exerciseIdStr: string): void {
    this.exercises = this.exercises.filter((ex) => ex.exerciseId.value !== exerciseIdStr);
  }

  completeSet(exerciseIdStr: string, setIdStr: string): void {
    const exercise = this.exercises.find((e) => e.exerciseId.value === exerciseIdStr);
    if (!exercise) {
      throw new Error(`Exercise ${exerciseIdStr} not found in workout`);
    }

    const set = exercise.sets.find((s) => s.id.value === setIdStr);
    if (!set) {
      throw new Error(`Set ${setIdStr} not found in exercise`);
    }

    set.complete();
    this.domainEvents.push(
      new SetCompletedEvent(
        this.id.value,
        exerciseIdStr,
        setIdStr,
        set.weight.amountKg,
        set.reps.count
      )
    );
  }

  finish(): { totalVolumeKg: number; durationSeconds: number; xpEarned: number } {
    if (this.status !== 'in_progress') {
      throw new Error('Cannot finish a workout that is not in progress');
    }

    this.status = 'completed';
    this.completedAt = new Date();

    const durationSeconds = this.startedAt
      ? Math.round((this.completedAt.getTime() - this.startedAt.getTime()) / 1000)
      : 0;

    const totalVolumeKg = this.totalVolume.totalKg;
    const xpEarned = Math.round(totalVolumeKg * 0.05 + 150);

    this.domainEvents.push(
      new WorkoutFinishedEvent(this.id.value, totalVolumeKg, durationSeconds, xpEarned, this.title)
    );

    this.domainEvents.push(
      new EvidenceGeneratedEvent(
        `ev_${Date.now()}`,
        this.title,
        totalVolumeKg
      )
    );

    return { totalVolumeKg, durationSeconds, xpEarned };
  }

  get totalVolume(): Volume {
    const totalKg = this.exercises.reduce((sum, e) => sum + e.totalVolumeKg, 0);
    return new Volume(totalKg);
  }

  get totalDuration(): Duration {
    if (!this.startedAt || !this.completedAt) {
      return new Duration(0);
    }
    const seconds = Math.round((this.completedAt.getTime() - this.startedAt.getTime()) / 1000);
    return new Duration(seconds);
  }
}
