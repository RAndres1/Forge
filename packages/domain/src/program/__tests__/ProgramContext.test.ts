import { ProgramAggregate } from '../entities/ProgramAggregate';
import { RoutineEntity } from '../entities/RoutineEntity';
import { ProgramActivationService } from '../services/ProgramActivationService';

describe('Program Context Pure DDD Tests', () => {
  test('Creates program, adds routine and activates via ProgramActivationService', () => {
    const prog1 = ProgramAggregate.create('Hipertrofia 4 Días');
    const prog2 = ProgramAggregate.create('Fuerza 5x5');

    const routinePush = RoutineEntity.create('Push A', [
      { exerciseId: 'ex_bench', name: 'Press Banca', muscleGroup: 'chest', targetSetsCount: 3, targetWeightKg: 80, targetReps: 8 },
    ]);

    prog1.addRoutine(routinePush);
    expect(prog1.routines.length).toBe(1);
    expect(prog1.version).toBe(2);

    // Activate prog1
    const updatedPrograms = ProgramActivationService.activateProgram(prog1.id.value, [prog1, prog2]);
    expect(updatedPrograms[0].isActive).toBe(true);
    expect(updatedPrograms[1].isActive).toBe(false);
  });
});
