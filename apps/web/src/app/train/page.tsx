'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTraining } from '@/context/TrainingContext';
import { EXERCISE_CATALOG, CustomRoutine } from '@forge/domain';
import {
  ForgePage,
  ForgeContainer,
  ForgeSection,
  ForgeCard,
  ForgeBadge,
  ForgeButton,
  LeftAnchorSpine,
  SpineNode,
} from '@forge/ui';

interface LiveExerciseSet {
  id: number;
  weight: number;
  reps: number;
  completed: boolean;
}

interface LiveExerciseBlock {
  exerciseId: string;
  name: string;
  muscleGroup: string;
  sets: LiveExerciseSet[];
}

export default function DynamicTrainWorkstation() {
  const router = useRouter();
  const { routines, executeWorkoutSession } = useTraining();

  const [activeExercises, setActiveExercises] = useState<LiveExerciseBlock[]>(() => {
    if (routines.length > 0) {
      const rot = routines[0];
      return rot.exercises.map((ex) => ({
        exerciseId: ex.exerciseId,
        name: ex.name,
        muscleGroup: ex.muscleGroup,
        sets: ex.sets.map((s, idx) => ({
          id: idx + 1,
          weight: s.weightKg,
          reps: s.reps,
          completed: false,
        })),
      }));
    }
    return [];
  });

  const [restSecondsLeft, setRestSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    if (restSecondsLeft === null || restSecondsLeft <= 0) return;
    const timer = setInterval(() => {
      setRestSecondsLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [restSecondsLeft]);

  // LIVE IN-SESSION EDITING FUNCTIONS (< 3 TAPS)
  const toggleSet = useCallback((exIdx: number, setId: number) => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(15);
    }

    setActiveExercises((prev) => {
      const updated = [...prev];
      const ex = updated[exIdx];
      const targetSet = ex.sets.find((s) => s.id === setId);
      if (targetSet) {
        targetSet.completed = !targetSet.completed;
        if (targetSet.completed) {
          setRestSecondsLeft(90);
        }
      }
      return updated;
    });
  }, []);

  const adjustWeight = useCallback((exIdx: number, setId: number, delta: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveExercises((prev) => {
      const updated = [...prev];
      const ex = updated[exIdx];
      const targetSet = ex.sets.find((s) => s.id === setId);
      if (targetSet) {
        targetSet.weight = Math.max(0.5, Math.min(450, targetSet.weight + delta));
      }
      return updated;
    });
  }, []);

  const addExtraSet = useCallback((exIdx: number) => {
    setActiveExercises((prev) => {
      const updated = [...prev];
      const ex = updated[exIdx];
      const lastSet = ex.sets[ex.sets.length - 1];
      ex.sets.push({
        id: ex.sets.length + 1,
        weight: lastSet ? lastSet.weight : 60,
        reps: lastSet ? lastSet.reps : 10,
        completed: false,
      });
      return updated;
    });
  }, []);

  const removeExercise = useCallback((exIdx: number) => {
    setActiveExercises((prev) => prev.filter((_, idx) => idx !== exIdx));
  }, []);

  const addCatalogExercise = useCallback((catalogItem: typeof EXERCISE_CATALOG[0]) => {
    setActiveExercises((prev) => [
      ...prev,
      {
        exerciseId: catalogItem.id,
        name: catalogItem.name,
        muscleGroup: catalogItem.muscleGroup,
        sets: [
          { id: 1, weight: 60, reps: 10, completed: false },
          { id: 2, weight: 60, reps: 10, completed: false },
          { id: 3, weight: 60, reps: 10, completed: false },
        ],
      },
    ]);
  }, []);

  const totalVolume = useMemo(() => {
    return activeExercises.reduce((sum, ex) => {
      return (
        sum +
        ex.sets.reduce((exSum, s) => exSum + (s.completed ? s.weight * s.reps : 0), 0)
      );
    }, 0);
  }, [activeExercises]);

  const handleFinishImmediate = useCallback(() => {
    if (activeExercises.length === 0) return;

    const dynamicRoutine: CustomRoutine = {
      id: `session_${Date.now()}`,
      title: activeExercises[0]?.name ? `${activeExercises[0].name.toUpperCase()} SESSION` : 'SESIÓN DE SOBRECARGA',
      exercises: activeExercises.map((ex) => ({
        exerciseId: ex.exerciseId,
        name: ex.name,
        muscleGroup: ex.muscleGroup,
        sets: ex.sets.map((s) => ({
          weightKg: s.weight,
          reps: s.reps,
          setType: 'working' as const,
        })),
      })),
    };

    executeWorkoutSession(dynamicRoutine);
    router.push('/');
  }, [activeExercises, executeWorkoutSession, router]);

  // ZERO STATE IF NO ROUTINES EXIST YET
  if (routines.length === 0 && activeExercises.length === 0) {
    return (
      <ForgePage className="pb-32">
        <ForgeContainer>
          <ForgeSection className="mb-8">
            <header className="flex justify-between items-center bg-[#0c0c10]/50 backdrop-blur-2xl border border-white/10 p-4 md:px-8 rounded-2xl">
              <Link href="/" prefetch={true} className="no-underline flex items-center gap-2.5 text-white font-black text-lg tracking-widest">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f0ff]" />
                FORGE <span className="text-[10px] text-cyan-400 font-mono tracking-widest">[ TRAIN WORKSTATION ]</span>
              </Link>
            </header>
          </ForgeSection>

          <ForgeSection>
            <ForgeCard className="p-12 text-center border-dashed border-white/10 font-mono">
              <ForgeBadge variant="cyan" className="mb-2">SIN RUTINA CARGADA</ForgeBadge>
              <h1 className="text-2xl font-black text-white uppercase m-0">NO TIENES ENTRENAMIENTOS TODAVÍA</h1>
              <p className="text-xs text-zinc-400 mt-2 max-w-md mx-auto mb-8">
                Crea tu primera rutina personalizada sin ejercicios hardcodeados para comenzar a entrenar.
              </p>

              <Link href="/routines" prefetch={true} className="no-underline inline-block">
                <ForgeButton variant="primary" size="lg">
                  ➕ CREAR MI PRIMERA RUTINA
                </ForgeButton>
              </Link>
            </ForgeCard>
          </ForgeSection>
        </ForgeContainer>
      </ForgePage>
    );
  }

  return (
    <ForgePage className="pb-28">
      <ForgeContainer>
        {/* NAVBAR */}
        <ForgeSection className="mb-8">
          <header className="flex justify-between items-center bg-[#0c0c10]/50 backdrop-blur-2xl border border-white/10 p-4 md:px-8 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            <Link href="/" prefetch={true} className="no-underline flex items-center gap-2.5 text-white font-black text-lg tracking-widest">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f0ff]" />
              FORGE <span className="text-[10px] text-cyan-400 font-mono tracking-widest">[ TRAIN WORKSTATION ]</span>
            </Link>

            <Link href="/" prefetch={true} className="no-underline">
              <ForgeButton variant="ghost" size="sm">✕ CANCELAR</ForgeButton>
            </Link>
          </header>
        </ForgeSection>

        {/* HIGH-PROMINENCE AUTOMATIC REST TIMER BANNER */}
        {restSecondsLeft !== null && restSecondsLeft > 0 && (
          <ForgeSection className="mb-8">
            <div className="bg-cyan-500/20 border border-cyan-400 p-6 rounded-2xl flex justify-between items-center shadow-[0_0_40px_rgba(0,240,255,0.3)] animate-pulse">
              <div>
                <ForgeBadge variant="cyan" className="mb-1">⏱ TEMPORIZADOR DE DESCANSO AUTOMÁTICO</ForgeBadge>
                <div className="text-3xl md:text-4xl font-black font-mono text-cyan-400">{restSecondsLeft} SEGUNDOS</div>
                <div className="text-xs font-mono text-zinc-300 mt-1">RESÍNTESIS OPTIMIZADA DE ATP ENTRE SERIES</div>
              </div>
              <button
                onClick={() => setRestSecondsLeft(null)}
                className="bg-cyan-400 text-black font-mono font-black text-xs px-4 py-2 rounded-xl hover:bg-cyan-300 transition-all"
              >
                SALTAR DESCANSO
              </button>
            </div>
          </ForgeSection>
        )}

        {/* WORKOUT TACTICAL CANVAS */}
        <div className="max-w-[800px] mx-auto">
          <LeftAnchorSpine>
            
            {/* ACTIVE DYNAMIC EXERCISES */}
            {activeExercises.map((ex, exIdx) => (
              <SpineNode key={exIdx} indexLabel={`NODE // 0${exIdx + 1} • ${ex.name.toUpperCase()}`} isActive={exIdx === 0}>
                <ForgeCard className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <ForgeBadge variant="cyan" className="mb-1">● PROTOCOLO ACTIVO</ForgeBadge>
                      <h2 className="text-2xl font-black text-white uppercase tracking-tight m-0">{ex.name}</h2>
                      <div className="text-xs font-mono text-zinc-400 mt-0.5">GRUPO MUSCULAR: {ex.muscleGroup.toUpperCase()}</div>
                    </div>

                    <button
                      onClick={() => removeExercise(exIdx)}
                      className="text-rose-400 hover:text-rose-300 text-xs font-mono font-bold px-2.5 py-1 bg-rose-500/10 rounded border border-rose-500/20"
                    >
                      ELIMINAR
                    </button>
                  </div>

                  {/* SETS LIST */}
                  <div className="flex flex-col gap-3 mb-6">
                    {ex.sets.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => toggleSet(exIdx, s.id)}
                        className={`flex justify-between items-center p-4 rounded-xl border transition-all cursor-pointer select-none ${
                          s.completed
                            ? 'bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_20px_rgba(0,255,157,0.15)]'
                            : 'bg-zinc-900/60 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs transition-all ${
                              s.completed ? 'bg-emerald-400 text-black scale-105' : 'bg-zinc-800 text-zinc-400'
                            }`}
                          >
                            {s.completed ? '✓' : `0${s.id}`}
                          </div>

                          <div>
                            <div className="text-sm font-extrabold text-white font-mono flex items-center gap-2">
                              <span>{s.weight} KG × {s.reps} REPS</span>

                              <div className="inline-flex items-center gap-1 ml-2">
                                <button
                                  type="button"
                                  onClick={(e) => adjustWeight(exIdx, s.id, -2.5, e)}
                                  className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-xs font-mono font-bold border border-white/10"
                                >
                                  -2.5
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => adjustWeight(exIdx, s.id, 2.5, e)}
                                  className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-xs font-mono font-bold border border-white/10"
                                >
                                  +2.5
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-right font-mono">
                          <div className="text-xs font-black text-white">{s.weight * s.reps} KG</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <ForgeButton
                    variant="ghost"
                    size="sm"
                    onClick={() => addExtraSet(exIdx)}
                    className="w-full border border-dashed border-white/20"
                  >
                    ➕ AÑADIR SERIE EXTRA
                  </ForgeButton>
                </ForgeCard>
              </SpineNode>
            ))}

            {/* QUICK IN-SESSION EXERCISE ADDER */}
            <SpineNode indexLabel="AÑADIR EJERCICIO EN VIVO A LA SESIÓN">
              <ForgeCard className="p-6 font-mono">
                <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 block">
                  ➕ AÑADIR EJERCICIO A LA SESIÓN ACTIVA (1 TAP)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {EXERCISE_CATALOG.slice(0, 4).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => addCatalogExercise(item)}
                      className="bg-zinc-900/60 hover:bg-cyan-500/10 border border-white/10 p-3 rounded-lg text-left transition-all flex justify-between items-center"
                    >
                      <span className="text-xs font-bold text-white">{item.name}</span>
                      <span className="text-cyan-400 text-xs font-bold">+</span>
                    </button>
                  ))}
                </div>
              </ForgeCard>
            </SpineNode>

          </LeftAnchorSpine>
        </div>

        {/* STICKY BOTTOM CONFIRMATION FOOTER */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#030305]/90 backdrop-blur-2xl border-t border-white/10 flex justify-center z-50">
          <ForgeButton
            variant="glow"
            size="lg"
            onClick={handleFinishImmediate}
            className="w-full max-w-[600px] shadow-[0_0_30px_rgba(0,255,157,0.3)]"
          >
            ⚡ CONFIRMAR Y GRABAR EVIDENCIA ({totalVolume.toLocaleString()} KG)
          </ForgeButton>
        </div>

      </ForgeContainer>
    </ForgePage>
  );
}
