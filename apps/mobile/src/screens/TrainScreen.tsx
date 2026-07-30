import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  WorkoutSet,
  calculateEstimated1RM,
  calculateTotalVolume,
  calculateWorkoutXP,
  getRankProgress,
} from '@forge/domain';
import { AICoachWidget } from '../components/AICoachWidget';
import { PlateCalculatorModal } from '../components/PlateCalculatorModal';

interface ActiveExercise {
  id: string;
  name: string;
  muscleGroup: string;
  sets: WorkoutSet[];
}

export default function TrainScreen() {
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [userXp, setUserXp] = useState<number>(2450);

  const [selectedWeightForCalc, setSelectedWeightForCalc] = useState<number | null>(null);

  const [exercises, setExercises] = useState<ActiveExercise[]>([
    {
      id: 'ex-1',
      name: 'Press de Banca Plano con Barra',
      muscleGroup: 'Pecho',
      sets: [
        { id: 's-1', workoutId: 'w-1', exerciseId: 'ex-1', setIndex: 1, setType: 'warmup', weightKg: 40, reps: 10, isCompleted: true },
        { id: 's-2', workoutId: 'w-1', exerciseId: 'ex-1', setIndex: 2, setType: 'working', weightKg: 70, reps: 8, isCompleted: true },
        { id: 's-3', workoutId: 'w-1', exerciseId: 'ex-1', setIndex: 3, setType: 'failure', weightKg: 70, reps: 6, isCompleted: false },
      ],
    },
  ]);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((sec) => sec + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const allSets = exercises.flatMap((e) => e.sets);
  const totalVolume = calculateTotalVolume(allSets);
  const earnedXp = calculateWorkoutXP(seconds, totalVolume, allSets, 2);
  const rankProgress = getRankProgress(userXp + earnedXp);

  const toggleSetCompleted = (exerciseId: string, setId: string) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        return {
          ...ex,
          sets: ex.sets.map((s) => {
            if (s.id === setId) {
              return { ...s, isCompleted: !s.isCompleted };
            }
            return s;
          }),
        };
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090b" />

      <View style={styles.header}>
        <View>
          <Text style={styles.workoutTitle}>PULL / PUSH DAY</Text>
          <Text style={styles.timerText}>⏱️ {formatTime(seconds)}</Text>
        </View>
        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>🏅 {rankProgress.currentRank}</Text>
          <Text style={styles.xpText}>+{earnedXp} XP</Text>
        </View>
      </View>

      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${rankProgress.progressPercentage}%` }]} />
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Volumen Efectivo</Text>
          <Text style={styles.metricValue}>{totalVolume.toLocaleString()} kg</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Series Completadas</Text>
          <Text style={styles.metricValue}>
            {allSets.filter((s) => s.isCompleted).length} / {allSets.length}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollList}>
        {exercises.map((ex) => (
          <View key={ex.id} style={styles.exerciseCard}>
            <Text style={styles.exerciseName}>{ex.name}</Text>
            <Text style={styles.muscleLabel}>{ex.muscleGroup.toUpperCase()}</Text>

            {ex.sets.map((set, idx) => {
              const est1RM = calculateEstimated1RM(set.weightKg, set.reps);
              return (
                <View key={set.id} style={[styles.setRow, set.isCompleted && styles.setRowCompleted]}>
                  <Text style={styles.setIndexText}>#{idx + 1}</Text>
                  
                  {/* CLICK WEIGHT TO OPEN PLATE CALCULATOR */}
                  <TouchableOpacity onPress={() => setSelectedWeightForCalc(set.weightKg)}>
                    <Text style={styles.weightClickableText}>🏋️ {set.weightKg} kg</Text>
                  </TouchableOpacity>

                  <Text style={styles.setValText}>{set.reps} reps</Text>
                  <Text style={styles.est1RMText}>{est1RM} kg 1RM</Text>
                  <TouchableOpacity
                    style={[styles.checkbox, set.isCompleted && styles.checkboxChecked]}
                    onPress={() => toggleSetCompleted(ex.id, set.id)}
                  >
                    <Text style={styles.checkmark}>{set.isCompleted ? '✓' : ''}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>

      {/* PLATE CALCULATOR MODAL */}
      <PlateCalculatorModal
        visible={selectedWeightForCalc !== null}
        targetWeightKg={selectedWeightForCalc || 0}
        onClose={() => setSelectedWeightForCalc(null)}
      />

      <AICoachWidget />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  workoutTitle: {
    color: '#f4f4f5',
    fontSize: 20,
    fontWeight: '800',
  },
  timerText: {
    color: '#a1a1aa',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
  },
  rankBadge: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'flex-end',
  },
  rankText: {
    color: '#e4e4e7',
    fontWeight: '700',
    fontSize: 14,
  },
  xpText: {
    color: '#22c55e',
    fontWeight: '800',
    fontSize: 12,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#27272a',
    marginHorizontal: 16,
    borderRadius: 2,
    marginTop: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
  metricsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 12,
    gap: 8,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#18181b',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  metricLabel: {
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: '500',
  },
  metricValue: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 4,
  },
  scrollList: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  exerciseCard: {
    backgroundColor: '#18181b',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  exerciseName: {
    color: '#f4f4f5',
    fontSize: 16,
    fontWeight: '700',
  },
  muscleLabel: {
    color: '#60a5fa',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
    marginBottom: 12,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f23',
    justifyContent: 'space-between',
  },
  setRowCompleted: {
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
  },
  setIndexText: {
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: '600',
  },
  weightClickableText: {
    color: '#60a5fa',
    fontSize: 14,
    fontWeight: '800',
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  setValText: {
    color: '#f4f4f5',
    fontSize: 13,
    fontWeight: '600',
  },
  est1RMText: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '700',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#3f3f46',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
});
