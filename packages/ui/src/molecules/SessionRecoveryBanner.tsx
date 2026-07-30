import React from 'react';
import { ForgeCard } from '../primitives/ForgeCard';
import { ForgeBadge } from '../primitives/ForgeBadge';
import { ForgeButton } from '../primitives/ForgeButton';

export interface SessionRecoveryBannerProps {
  exerciseName: string;
  weightKg: number;
  reps: number;
  setsCount: number;
  onRecover: () => void;
  onDiscard: () => void;
}

export const SessionRecoveryBanner: React.FC<SessionRecoveryBannerProps> = ({
  exerciseName,
  weightKg,
  reps,
  setsCount,
  onRecover,
  onDiscard,
}) => {
  return (
    <ForgeCard glowColor="amber" className="p-6 border-amber-500/50 bg-amber-500/10 mb-8 animate-pulse">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <ForgeBadge variant="amber" className="mb-1">🚨 ENTRENAMIENTO EN CURSO DETECTADO</ForgeBadge>
          <h3 className="text-lg font-black text-white uppercase m-0">{exerciseName} ({weightKg} KG × {reps} REPS)</h3>
          <p className="text-xs font-mono text-zinc-400 m-0 mt-1">
            Se ha interrumpido una sesión previamente activa ({setsCount} series pendientes).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ForgeButton variant="ghost" size="sm" onClick={onDiscard}>
            DESCHARTAR
          </ForgeButton>
          <ForgeButton variant="glow" size="sm" onClick={onRecover}>
            ⚡ RECUPERAR SESIÓN
          </ForgeButton>
        </div>
      </div>
    </ForgeCard>
  );
};
