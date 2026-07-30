'use client';

import React from 'react';
import Link from 'next/link';
import { useTraining } from '@/context/TrainingContext';
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
  PassportCredential,
  ForgeBottomNav,
} from '@forge/ui';

export default function ProfileScreenPage() {
  const { rankInfo, userXp, athleteName, bodyWeightKg, totalMonthlyVolume, evidences } = useTraining();

  return (
    <ForgePage className="pb-32">
      <ForgeContainer>
        {/* BRANDING NAVBAR */}
        <ForgeSection className="mb-8">
          <header className="flex justify-between items-center bg-[#09090b]/80 backdrop-blur-3xl border border-white/10 p-4 md:px-8 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
            <Link href="/" prefetch={true} className="no-underline flex items-center gap-3 text-white font-black text-lg tracking-widest font-sans">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f0ff]" />
              FORGE <span className="text-[10px] text-cyan-400 font-mono tracking-widest">[ ATHLETE PROFILE ]</span>
            </Link>

            <Link href="/train" prefetch={true} className="no-underline">
              <ForgeButton variant="primary" size="sm">⚡ FORJAR HOY</ForgeButton>
            </Link>
          </header>
        </ForgeSection>

        {/* NARRATIVE CANVAS */}
        <LeftAnchorSpine>
          
          {/* NODE 01: ATHLETE PASSPORT CREDENTIAL */}
          <SpineNode indexLabel="01 • PASAPORTE E IDENTIDAD DE ATLETA" isActive={true}>
            <PassportCredential
              athleteName={athleteName}
              athleteId="FG-8842-X"
              currentRank={rankInfo.currentRank}
              nextRank={rankInfo.nextRank}
              totalXp={userXp}
              progressPercentage={rankInfo.progressPercentage}
            />
          </SpineNode>

          {/* NODE 02: BIOMETRICS & PERMANENT TELEMETRY */}
          <SpineNode indexLabel="02 • BIOMETRÍA Y EXPEDIENTE BASE">
            <ForgeCard className="p-8 font-mono">
              <div className="flex justify-between items-center mb-6">
                <ForgeBadge variant="cyan">👤 EXPEDIENTE BIOMÉTRICO</ForgeBadge>
                <span className="text-xs text-zinc-500 font-bold">ESTATUS: ACTIVO Y VERIFICADO</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-zinc-900/60 border border-white/10 p-5 rounded-xl">
                  <div className="text-[10px] text-zinc-500 font-bold uppercase">PESO CORPORAL BASE</div>
                  <div className="text-2xl font-black text-white mt-1">{bodyWeightKg} KG</div>
                  <div className="text-[11px] text-cyan-400 mt-1">SISTEMA INMECÁNICO</div>
                </div>

                <div className="bg-zinc-900/60 border border-white/10 p-5 rounded-xl">
                  <div className="text-[10px] text-zinc-500 font-bold uppercase">VOLUMEN TOTAL ACUMULADO</div>
                  <div className="text-2xl font-black text-white mt-1">{totalMonthlyVolume.toLocaleString()} KG</div>
                  <div className="text-[11px] text-emerald-400 mt-1">SOBRECARGA PROGRESIVA</div>
                </div>

                <div className="bg-zinc-900/60 border border-white/10 p-5 rounded-xl">
                  <div className="text-[10px] text-zinc-500 font-bold uppercase">EVIDENCIAS VERIFICADAS</div>
                  <div className="text-2xl font-black text-white mt-1">{evidences.length} SESIONES</div>
                  <div className="text-[11px] text-amber-400 mt-1">HISTORIAL INMUTABLE</div>
                </div>
              </div>
            </ForgeCard>
          </SpineNode>

        </LeftAnchorSpine>

        {/* PERMANENT BOTTOM NAVIGATION BAR */}
        <ForgeBottomNav activeHref="/profile" />

      </ForgeContainer>
    </ForgePage>
  );
}
