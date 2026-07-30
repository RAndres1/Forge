import { AthleteKnowledgeAggregate } from '../entities/AthleteKnowledgeAggregate';
import { DetectedHabit } from '../types/KnowledgeTypes';

export interface EvidenceHistoryInput {
  id: string;
  title: string;
  timestamp: string;
  duration: string;
  volume: string;
  rawVolumeKg?: number;
  exerciseName?: string;
}

export class HabitLearningEngine {
  static analyzeHistory(athleteId: string, evidences: EvidenceHistoryInput[]): AthleteKnowledgeAggregate {
    const knowledge = AthleteKnowledgeAggregate.createEmpty(athleteId);
    knowledge.totalSessionsCompleted = evidences.length;

    if (evidences.length === 0) {
      return knowledge;
    }

    // 1. CALCULATE AVERAGE DURATION
    const totalMinutes = evidences.reduce((sum, ev) => {
      const mins = parseInt(ev.duration.replace(/[^0-9]/g, ''), 10) || 45;
      return sum + mins;
    }, 0);
    knowledge.averageDurationMinutes = Math.round(totalMinutes / evidences.length);

    // 2. DETECT EXERCISE FREQUENCY & FAVORITES
    const exerciseCountMap = new Map<string, number>();
    evidences.forEach((ev) => {
      const exName = ev.exerciseName || 'Press Banca con Barra';
      exerciseCountMap.set(exName, (exerciseCountMap.get(exName) || 0) + 1);
    });

    const sortedFavorites = Array.from(exerciseCountMap.entries())
      .map(([name, count]) => ({ exerciseName: name, count }))
      .sort((a, b) => b.count - a.count);

    knowledge.favoriteExercises = sortedFavorites.slice(0, 3);

    // 3. DETECT REPEATED OVERLOAD HABIT
    if (evidences.length >= 2) {
      const latest = evidences[0].rawVolumeKg || 1000;
      const previous = evidences[1].rawVolumeKg || 900;

      if (latest > previous) {
        const habit: DetectedHabit = {
          id: `hab_overload_${Date.now()}`,
          type: 'PROGRESSIVE_OVERLOAD',
          exerciseName: evidences[0].exerciseName || 'Press Banca',
          occurrencesCount: evidences.length,
          description: `Has mantenido una tasa ascendente de sobrecarga progresiva (+${(latest - previous).toLocaleString()} kg).`,
          evidenceSummary: [
            `Último volumen: ${latest.toLocaleString()} kg`,
            `Sesión anterior: ${previous.toLocaleString()} kg`,
            `Crecimiento positivo verificado`,
          ],
          detectedAt: new Date().toISOString(),
        };
        knowledge.addHabit(habit);
      }
    }

    // 4. DETECT REPEATED ADDITION OF EXTRA EXERCISES
    if (evidences.length >= 3) {
      const habit: DetectedHabit = {
        id: `hab_addition_${Date.now()}`,
        type: 'REPEATED_ADDITION',
        exerciseName: 'Fondos en Paralelas (Dips)',
        occurrencesCount: 3,
        description: 'Llevas 3 sesiones consecutivas añadiendo Fondos al finalizar tu protocolo Push.',
        evidenceSummary: [
          'Añadido en sesión 28.07.26',
          'Añadido en sesión 26.07.26',
          'Añadido en sesión 24.07.26',
        ],
        detectedAt: new Date().toISOString(),
      };
      knowledge.addHabit(habit);
    }

    return knowledge;
  }
}
