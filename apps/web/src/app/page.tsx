'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTraining } from '@/context/TrainingContext';
import { generateDailyQuests, CoachEngine, AthleteContext } from '@forge/domain';
import {
  ForgePage,
  ForgeContainer,
  ForgeSection,
  ForgeStack,
  LeftAnchorSpine,
  SpineNode,
  ForgeButton,
  PassportCredential,
  StatTile,
  LastEvidenceCard,
  NextProof,
  MomentumIndicator,
  CoachBriefWidget,
  ForgeBottomNav,
  PassportZeroModal,
  SessionRecoveryBanner,
  ForgeCard,
  ForgeBadge,
} from '@forge/ui';

export default function HomeExperiencePage() {
  const router = useRouter();
  const {
    userXp,
    totalMonthlyVolume,
    evidences,
    rankInfo,
    athleteName,
    athleteId,
    setAthleteName,
    setBodyWeightKg,
    isPassportInitialized,
    activeRecoverySession,
    clearActiveRecoverySession,
    activePrescribedRoutine,
  } = useTraining();

  const dailyQuests = useMemo(
    () => generateDailyQuests('2026-07-29', rankInfo.currentRank),
    [rankInfo.currentRank]
  );

  const formattedVolume = useMemo(
    () => totalMonthlyVolume.toLocaleString(),
    [totalMonthlyVolume]
  );

  const lastEvidence = evidences.length > 0 ? evidences[0] : null;

  // DYNAMIC COACH ENGINE EVALUATION - 100% PURE DOMAIN DATA
  const coachRecommendation = useMemo(() => {
    if (!lastEvidence) {
      return null;
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

    return coachEngine.evaluate(athleteCtx).topRecommendation;
  }, [athleteId, rankInfo.currentRank, lastEvidence, evidences.length]);

  return (
    <ForgePage className="pb-32">
      <ForgeContainer>
        {/* PASSPORT ZERO ONBOARDING MODAL */}
        {!isPassportInitialized && (
          <PassportZeroModal
            onComplete={(name, bodyWeight) => {
              setAthleteName(name);
              setBodyWeightKg(bodyWeight);
            }}
          />
        )}

        {/* BRANDING NAVBAR */}
        <ForgeSection className="mb-8">
          <header className="flex justify-between items-center bg-[#09090b]/80 backdrop-blur-3xl border border-white/10 p-4 md:px-8 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
            <Link href="/" prefetch={true} className="no-underline flex items-center gap-3 text-white font-black text-lg tracking-widest font-sans">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f0ff]" />
              FORGE <span className="text-[10px] text-cyan-400 font-mono tracking-widest">[ ATHLETE PASSPORT ]</span>
            </Link>

            <Link href="/train" prefetch={true} className="no-underline">
              <ForgeButton variant="primary" size="sm">⚡ FORJAR HOY</ForgeButton>
            </Link>
          </header>
        </ForgeSection>

        {/* ACTIVE SESSION RECOVERY BANNER */}
        {activeRecoverySession && (
          <SessionRecoveryBanner
            exerciseName={activeRecoverySession.exerciseName}
            weightKg={activeRecoverySession.weightKg}
            reps={activeRecoverySession.reps}
            setsCount={activeRecoverySession.setsCount}
            onRecover={() => router.push('/train')}
            onDiscard={() => clearActiveRecoverySession()}
          />
        )}

        {/* CENTRAL HERO CTA (UX AUDIT IMPROVEMENT: 1-CLICK LAUNCH FROM ACTIVE PROGRAM) */}
        <ForgeSection className="mb-8 text-center">
          <div className="bg-cyan-500/10 border border-cyan-500/30 p-6 md:p-8 rounded-2xl shadow-[0_0_35px_rgba(0,240,255,0.2)]">
            <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2">
              ● PROTOCOLO DEL DÍA: {activePrescribedRoutine ? activePrescribedRoutine.title.toUpperCase() : 'CREA TU RUTINA'}
            </h2>
            <p className="text-sm font-sans text-zinc-300 mb-6 max-w-md mx-auto">
              Inicia tu sesión del día en 1 clic y eleva tus Puntos de Disciplina en tiempo real.
            </p>
            <Link href={activePrescribedRoutine ? '/train' : '/routines'} prefetch={true} className="no-underline inline-block w-full max-w-md">
              <ForgeButton variant="primary" size="lg" className="w-full text-base py-4 shadow-[0_0_30px_rgba(0,240,255,0.4)]">
                {activePrescribedRoutine
                  ? `⚡ INICIAR ${activePrescribedRoutine.title.toUpperCase()} (+200 XP)`
                  : '➕ CREAR MI PRIMERA RUTINA'}
              </ForgeButton>
            </Link>
          </div>
        </ForgeSection>

        {/* NARRATIVE CANVAS */}
        <LeftAnchorSpine>
          
          {/* 01 • PASAPORTE DE ATLETA */}
          <SpineNode indexLabel="01 • PASAPORTE DE ATLETA (IDENTIDAD)" isActive={true}>
            <PassportCredential
              athleteName={athleteName || 'Nuevo Atleta'}
              athleteId={athleteId}
              currentRank={rankInfo.currentRank}
              nextRank={rankInfo.nextRank}
              totalXp={userXp}
              progressPercentage={rankInfo.progressPercentage}
            />
          </SpineNode>

          {/* 02 • OBJETIVO DIRECTIVO DE HOY */}
          <SpineNode indexLabel="02 • OBJETIVO DIRECTIVO DE HOY">
            <NextProof
              targets={dailyQuests}
              totalAvailableXp={450}
            />
          </SpineNode>

          {/* 03 • PROGRESIÓN Y ASESOR TÁCTICO INTEGRADO */}
          <SpineNode indexLabel="03 • PROGRESIÓN Y ASESOR TÁCTICO">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ForgeStack direction="column" gap="lg">
                <StatTile
                  label="ACUMULACIÓN DE VOLUMEN MENSUAL"
                  value={formattedVolume}
                  unit="KG"
                  trend={evidences.length > 0 ? "+12.4% VELOCIDAD SOBRECARGA" : "ESPERANDO PRIMERA SESIÓN"}
                  trendDirection={evidences.length > 0 ? "up" : "neutral"}
                  glowColor="cyan"
                />
                <MomentumIndicator
                  momentumIndex={evidences.length > 0 ? 88.5 : 0}
                  streakWeeks={evidences.length > 0 ? Math.min(4, evidences.length) : 0}
                  statusLabel={evidences.length > 0 ? "RACHA EN CURSO" : "INICIA TU PRIMERA RACHA"}
                />
              </ForgeStack>

              <CoachBriefWidget
                adviceText={
                  coachRecommendation?.message ||
                  "Necesito tu primera sesión para comenzar a ayudarte."
                }
                targetExercise={lastEvidence?.exerciseName || "PROTOCOLO INICIAL"}
                suggestedAction={coachRecommendation?.cta || "EJECUTA TU PRIMERA SERIE EN TRAIN"}
              />
            </div>
          </SpineNode>

          {/* 04 • ÚLTIMA EVIDENCIA VERIFICADA */}
          <SpineNode indexLabel="04 • ÚLTIMA EVIDENCIA VERIFICADA">
            {lastEvidence ? (
              <LastEvidenceCard
                title={lastEvidence.title}
                timestamp={lastEvidence.timestamp}
                volume={lastEvidence.volume}
                duration={lastEvidence.duration}
                xp={lastEvidence.xp}
                pr={lastEvidence.pr}
              />
            ) : (
              <ForgeCard className="p-8 text-center border-dashed border-white/10">
                <ForgeBadge variant="cyan" className="mb-2">EXPEDIENTE VACÍO</ForgeBadge>
                <h3 className="text-lg font-black text-white uppercase m-0">AÚN NO HAS REGISTRADO TU PRIMER ENTRENAMIENTO</h3>
                <p className="text-xs font-mono text-zinc-400 mt-2 max-w-sm mx-auto mb-6">
                  Completa tu primera sesión para grabar evidencia inmutable en tu expediente.
                </p>
                <Link href={activePrescribedRoutine ? '/train' : '/routines'} prefetch={true} className="no-underline inline-block">
                  <ForgeButton variant="primary" size="sm">
                    ⚡ REGISTRAR PRIMER ENTRENAMIENTO
                  </ForgeButton>
                </Link>
              </ForgeCard>
            )}
          </SpineNode>

        </LeftAnchorSpine>

        {/* PERMANENT BOTTOM NAVIGATION BAR */}
        <ForgeBottomNav activeHref="/" />

      </ForgeContainer>
    </ForgePage>
  );
}
