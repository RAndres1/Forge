import { CoachEngine } from '../CoachEngine';
import { AthleteContext } from '../types/CoachTypes';

describe('CoachEngine Deterministic Pure DDD Tests', () => {
  const engine = new CoachEngine();

  test('RULE_001_OVERLOAD: Triggers +2.5kg when RPE < 8.5 and target completed', () => {
    const ctx: AthleteContext = {
      athleteId: 'ath_1',
      currentRank: 'Plata II',
      lastWorkout: {
        exerciseId: 'ex_bench',
        exerciseName: 'Press Banca',
        isCompound: true,
        isHeavy: true,
        weightKg: 80,
        targetReps: 8,
        achievedReps: 8,
        lastRpe: 7.8,
        targetCompleted: true,
        previousBest1RM: 110,
      },
    };

    const result = engine.evaluate(ctx);
    expect(result.topRecommendation).not.toBeNull();
    expect(result.topRecommendation?.ruleId).toBe('RULE_001_OVERLOAD');
    expect(result.topRecommendation?.title).toBe('Incrementa +2.5 kg');
    expect(result.executionTimeMs).toBeLessThan(100);
  });

  test('RULE_002_FATIGUE: Triggers 5% reduction when reps achieved < target reps', () => {
    const ctx: AthleteContext = {
      athleteId: 'ath_1',
      currentRank: 'Plata II',
      lastWorkout: {
        exerciseId: 'ex_bench',
        exerciseName: 'Press Banca',
        isCompound: true,
        isHeavy: true,
        weightKg: 100,
        targetReps: 8,
        achievedReps: 5,
        lastRpe: 10.0,
        targetCompleted: false,
        previousBest1RM: 120,
      },
    };

    const result = engine.evaluate(ctx);
    expect(result.topRecommendation).not.toBeNull();
    expect(result.topRecommendation?.ruleId).toBe('RULE_002_FATIGUE');
    expect(result.topRecommendation?.title).toBe('Ajuste por fatiga concéntrica');
    expect(result.topRecommendation?.cta).toBe('Reducir a 95 kg');
  });

  test('RULE_004_PR: Triggers Critical priority when 1RM exceeds previous best', () => {
    const ctx: AthleteContext = {
      athleteId: 'ath_1',
      currentRank: 'Plata II',
      lastWorkout: {
        exerciseId: 'ex_bench',
        exerciseName: 'Press Banca',
        isCompound: true,
        isHeavy: true,
        weightKg: 100,
        targetReps: 5, // 100 * (1 + 5/30) = 116.6 -> 117kg > 100kg
        achievedReps: 5,
        lastRpe: 9.5,
        targetCompleted: true,
        previousBest1RM: 100,
      },
    };

    const result = engine.evaluate(ctx);
    expect(result.topRecommendation?.ruleId).toBe('RULE_004_PR');
    expect(result.topRecommendation?.priority).toBe('critical');
    expect(result.topRecommendation?.title).toBe('Nuevo récord personal (PR)');
  });

  test('RULE_005_STREAK: Triggers Critical priority when streak is in danger (<24h left)', () => {
    const ctx: AthleteContext = {
      athleteId: 'ath_1',
      currentRank: 'Plata II',
      weeklyStreak: {
        targetSessionsCount: 4,
        completedSessionsCount: 2,
        hoursLeftInWeek: 12,
      },
    };

    const result = engine.evaluate(ctx);
    expect(result.topRecommendation?.ruleId).toBe('RULE_005_STREAK');
    expect(result.topRecommendation?.priority).toBe('critical');
    expect(result.topRecommendation?.title).toBe('Tu racha semanal está en riesgo');
  });

  test('Execution time is well below 100ms requirement', () => {
    const ctx: AthleteContext = { athleteId: 'ath_1', currentRank: 'Plata II' };
    const result = engine.evaluate(ctx);
    expect(result.executionTimeMs).toBeLessThan(10);
  });
});
