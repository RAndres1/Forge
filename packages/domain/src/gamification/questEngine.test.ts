import { describe, it, expect } from 'vitest';
import { generateDailyQuests, evaluateQuestProgress } from './questEngine.js';
import { Workout } from '../types/index.js';

describe('Daily Quest & Streaks Engine', () => {
  it('generates 3 daily quests for a given date', () => {
    const quests = generateDailyQuests('2026-07-29', 'Bronce I');
    expect(quests).toHaveLength(3);
    expect(quests[0].questType).toBe('workout_completion');
    expect(quests[1].questType).toBe('failure_set');
    expect(quests[2].questType).toBe('volume_target');
  });

  it('evaluates quest progress accurately after a workout', () => {
    const initialQuests = generateDailyQuests('2026-07-29', 'Bronce I');
    const workout: Workout = {
      id: 'w-100',
      userId: 'user-1',
      title: 'Push Day',
      status: 'completed',
      startedAt: '2026-07-29T10:00:00Z',
      completedAt: '2026-07-29T11:00:00Z',
      totalDurationSeconds: 3600,
      totalVolumeKg: 3500,
      xpEarned: 250,
      sets: [
        { id: 's-1', workoutId: 'w-100', exerciseId: 'e-1', setIndex: 1, setType: 'working', weightKg: 100, reps: 10, isCompleted: true },
        { id: 's-2', workoutId: 'w-100', exerciseId: 'e-1', setIndex: 2, setType: 'failure', weightKg: 100, reps: 8, isCompleted: true },
      ],
    };

    const evaluated = evaluateQuestProgress(initialQuests, workout);

    expect(evaluated[0].isCompleted).toBe(true); // Workout completion ok
    expect(evaluated[1].isCompleted).toBe(true); // Failure set ok (1 set)
    expect(evaluated[2].isCompleted).toBe(true); // Volume ok (3500 >= 3000 kg)
  });
});
