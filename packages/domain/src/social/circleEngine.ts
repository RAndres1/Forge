import { RankName } from '../types/index';

export interface CircleLeaderboardEntry {
  userId: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  rank: RankName;
  totalXp: number;
  weeklyVolumeKg: number;
  weeklyWorkoutsCount: number;
  streakDays: number;
  position: number;
}

export interface ActivityFeedPost {
  id: string;
  userId: string;
  displayName: string;
  avatarUrl?: string;
  actionText: string;
  detailText: string;
  timestamp: string;
  reactionsCount: {
    fire: number;
    muscle: number;
    bolt: number;
  };
}

export function calculateCircleRankings(entries: Omit<CircleLeaderboardEntry, 'position'>[]): CircleLeaderboardEntry[] {
  const sorted = [...entries].sort((a, b) => {
    if (b.totalXp !== a.totalXp) {
      return b.totalXp - a.totalXp;
    }
    return b.weeklyVolumeKg - a.weeklyVolumeKg;
  });

  return sorted.map((entry, index) => ({
    ...entry,
    position: index + 1,
  }));
}
