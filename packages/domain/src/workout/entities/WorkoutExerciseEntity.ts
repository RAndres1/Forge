import { ExerciseId } from '../value-objects/WorkoutValueObjects';
import { WorkoutSetEntity } from './WorkoutSetEntity';

export class WorkoutExerciseEntity {
  constructor(
    public readonly exerciseId: ExerciseId,
    public readonly name: string,
    public readonly muscleGroup: string,
    public sets: WorkoutSetEntity[],
    public notes?: string,
    public isSuperset: boolean = false
  ) {}

  addSet(weightKg: number, reps: number, setType: 'warmup' | 'working' | 'dropset' | 'failure' = 'working'): WorkoutSetEntity {
    const newSet = WorkoutSetEntity.create(weightKg, reps, setType);
    this.sets.push(newSet);
    return newSet;
  }

  get totalVolumeKg(): number {
    return this.sets.reduce((sum, s) => sum + (s.isCompleted ? s.weight.amountKg * s.reps.count : 0), 0);
  }

  get best1RM(): number {
    return this.sets.reduce((max, s) => (s.isCompleted ? Math.max(max, s.calculated1RM) : max), 0);
  }
}
