import { WorkoutEngineServices } from '../use-cases/WorkoutEngineServices';
import { Weight, Repetitions, RPE } from '../value-objects/WorkoutValueObjects';

describe('WorkoutEngine Pure DDD Domain Tests', () => {
  test('Value Objects validate boundaries', () => {
    const weight = new Weight(80);
    expect(weight.amountKg).toBe(80);
    expect(weight.amountLbs).toBe(176.37);

    const reps = new Repetitions(8);
    expect(reps.count).toBe(8);

    const rpe = new RPE(8.5);
    expect(rpe.value).toBe(8.5);

    expect(() => new Weight(-10)).toThrow('Weight cannot be negative');
    expect(() => new RPE(5.0)).toThrow('RPE must be between 6.0 and 10.0');
  });

  test('Create and execute full workout aggregate flow', () => {
    const workout = WorkoutEngineServices.createWorkout({
      title: 'Press Banca Hypertrophy',
      exercises: [
        {
          exerciseId: 'ex_bench',
          name: 'Press Banca con Barra',
          muscleGroup: 'Pectoral Mayor',
          sets: [
            { weightKg: 80, reps: 8, setType: 'working' },
            { weightKg: 80, reps: 8, setType: 'working' },
            { weightKg: 80, reps: 8, setType: 'working' },
          ],
        },
      ],
    });

    expect(workout.status).toBe('draft');
    expect(workout.exercises.length).toBe(1);

    // Start workout
    workout.start();
    expect(workout.status).toBe('in_progress');
    expect(workout.domainEvents.some((e) => e.eventName === 'WorkoutStarted')).toBe(true);

    // Complete all 3 sets
    const ex = workout.exercises[0];
    ex.sets.forEach((set) => {
      workout.completeSet(ex.exerciseId.value, set.id.value);
    });

    expect(ex.totalVolumeKg).toBe(1920); // 80 * 8 * 3 = 1920 kg

    // Finish workout
    const summary = workout.finish();
    expect(workout.status).toBe('completed');
    expect(summary.totalVolumeKg).toBe(1920);
    expect(workout.domainEvents.some((e) => e.eventName === 'WorkoutFinished')).toBe(true);
    expect(workout.domainEvents.some((e) => e.eventName === 'EvidenceGenerated')).toBe(true);
  });

  test('PR calculation calculates 1RM with Epley Formula', () => {
    // 80kg x 8 reps -> 80 * (1 + 8/30) = 80 * 1.266 = 101.3 -> 101 kg 1RM
    const prResult = WorkoutEngineServices.calculatePR(90, 80, 8);
    expect(prResult.isNewPR).toBe(true);
    expect(prResult.new1RM).toBe(101);
  });
});
