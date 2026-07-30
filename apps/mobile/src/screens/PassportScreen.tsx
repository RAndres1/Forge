import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { getRankProgress } from '@forge/domain';

export function PassportScreen() {
  const userXp = 4850; // Plata II
  const rankInfo = getRankProgress(userXp);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>⚡ PASAPORTE DEL ATLETA</Text>
        <Text style={styles.subtitle}>Demuestra objetivamente tu progreso físico.</Text>
      </View>

      {/* RANK CARD */}
      <View style={styles.card}>
        <View style={styles.rankRow}>
          <Text style={styles.rankName}>🏅 {rankInfo.currentRank}</Text>
          <Text style={styles.xpText}>{userXp.toLocaleString()} TOTAL XP</Text>
        </View>

        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${rankInfo.progressPercentage}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {rankInfo.progressPercentage}% para {rankInfo.nextRank}
        </Text>
      </View>

      {/* METRICS ROW */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>VOLUMEN MENSUAL</Text>
          <Text style={styles.metricVal}>42,560 kg</Text>
          <Text style={styles.greenSub}>↑ +12.4% este mes</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>RACHA ACTIVA</Text>
          <Text style={styles.metricVal}>🔥 4 Semanas</Text>
          <Text style={styles.subText}>4/4 sesiones cumplidas</Text>
        </View>
      </View>

      {/* MOMENTUM CARD */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>⚡ MOMENTUM INDEX</Text>
        <Text style={styles.momentumVal}>88.5 / 100</Text>
        <Text style={styles.momentumTag}>Estado: Imparable 🔥</Text>
      </View>
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
    marginBottom: 16,
  },
  title: {
    color: '#f4f4f5',
    fontSize: 22,
    fontWeight: '900',
  },
  subtitle: {
    color: '#a1a1aa',
    fontSize: 13,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#18181b',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#27272a',
    marginBottom: 16,
  },
  rankRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rankName: {
    color: '#60a5fa',
    fontSize: 18,
    fontWeight: '800',
  },
  xpText: {
    color: '#22c55e',
    fontSize: 14,
    fontWeight: '800',
  },
  progressBg: {
    height: 8,
    backgroundColor: '#27272a',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
  progressText: {
    color: '#a1a1aa',
    fontSize: 12,
    marginTop: 6,
    textAlign: 'right',
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  metricBox: {
    flex: 1,
    backgroundColor: '#18181b',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  metricLabel: {
    color: '#a1a1aa',
    fontSize: 11,
    fontWeight: '700',
  },
  metricVal: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 4,
  },
  greenSub: {
    color: '#22c55e',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
  },
  subText: {
    color: '#a1a1aa',
    fontSize: 11,
    marginTop: 4,
  },
  cardTitle: {
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: '800',
  },
  momentumVal: {
    color: '#facc15',
    fontSize: 28,
    fontWeight: '900',
    marginTop: 6,
  },
  momentumTag: {
    color: '#facc15',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
});
