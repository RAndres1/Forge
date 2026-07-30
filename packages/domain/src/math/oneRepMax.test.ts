import { describe, it, expect } from 'vitest';
import { calculateEpley1RM, calculateBrzycki1RM, calculateEstimated1RM, calculateTotalVolume } from './oneRepMax.js';
import { WorkoutSet } from '../types/index.js';

describe('Strength Math & 1RM Formulas', () => {
  it('calculates Epley 1RM correctly', () => {
    // 100 kg x 10 reps => 100 * (1 + 10/30) = 133.33 kg
    expect(calculateEpley1RM(100, 10)).toBe(133.33);
    expect(calculateEpley1RM(100, 1)).toBe(100);
    expect(calculateEpley1RM(0, 5)).toBe(0);
  });

  it('calculates Brzycki 1RM correctly', () => {
    // 100 kg x 10 reps => 100 * (36 / 27) = 133.33 kg
    expect(calculateBrzycki1RM(100, 10)).toBe(133.33);
    expect(calculateBrzycki1RM(100, 1)).toBe(100);
  });

  it('selects estimation formula based on rep count', () => {
    expect(calculateEstimated1RM(100, 5)).toBe(calculateBrzycki1RM(100, 5));
    expect(calculateEstimated1RM(100, 12)).toBe(calculateEpley1RM(100, 12));
  });

  it('calculates total effective volume excluding warmup sets', () => {
    const sets: WorkoutSet[] = [
      { id: '1', workoutId: 'w1', exerciseId: 'e1', setIndex: 1, setType: 'warmup', weightKg: 40, reps: 10, isCompleted: true },
      { id: '2', workoutId: 'w1', exerciseId: 'e1', setIndex: 2, setType: 'working', weightKg: 80, reps: 10, isCompleted: true },
      { id: '3', workoutId: 'w1', exerciseId: 'e1', setIndex: 3, setType: 'failure', weightKg: 80, reps: 8, isCompleted: true },
    ];
    // Warmup excluded: (80*10) + (80*8) = 800 + 640 = 1440 kg
    expect(calculateTotalVolume(sets)).toBe(1440);
  });
});
