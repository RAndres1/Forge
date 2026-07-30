import { HabitLearningEngine } from '../services/HabitLearningEngine';

describe('HabitLearningEngine Pure DDD Tests', () => {
  test('Analyzes evidence history and detects overload and habits deterministically', () => {
    const mockEvidences = [
      { id: 'ev-1', title: 'PUSH A', timestamp: '28.07.26', duration: '45M', volume: '3,840 KG', rawVolumeKg: 3840, exerciseName: 'Press Banca' },
      { id: 'ev-2', title: 'PUSH A', timestamp: '26.07.26', duration: '50M', volume: '3,500 KG', rawVolumeKg: 3500, exerciseName: 'Press Banca' },
      { id: 'ev-3', title: 'PUSH A', timestamp: '24.07.26', duration: '40M', volume: '3,200 KG', rawVolumeKg: 3200, exerciseName: 'Press Banca' },
    ];

    const knowledge = HabitLearningEngine.analyzeHistory('ath_test', mockEvidences);

    expect(knowledge.totalSessionsCompleted).toBe(3);
    expect(knowledge.averageDurationMinutes).toBe(45);
    expect(knowledge.favoriteExercises[0].exerciseName).toBe('Press Banca');
    expect(knowledge.habits.length).toBeGreaterThan(0);
    expect(knowledge.habits.some((h) => h.type === 'PROGRESSIVE_OVERLOAD')).toBe(true);
  });

  test('Returns clean zero knowledge when evidences array is empty', () => {
    const knowledge = HabitLearningEngine.analyzeHistory('ath_test', []);
    expect(knowledge.totalSessionsCompleted).toBe(0);
    expect(knowledge.habits.length).toBe(0);
  });
});
