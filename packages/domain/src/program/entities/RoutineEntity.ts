import { RoutineId } from '../value-objects/ProgramValueObjects';

export interface PrescribedExerciseProps {
  exerciseId: string;
  name: string;
  muscleGroup: string;
  targetSetsCount: number;
  targetWeightKg: number;
  targetReps: number;
}

export class RoutineEntity {
  public readonly id: RoutineId;
  public name: string;
  public exercises: PrescribedExerciseProps[];

  constructor(id: RoutineId, name: string, exercises: PrescribedExerciseProps[] = []) {
    this.id = id;
    this.name = name;
    this.exercises = exercises;
  }

  static create(name: string, exercises: PrescribedExerciseProps[] = []): RoutineEntity {
    return new RoutineEntity(RoutineId.generate(), name, exercises);
  }

  addExercise(exercise: PrescribedExerciseProps): void {
    this.exercises.push(exercise);
  }

  removeExercise(exerciseId: string): void {
    this.exercises = this.exercises.filter((ex) => ex.exerciseId !== exerciseId);
  }
}
