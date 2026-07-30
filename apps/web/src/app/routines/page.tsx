'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTraining } from '@/context/TrainingContext';
import { EXERCISE_CATALOG, CustomRoutine } from '@forge/domain';
import {
  ForgePage,
  ForgeContainer,
  ForgeSection,
  ForgeStack,
  ForgeCard,
  ForgeBadge,
  ForgeButton,
  ForgeInput,
  LeftAnchorSpine,
  SpineNode,
  ForgeBottomNav,
} from '@forge/ui';

export default function ProgramAndRoutinesPage() {
  const router = useRouter();
  const { routines, saveRoutine, deleteRoutine, executeWorkoutSession } = useTraining();

  const [activeProgramTitle, setActiveProgramTitle] = useState('PROGRAMA BASE DE FUERZA Y SOBRECARGA');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [routineTitle, setRoutineTitle] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<
    { exerciseId: string; name: string; muscleGroup: string; setsCount: number; weightKg: number; reps: number }[]
  >([]);

  const [exerciseSearch, setExerciseSearch] = useState('');

  const filteredCatalog = useMemo(() => {
    return EXERCISE_CATALOG.filter((ex) =>
      ex.name.toLowerCase().includes(exerciseSearch.toLowerCase()) ||
      ex.muscleGroup.toLowerCase().includes(exerciseSearch.toLowerCase())
    );
  }, [exerciseSearch]);

  const handleStartCreate = () => {
    setEditingId(null);
    setRoutineTitle('RUTINA PUSH A');
    setSelectedExercises([
      { exerciseId: 'ex_bench_press', name: 'Press Banca con Barra', muscleGroup: 'chest', setsCount: 3, weightKg: 80, reps: 8 },
    ]);
    setIsEditing(true);
  };

  const handleAddExerciseToRoutine = (catalogItem: typeof EXERCISE_CATALOG[0]) => {
    setSelectedExercises((prev) => [
      ...prev,
      { exerciseId: catalogItem.id, name: catalogItem.name, muscleGroup: catalogItem.muscleGroup, setsCount: 3, weightKg: 60, reps: 10 },
    ]);
  };

  const handleRemoveExerciseFromRoutine = (index: number) => {
    setSelectedExercises((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSaveRoutineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!routineTitle.trim() || selectedExercises.length === 0) return;

    const newRoutine: CustomRoutine = {
      id: editingId || `rot_${Date.now()}`,
      title: routineTitle.trim(),
      exercises: selectedExercises.map((ex) => ({
        exerciseId: ex.exerciseId,
        name: ex.name,
        muscleGroup: ex.muscleGroup,
        sets: Array.from({ length: ex.setsCount }, () => ({
          weightKg: ex.weightKg,
          reps: ex.reps,
          setType: 'working' as const,
        })),
      })),
    };

    saveRoutine(newRoutine);
    setIsEditing(false);
  };

  const handleLaunchRoutine = (routine: CustomRoutine) => {
    executeWorkoutSession(routine);
    router.push('/');
  };

  return (
    <ForgePage className="pb-32">
      <ForgeContainer>
        {/* BRANDING NAVBAR */}
        <ForgeSection className="mb-8">
          <header className="flex justify-between items-center bg-[#09090b]/80 backdrop-blur-3xl border border-white/10 p-4 md:px-8 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
            <Link href="/" prefetch={true} className="no-underline flex items-center gap-3 text-white font-black text-lg tracking-widest font-sans">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f0ff]" />
              FORGE <span className="text-[10px] text-cyan-400 font-mono tracking-widest">[ PROGRAM ENGINE ]</span>
            </Link>

            <ForgeButton variant="primary" size="sm" onClick={handleStartCreate}>
              ➕ AÑADIR RUTINA AL PROGRAMA
            </ForgeButton>
          </header>
        </ForgeSection>

        {/* HERO SECTION: PROGRAMA ACTIVO DE ATLETA (AGREGADO PRINCIPAL) */}
        <ForgeSection className="mb-8">
          <ForgeCard glowColor="cyan" className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <ForgeBadge variant="cyan" className="mb-2">● PROGRAMA ACTIVO DE ENTRENAMIENTO</ForgeBadge>
                <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight m-0 font-sans">
                  {activeProgramTitle}
                </h1>
                <div className="text-xs font-mono text-zinc-400 mt-1">
                  ESTATUS: PROGRAMA VIVO EN PASAPORTE // {routines.length} RUTINAS PRESCRITAS INCLUIDAS
                </div>
              </div>

              <div className="text-right font-mono bg-zinc-900/80 border border-cyan-500/30 px-6 py-4 rounded-2xl">
                <div className="text-[10px] text-zinc-500 font-bold uppercase">MACROCICLO</div>
                <div className="text-2xl font-black text-cyan-400">ACTIVO</div>
                <div className="text-xs text-emerald-400 font-bold mt-0.5">VERSIÓN 1.0</div>
              </div>
            </div>
          </ForgeCard>
        </ForgeSection>

        {/* WORKOUT EDITOR PANEL */}
        {isEditing ? (
          <ForgeSection className="mb-8">
            <ForgeCard glowColor="cyan" className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <ForgeBadge variant="cyan" className="mb-1">CONSTRUCTOR DE RUTINA</ForgeBadge>
                  <h2 className="text-2xl font-black text-white uppercase m-0">AÑADIR RUTINA AL PROGRAMA</h2>
                </div>
                <button onClick={() => setIsEditing(false)} className="text-zinc-400 hover:text-white font-mono text-xs">
                  ✕ CANCELAR
                </button>
              </div>

              <form onSubmit={handleSaveRoutineSubmit} className="flex flex-col gap-6 font-mono">
                <ForgeInput
                  label="NOMBRE DE LA RUTINA PRESCRITA"
                  value={routineTitle}
                  onChange={(e) => setRoutineTitle(e.target.value)}
                  placeholder="Ej: PUSH A / PULL A / LEGS A"
                />

                {/* SELECTED EXERCISES LIST */}
                <div className="flex flex-col gap-3">
                  <label className="text-zinc-400 font-bold uppercase text-xs">EJERCICIOS PRESCRITOS ({selectedExercises.length})</label>
                  {selectedExercises.map((ex, idx) => (
                    <div key={idx} className="bg-zinc-900/80 border border-white/10 p-4 rounded-xl flex justify-between items-center">
                      <div>
                        <div className="text-sm font-bold text-white uppercase">{ex.name}</div>
                        <div className="text-xs text-zinc-400 mt-0.5">{ex.setsCount} SERIES × {ex.reps} REPS ({ex.weightKg} KG)</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveExerciseFromRoutine(idx)}
                        className="text-rose-400 hover:text-rose-300 text-xs font-bold px-2 py-1 bg-rose-500/10 rounded border border-rose-500/20"
                      >
                        ELIMINAR
                      </button>
                    </div>
                  ))}
                </div>

                {/* EXERCISE CATALOG PICKER */}
                <div className="pt-4 border-t border-white/10">
                  <label className="text-zinc-400 font-bold uppercase text-xs mb-2 block">CATÁLOGO DE EJERCICIOS (1 TAP PARA AÑADIR)</label>
                  <input
                    type="text"
                    value={exerciseSearch}
                    onChange={(e) => setExerciseSearch(e.target.value)}
                    placeholder="🔍 Buscar en catálogo..."
                    className="bg-[#09090b] text-white border border-white/10 rounded-xl px-4 py-2 text-xs w-full mb-3 focus:outline-none focus:border-cyan-400"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {filteredCatalog.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleAddExerciseToRoutine(item)}
                        className="bg-zinc-900/60 hover:bg-cyan-500/10 hover:border-cyan-500/40 border border-white/5 p-3 rounded-lg text-left transition-all"
                      >
                        <div className="text-xs font-bold text-white">{item.name}</div>
                        <div className="text-[10px] text-zinc-500 uppercase">{item.muscleGroup} // {item.category}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <ForgeButton type="submit" variant="primary" size="lg" className="w-full mt-4">
                  💾 GUARDAR RUTINA EN PROGRAMA
                </ForgeButton>
              </form>
            </ForgeCard>
          </ForgeSection>
        ) : (
          /* ROUTINES INCLUDED IN ACTIVE PROGRAM */
          <LeftAnchorSpine>
            <SpineNode indexLabel="01 • RUTINAS PRESCRITAS EN EL PROGRAMA ACTIVO" isActive={true}>
              {routines.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {routines.map((rot) => (
                    <ForgeCard key={rot.id} glowColor="cyan" className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <ForgeBadge variant="cyan" className="mb-1">RUTINA DEL PROGRAMA</ForgeBadge>
                          <h3 className="text-xl font-black text-white uppercase tracking-tight m-0">{rot.title}</h3>
                          <div className="text-xs font-mono text-zinc-400 mt-1">{rot.exercises.length} EJERCICIOS PRESCRITOS</div>
                        </div>

                        <button
                          onClick={() => deleteRoutine(rot.id)}
                          className="text-zinc-500 hover:text-rose-400 text-xs font-mono font-bold"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="flex flex-col gap-2 mb-6 font-mono text-xs">
                        {rot.exercises.map((ex, idx) => (
                          <div key={idx} className="bg-zinc-900/60 p-2.5 rounded-lg border border-white/5 flex justify-between text-zinc-300">
                            <span>• {ex.name}</span>
                            <span className="text-cyan-400 font-bold">{ex.sets.length} SERIES</span>
                          </div>
                        ))}
                      </div>

                      <ForgeButton
                        variant="glow"
                        size="md"
                        onClick={() => handleLaunchRoutine(rot)}
                        className="w-full"
                      >
                        ⚡ EJECUTAR ESTA RUTINA
                      </ForgeButton>
                    </ForgeCard>
                  ))}
                </div>
              ) : (
                /* ZERO STATE WHEN PROGRAM HAS NO ROUTINES */
                <ForgeCard className="p-12 text-center border-dashed border-white/10 font-mono">
                  <ForgeBadge variant="cyan" className="mb-2">PROGRAMA SIN RUTINAS</ForgeBadge>
                  <h3 className="text-xl font-black text-white uppercase m-0">TU PROGRAMA ACTIVO AÚN NO TIENE RUTINAS</h3>
                  <p className="text-xs text-zinc-400 mt-2 max-w-md mx-auto mb-8">
                    Añade tu primera rutina prescrita (ej: Push A) al programa activo para comenzar a entrenar.
                  </p>

                  <ForgeButton variant="primary" size="lg" onClick={handleStartCreate}>
                    ➕ AÑADIR MI PRIMERA RUTINA AL PROGRAMA
                  </ForgeButton>
                </ForgeCard>
              )}
            </SpineNode>
          </LeftAnchorSpine>
        )}

        {/* PERMANENT BOTTOM NAVIGATION BAR */}
        <ForgeBottomNav activeHref="/routines" />

      </ForgeContainer>
    </ForgePage>
  );
}
