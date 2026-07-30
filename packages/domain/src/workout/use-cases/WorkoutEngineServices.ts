import { WorkoutAggregate } from '../entities/WorkoutAggregate';
import { WorkoutExerciseEntity } from '../entities/WorkoutExerciseEntity';
import { ExerciseId } from '../value-objects/WorkoutValueObjects';

export interface CreateWorkoutDTO {
  title: string;
  exercises: {
    exerciseId: string;
    name: string;
    muscleGroup: string;
    sets: { weightKg: number; reps: number; setType?: 'warmup' | 'working' | 'dropset' | 'failure' }[];
  }[];
}

export class WorkoutEngineServices {
  static createWorkout(dto: CreateWorkoutDTO): WorkoutAggregate {
    const workout = WorkoutAggregate.create(dto.title);

    for (const exDto of dto.exercises) {
      const exerciseEntity = new WorkoutExerciseEntity(
        new ExerciseId(exDto.exerciseId),
        exDto.name,
        exDto.muscleGroup,
        []
      );

      for (const setDto of exDto.sets) {
        exerciseEntity.addSet(setDto.weightKg, setDto.reps, setDto.setType || 'working');
      }

      workout.addExercise(exerciseEntity);
    }

    return workout;
  }

  static calculatePR(previousBest1RM: number, currentSetWeightKg: number, currentSetReps: number): { isNewPR: boolean; new1RM: number } {
    if (currentSetReps <= 0) return { isNewPR: false, new1RM: previousBest1RM };
    
    // Epley 1RM formula
    const current1RM = currentSetReps === 1 ? currentSetWeightKg : Math.round(currentSetWeightKg * (1 + currentSetReps / 30));
    const isNewPR = current1RM > previousBest1RM;

    return {
      isNewPR,
      new1RM: isNewPR ? current1RM : previousBest1RM,
    };
  }
}
