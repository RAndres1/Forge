'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  getRankProgress,
  WorkoutEngineServices,
  EventBus,
  WorkoutFinishedEvent,
  LocalStorageAdapter,
  CustomRoutine,
  HabitLearningEngine,
  AthleteKnowledgeAggregate,
} from '@forge/domain';

export interface EvidenceItem {
  id: string;
  title: string;
  timestamp: string;
  duration: string;
  volume: string;
  xp: string;
  pr?: string;
  rawVolumeKg?: number;
  exerciseName?: string;
}

export interface ActiveSessionRecovery {
  title: string;
  exerciseName: string;
  setsCount: number;
  weightKg: number;
  reps: number;
  elapsedSeconds: number;
}

interface TrainingContextType {
  userXp: number;
  totalMonthlyVolume: number;
  evidences: EvidenceItem[];
  routines: CustomRoutine[];
  saveRoutine: (routine: CustomRoutine) => void;
  deleteRoutine: (id: string) => void;
  rankInfo: ReturnType<typeof getRankProgress>;
  athleteName: string;
  athleteId: string;
  setAthleteName: (name: string) => void;
  bodyWeightKg: number;
  setBodyWeightKg: (bw: number) => void;
  isPassportInitialized: boolean;
  activeRecoverySession: ActiveSessionRecovery | null;
  saveActiveSessionRecovery: (session: ActiveSessionRecovery | null) => void;
  executeWorkoutSession: (routine: CustomRoutine) => void;
  clearActiveRecoverySession: () => void;
  activePrescribedRoutine: CustomRoutine | null;
  athleteKnowledge: AthleteKnowledgeAggregate;
}

const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

export const TrainingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userXp, setUserXp] = useState<number>(0);
  const [totalMonthlyVolume, setTotalMonthlyVolume] = useState<number>(0);
  const [evidences, setEvidences] = useState<EvidenceItem[]>([]);
  const [routines, setRoutines] = useState<CustomRoutine[]>([]);
  const [athleteName, setAthleteNameState] = useState<string>('');
  const [athleteId, setAthleteIdState] = useState<string>('ath_default');
  const [bodyWeightKg, setBodyWeightKgState] = useState<number>(75);
  const [activeRecoverySession, setActiveRecoverySessionState] = useState<ActiveSessionRecovery | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // HYDRATE FROM LOCAL STORAGE ON MOUNT
  useEffect(() => {
    const storage = new LocalStorageAdapter();
    setUserXp(storage.getItem<number>('forge_passport_xp') ?? 0);
    setTotalMonthlyVolume(storage.getItem<number>('forge_passport_volume') ?? 0);
    setEvidences(storage.getItem<EvidenceItem[]>('forge_evidences') ?? []);
    setRoutines(storage.getItem<CustomRoutine[]>('forge_custom_routines') ?? []);
    setAthleteNameState(storage.getItem<string>('forge_athlete_name') ?? '');
    setBodyWeightKgState(storage.getItem<number>('forge_body_weight') ?? 75);
    setActiveRecoverySessionState(storage.getItem<ActiveSessionRecovery>('forge_active_workout_session'));

    let existingId = storage.getItem<string>('forge_athlete_id');
    if (!existingId) {
      existingId = `ath_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      storage.setItem('forge_athlete_id', existingId);
    }
    setAthleteIdState(existingId);
    setIsMounted(true);
  }, []);

  const isPassportInitialized = Boolean(athleteName && athleteName.trim().length > 0);

  const activePrescribedRoutine = routines.length > 0 ? routines[0] : null;

  // DERIVE ATHLETE KNOWLEDGE VIA HABIT LEARNING ENGINE
  const athleteKnowledge = useMemo(() => {
    return HabitLearningEngine.analyzeHistory(athleteId, evidences);
  }, [athleteId, evidences]);

  const setAthleteName = (name: string) => {
    const storage = new LocalStorageAdapter();
    setAthleteNameState(name);
    storage.setItem('forge_athlete_name', name);
  };

  const setBodyWeightKg = (bw: number) => {
    const storage = new LocalStorageAdapter();
    setBodyWeightKgState(bw);
    storage.setItem('forge_body_weight', bw);
  };

  const saveRoutine = (routine: CustomRoutine) => {
    const storage = new LocalStorageAdapter();
    setRoutines((prev) => {
      const idx = prev.findIndex((r) => r.id === routine.id);
      let updated: CustomRoutine[];
      if (idx >= 0) {
        updated = [...prev];
        updated[idx] = routine;
      } else {
        updated = [routine, ...prev];
      }
      storage.setItem('forge_custom_routines', updated);
      return updated;
    });
  };

  const deleteRoutine = (id: string) => {
    const storage = new LocalStorageAdapter();
    setRoutines((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      storage.setItem('forge_custom_routines', updated);
      return updated;
    });
  };

  const saveActiveSessionRecovery = (session: ActiveSessionRecovery | null) => {
    const storage = new LocalStorageAdapter();
    setActiveRecoverySessionState(session);
    if (session) {
      storage.setItem('forge_active_workout_session', session);
    } else {
      storage.removeItem('forge_active_workout_session');
    }
  };

  const clearActiveRecoverySession = () => {
    const storage = new LocalStorageAdapter();
    setActiveRecoverySessionState(null);
    storage.removeItem('forge_active_workout_session');
  };

  const rankInfo = getRankProgress(userXp);

  // PERSIST CHANGES TO LOCALSTORAGE
  useEffect(() => {
    if (!isMounted) return;
    const storage = new LocalStorageAdapter();
    storage.setItem('forge_passport_xp', userXp);
  }, [userXp, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    const storage = new LocalStorageAdapter();
    storage.setItem('forge_passport_volume', totalMonthlyVolume);
  }, [totalMonthlyVolume, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    const storage = new LocalStorageAdapter();
    storage.setItem('forge_evidences', evidences);
  }, [evidences, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    const storage = new LocalStorageAdapter();
    storage.setItem('forge_athlete_knowledge', athleteKnowledge);
  }, [athleteKnowledge, isMounted]);

  // SUBSCRIBE EVENT BUS LISTENERS
  useEffect(() => {
    const eventBus = EventBus.getInstance();

    const unsubscribe = eventBus.subscribe<WorkoutFinishedEvent>('WorkoutFinished', (event) => {
      setUserXp((prev) => prev + event.totalXpEarned);
      setTotalMonthlyVolume((prev) => prev + event.totalVolumeKg);

      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const dateStr = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear().toString().slice(2)}`;

      const primaryExerciseName = event.title || 'ENTRENAMIENTO DE FUERZA';

      const newEv: EvidenceItem = {
        id: `ev-${Date.now()}`,
        title: `${event.title.toUpperCase()} VERIFIED`,
        timestamp: `${dateStr} • ${timeStr}`,
        duration: `${Math.ceil(event.totalDurationSeconds / 60) || 35}M`,
        volume: `${event.totalVolumeKg.toLocaleString()} KG`,
        xp: `+${event.totalXpEarned} XP`,
        pr: event.totalVolumeKg > 3000 ? `PR ${primaryExerciseName.toUpperCase()}` : undefined,
        rawVolumeKg: event.totalVolumeKg,
        exerciseName: primaryExerciseName,
      };

      setEvidences((prev) => [newEv, ...prev]);
      clearActiveRecoverySession();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const executeWorkoutSession = (routine: CustomRoutine) => {
    const workout = WorkoutEngineServices.createWorkout({
      title: routine.title,
      exercises: routine.exercises,
    });

    workout.start();

    workout.exercises.forEach((ex) => {
      ex.sets.forEach((set) => {
        workout.completeSet(ex.exerciseId.value, set.id.value);
      });
    });

    workout.finish();

    const eventBus = EventBus.getInstance();
    workout.domainEvents.forEach((ev) => {
      eventBus.publish(ev);
    });
  };

  return (
    <TrainingContext.Provider
      value={{
        userXp,
        totalMonthlyVolume,
        evidences,
        routines,
        saveRoutine,
        deleteRoutine,
        rankInfo,
        athleteName,
        athleteId,
        setAthleteName,
        bodyWeightKg,
        setBodyWeightKg,
        isPassportInitialized,
        activeRecoverySession,
        saveActiveSessionRecovery,
        executeWorkoutSession,
        clearActiveRecoverySession,
        activePrescribedRoutine,
        athleteKnowledge,
      }}
    >
      {children}
    </TrainingContext.Provider>
  );
};

export const useTraining = () => {
  const context = useContext(TrainingContext);
  if (!context) {
    throw new Error('useTraining must be used within a TrainingProvider');
  }
  return context;
};
