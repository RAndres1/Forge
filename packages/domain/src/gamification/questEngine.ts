import { Workout } from '../types/index';

export type QuestType =
  | 'workout_completion'
  | 'volume_target'
  | 'failure_set'
  | 'streak_maintenance'
  | 'heavy_lifting';

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  questType: QuestType;
  targetValue: number;
  currentValue: number;
  xpReward: number;
  isCompleted: boolean;
  isClaimed: boolean;
}

export function generateDailyQuests(dateStr: string, userLevelRank: string): DailyQuest[] {
  return [
    {
      id: `quest-1-${dateStr}`,
      title: 'Misión Principal: Disciplina de Hierro',
      description: 'Completa 1 entrenamiento válido de al menos 20 minutos.',
      questType: 'workout_completion',
      targetValue: 1,
      currentValue: 0,
      xpReward: 150,
      isCompleted: false,
      isClaimed: false,
    },
    {
      id: `quest-2-${dateStr}`,
      title: 'Empuje al Límite: Serie al Fallo',
      description: 'Lleva al menos 1 serie hasta el fallo concéntrico (RPE 10).',
      questType: 'failure_set',
      targetValue: 1,
      currentValue: 0,
      xpReward: 100,
      isCompleted: false,
      isClaimed: false,
    },
    {
      id: `quest-3-${dateStr}`,
      title: 'Acumulador de Carga',
      description: 'Acumula un volumen total efectivo de 3,000 kg en la sesión.',
      questType: 'volume_target',
      targetValue: 3000,
      currentValue: 0,
      xpReward: 200,
      isCompleted: false,
      isClaimed: false,
    },
  ];
}

export function evaluateQuestProgress(quests: DailyQuest[], workout: Workout): DailyQuest[] {
  const sets = workout.sets || [];
  const failureSetsCount = sets.filter((s) => s.isCompleted && s.setType === 'failure').length;

  return quests.map((quest) => {
    if (quest.isCompleted) return quest;

    let updatedValue = quest.currentValue;

    switch (quest.questType) {
      case 'workout_completion':
        if (workout.status === 'completed' && workout.totalDurationSeconds >= 600) {
          updatedValue = 1;
        }
        break;
      case 'failure_set':
        updatedValue = failureSetsCount;
        break;
      case 'volume_target':
        updatedValue = workout.totalVolumeKg;
        break;
      default:
        break;
    }

    const isCompleted = updatedValue >= quest.targetValue;

    return {
      ...quest,
      currentValue: Math.min(updatedValue, quest.targetValue),
      isCompleted,
    };
  });
}
