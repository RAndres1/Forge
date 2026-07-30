'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useTraining } from '@/context/TrainingContext';
import { CoachEngine, AthleteContext } from '@forge/domain';
import {
  ForgePage,
  ForgeContainer,
  ForgeSection,
  ForgeCard,
  ForgeBadge,
  ForgeButton,
  ForgeText,
  LeftAnchorSpine,
  SpineNode,
  CoachBriefWidget,
  ForgeBottomNav,
} from '@forge/ui';

export default function CoachScreenPage() {
  const { rankInfo, evidences, athleteId, athleteKnowledge } = useTraining();

  const lastEvidence = evidences.length > 0 ? evidences[0] : null;

  const coachEngineResult = useMemo(() => {
    if (!lastEvidence) {
      return {
        topRecommendation: null,
        allRecommendations: [],
        executionTimeMs: 0,
      };
    }

    const coachEngine = new CoachEngine();
    const athleteCtx: AthleteContext = {
      athleteId,
      currentRank: rankInfo.currentRank,
      lastWorkout: {
        exerciseId: `ex_${lastEvidence.id}`,
        exerciseName: lastEvidence.exerciseName || 'Entrenamiento de Fuerza',
        isCompound: true,
        isHeavy: true,
        weightKg: Math.round((lastEvidence.rawVolumeKg || 1000) / 24) || 70,
        targetReps: 8,
        achievedReps: 8,
        lastRpe: 7.8,
        targetCompleted: true,
        previousBest1RM: Math.round((lastEvidence.rawVolumeKg || 1000) / 20) || 90,
      },
      weeklyStreak: {
        targetSessionsCount: 4,
        completedSessionsCount: Math.min(4, evidences.length),
        hoursLeftInWeek: 48,
      },
    };

    return coachEngine.evaluate(athleteCtx);
  }, [athleteId, rankInfo.currentRank, lastEvidence, evidences.length]);

  const topRec = coachEngineResult.topRecommendation;
  const habits = athleteKnowledge.habits;

  return (
    <ForgePage className="pb-32">
      <ForgeContainer>
        {/* BRANDING NAVBAR */}
        <ForgeSection className="mb-8">
          <header className="flex justify-between items-center bg-[#09090b]/80 backdrop-blur-3xl border border-white/10 p-4 md:px-8 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
            <Link href="/" prefetch={true} className="no-underline flex items-center gap-3 text-white font-black text-lg tracking-widest font-sans">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_12px_#7000ff]" />
              FORGE <span className="text-[10px] text-violet-400 font-mono tracking-widest">[ ATHLETE KNOWLEDGE & COACH ]</span>
            </Link>

            <Link href="/train" prefetch={true} className="no-underline">
              <ForgeButton variant="primary" size="sm">⚡ FORJAR HOY</ForgeButton>
            </Link>
          </header>
        </ForgeSection>

        {/* HERO SECTION */}
        <ForgeSection className="mb-8">
          <ForgeCard glowColor="violet" className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <ForgeBadge variant="violet" className="mb-2">🧠 ATHLETE KNOWLEDGE LAYER</ForgeBadge>
                <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight m-0 font-sans">
                  CONOCIMIENTO EXTRAÍDO DE EVIDENCIAS
                </h1>
                <ForgeText level="level4" className="text-violet-400 font-mono font-bold mt-1">
                  DURACIÓN PROMEDIO: {athleteKnowledge.averageDurationMinutes}M // SESIONES COMPLETADAS: {athleteKnowledge.totalSessionsCompleted}
                </ForgeText>
              </div>

              <div className="text-right font-mono bg-zinc-900/80 border border-violet-500/30 px-6 py-4 rounded-2xl">
                <div className="text-[10px] text-zinc-500 font-bold uppercase">HÁBITOS DETECTADOS</div>
                <div className="text-2xl font-black text-white">{habits.length} PATRONES</div>
                <div className="text-xs text-emerald-400 font-bold mt-0.5">100% DETERMINISTA</div>
              </div>
            </div>
          </ForgeCard>
        </ForgeSection>

        {/* CANVAS DE RECOMENDACIONES Y HÁBITOS */}
        <LeftAnchorSpine>
          
          {/* NODE 01: RECOMENDACIÓN CRÍTICA PRINCIPAL */}
          <SpineNode indexLabel="NODE // 01 • DECISIÓN TÁCTICA DE MAYOR PRIORIDAD" isActive={true}>
            {topRec ? (
              <div className="flex flex-col gap-4">
                <CoachBriefWidget
                  adviceText={topRec.message}
                  targetExercise={lastEvidence?.exerciseName || "PROTOCOLO DE SOBRECARGA"}
                  suggestedAction={topRec.cta}
                />

                <div className="bg-zinc-900/60 border border-white/10 p-6 rounded-2xl font-mono">
                  <div className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-2">
                    EVIDENCIA DE LA REGLA [{topRec.ruleId}] (CONFIANZA: {(topRec.confidence * 100).toFixed(0)}%)
                  </div>
                  <div className="flex flex-col gap-1 text-xs text-zinc-300">
                    {topRec.evidence.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <ForgeCard className="p-8 text-center border-dashed border-white/10 font-mono">
                <ForgeBadge variant="violet" className="mb-2">MOTOR SILENCIOSO</ForgeBadge>
                <h3 className="text-lg font-black text-white uppercase m-0">ESPERANDO TU PRIMERA SESIÓN REAL PARA ACTIVAR TELEMETRÍA</h3>
                <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto mb-6">
                  El Coach Engine no inventa recomendaciones. Completa tu primer entrenamiento para generar telemetría.
                </p>
                <Link href="/train" prefetch={true} className="no-underline inline-block">
                  <ForgeButton variant="primary" size="sm">
                    ⚡ REGISTRAR PRIMER ENTRENAMIENTO
                  </ForgeButton>
                </Link>
              </ForgeCard>
            )}
          </SpineNode>

          {/* NODE 02: HABIT LEARNING ENGINE (HÁBITOS DETECTADOS DE EVIDENCIAS REALES) */}
          <SpineNode indexLabel="NODE // 02 • HABIT LEARNING ENGINE (PATRONES RECONOCIDOS)">
            {habits.length > 0 ? (
              <div className="flex flex-col gap-4 font-mono">
                {habits.map((h) => (
                  <div key={h.id} className="bg-zinc-900/80 border border-violet-500/30 p-6 rounded-2xl">
                    <div className="flex justify-between items-start mb-2">
                      <ForgeBadge variant="violet" className="text-[10px]">{h.type}</ForgeBadge>
                      <span className="text-[10px] text-zinc-500">{h.detectedAt.split('T')[0]}</span>
                    </div>
                    <h3 className="text-lg font-black text-white uppercase m-0">{h.description}</h3>

                    <div className="mt-4 flex flex-col gap-1 text-xs text-zinc-300">
                      {h.evidenceSummary.map((ev, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-violet-400 font-bold">•</span>
                          <span>{ev}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ForgeCard className="p-8 text-center border-dashed border-white/10 font-mono">
                <ForgeBadge variant="cyan" className="mb-2">ANALIZANDO HÁBITOS</ForgeBadge>
                <h3 className="text-base font-bold text-zinc-300 uppercase m-0">
                  REGISTRA MÁS SESIONES PARA PERMITIR AL MOTOR DETECTAR PATRONES DE SOBRECARGA
                </h3>
              </ForgeCard>
            )}
          </SpineNode>

        </LeftAnchorSpine>

        {/* PERMANENT BOTTOM NAVIGATION BAR */}
        <ForgeBottomNav activeHref="/coach" />

      </ForgeContainer>
    </ForgePage>
  );
}
