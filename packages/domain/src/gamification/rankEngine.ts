import { RankName, WorkoutSet } from '../types/index';

export interface RankDefinition {
  rank: RankName;
  minXp: number;
}

export const RANK_LADDER: RankDefinition[] = [
  { rank: 'Bronce I', minXp: 0 },
  { rank: 'Bronce II', minXp: 500 },
  { rank: 'Bronce III', minXp: 1200 },
  { rank: 'Plata I', minXp: 2500 },
  { rank: 'Plata II', minXp: 4500 },
  { rank: 'Plata III', minXp: 7000 },
  { rank: 'Oro I', minXp: 10500 },
  { rank: 'Oro II', minXp: 15000 },
  { rank: 'Oro III', minXp: 21000 },
  { rank: 'Platino I', minXp: 28000 },
  { rank: 'Platino II', minXp: 36000 },
  { rank: 'Platino III', minXp: 45000 },
  { rank: 'Diamante', minXp: 65000 },
  { rank: 'Gladiador', minXp: 100000 },
  { rank: 'Inmortal', minXp: 150000 },
];

/**
 * Calculates XP earned for a completed workout session
 */
export function calculateWorkoutXP(
  durationSeconds: number,
  totalVolumeKg: number,
  sets: WorkoutSet[],
  streakWeeksCount: number = 0
): number {
  let xp = durationSeconds >= 1200 ? 100 : 50;
  const volumeXp = Math.min(150, Math.floor(totalVolumeKg * 0.01));
  xp += volumeXp;

  const failureSetsCount = sets.filter((s) => s.isCompleted && s.setType === 'failure').length;
  xp += failureSetsCount * 25;

  const streakMultiplier = 1 + Math.min(0.5, streakWeeksCount * 0.1);
  return Math.round(xp * streakMultiplier);
}

/**
 * Gets rank info for total accumulated XP
 */
export function getRankForXP(totalXp: number): RankName {
  let currentRank: RankName = 'Bronce I';
  for (const def of RANK_LADDER) {
    if (totalXp >= def.minXp) {
      currentRank = def.rank;
    } else {
      break;
    }
  }
  return currentRank;
}

/**
 * Gets rank progress status
 */
export function getRankProgress(totalXp: number) {
  const currentRank = getRankForXP(totalXp);
  const currentIndex = RANK_LADDER.findIndex((r) => r.rank === currentRank);
  const currentDef = RANK_LADDER[currentIndex];
  const nextDef = RANK_LADDER[currentIndex + 1];

  if (!nextDef) {
    return {
      currentRank,
      nextRank: null,
      currentXp: totalXp,
      xpForNextLevel: currentDef.minXp,
      progressPercentage: 100,
    };
  }

  const xpInCurrentLevel = totalXp - currentDef.minXp;
  const levelXpSpan = nextDef.minXp - currentDef.minXp;
  const progressPercentage = Math.min(100, Math.max(0, Math.round((xpInCurrentLevel / levelXpSpan) * 100)));

  return {
    currentRank,
    nextRank: nextDef.rank,
    currentXp: totalXp,
    xpForNextLevel: nextDef.minXp,
    progressPercentage,
  };
}
