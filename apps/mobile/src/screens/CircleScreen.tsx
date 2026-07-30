import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { calculateCircleRankings, CircleLeaderboardEntry } from '@forge/domain';

export function CircleScreen() {
  const rawLeaderboard: Omit<CircleLeaderboardEntry, 'position'>[] = [
    { userId: 'u-1', username: 'alex_fit', displayName: 'Alejandro M.', rank: 'Plata II', totalXp: 4850, weeklyVolumeKg: 13560, weeklyWorkoutsCount: 4, streakDays: 28 },
    { userId: 'u-2', username: 'carla_lifts', displayName: 'Carla R. (Hermana)', rank: 'Plata I', totalXp: 3200, weeklyVolumeKg: 9400, weeklyWorkoutsCount: 4, streakDays: 21 },
    { userId: 'u-3', username: 'mama_strength', displayName: 'Elena V. (Mamá)', rank: 'Bronce III', totalXp: 1850, weeklyVolumeKg: 6200, weeklyWorkoutsCount: 3, streakDays: 14 },
    { userId: 'u-4', username: 'carlos_coach', displayName: 'Carlos T.', rank: 'Oro I', totalXp: 11200, weeklyVolumeKg: 24800, weeklyWorkoutsCount: 5, streakDays: 45 },
  ];

  const leaderboard = calculateCircleRankings(rawLeaderboard);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🛡️ GLADIADORES FORGE</Text>
        <Text style={styles.subtitle}>CÓDIGO DE GRUPO: FORGE-8842</Text>
      </View>

      <Text style={styles.sectionTitle}>🏆 TABLA DE CLASIFICACIÓN SEMANAL</Text>

      {leaderboard.map((item) => (
        <View
          key={item.userId}
          style={[
            styles.rankRow,
            item.position === 1 && styles.firstPlaceRow,
          ]}
        >
          <View style={styles.posBadge}>
            <Text style={styles.posText}>#{item.position}</Text>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.displayName}>{item.displayName}</Text>
            <Text style={styles.userSub}>🏅 {item.rank} • 🔥 {item.streakDays}d racha</Text>
          </View>

          <View style={styles.xpInfo}>
            <Text style={styles.xpVal}>{item.totalXp.toLocaleString()} XP</Text>
            <Text style={styles.volVal}>{item.weeklyVolumeKg.toLocaleString()} kg</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: '#f4f4f5',
    fontSize: 22,
    fontWeight: '900',
  },
  subtitle: {
    color: '#60a5fa',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 4,
  },
  sectionTitle: {
    color: '#a1a1aa',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 12,
  },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#18181b',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  firstPlaceRow: {
    backgroundColor: 'rgba(234, 179, 8, 0.1)',
    borderColor: '#eab308',
  },
  posBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#27272a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  posText: {
    color: '#f4f4f5',
    fontWeight: '800',
    fontSize: 13,
  },
  userInfo: {
    flex: 1,
  },
  displayName: {
    color: '#f4f4f5',
    fontSize: 15,
    fontWeight: '700',
  },
  userSub: {
    color: '#a1a1aa',
    fontSize: 11,
    marginTop: 2,
  },
  xpInfo: {
    alignItems: 'flex-end',
  },
  xpVal: {
    color: '#22c55e',
    fontSize: 15,
    fontWeight: '800',
  },
  volVal: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
});
