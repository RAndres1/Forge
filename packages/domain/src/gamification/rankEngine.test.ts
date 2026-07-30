import { describe, it, expect } from 'vitest';
import { getRankForXP, getRankProgress, calculateWorkoutXP } from './rankEngine.js';
import { WorkoutSet } from '../types/index.js';

describe('Gamification Rank Engine', () => {
  it('assigns correct ranks for XP thresholds', () => {
    expect(getRankForXP(0)).toBe('Bronce I');
    expect(getRankForXP(500)).toBe('Bronce II');
    expect(getRankForXP(2500)).toBe('Plata I');
    expect(getRankForXP(100000)).toBe('Gladiador');
  });

  it('calculates rank progress percentages', () => {
    const progress = getRankProgress(250); // halfway between Bronce I (0) and Bronce II (500)
    expect(progress.currentRank).toBe('Bronce I');
    expect(progress.nextRank).toBe('Bronce II');
    expect(progress.progressPercentage).toBe(50);
  });

  it('calculates session XP correctly including failure bonus and streak multiplier', () => {
    const sets: WorkoutSet[] = [
      { id: '1', workoutId: 'w1', exerciseId: 'e1', setIndex: 1, setType: 'working', weightKg: 100, reps: 10, isCompleted: true },
      { id: '2', workoutId: 'w1', exerciseId: 'e1', setIndex: 2, setType: 'failure', weightKg: 100, reps: 8, isCompleted: true },
    ];
    // Base duration (>20m): 100 XP
    // Volume: (1000+800)*0.01 = 18 XP
    // Failure set count (1): 25 XP
    // Subtotal: 143 XP
    // Streak multiplier (2 weeks = +20%): 143 * 1.2 = 171.6 => 172 XP
    const xp = calculateWorkoutXP(1500, 1800, sets, 2);
    expect(xp).toBe(172);
  });
});
