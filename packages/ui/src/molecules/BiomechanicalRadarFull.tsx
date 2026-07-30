import React from 'react';
import { ForgeCard } from '../primitives/ForgeCard';
import { ForgeBadge } from '../primitives/ForgeBadge';
import { ForgeText } from '../primitives/ForgeText';
import { cn } from '../utils/cn';

export interface MuscleGroupDensity {
  name: string;
  volumeKg: number;
  setsCount: number;
  status: 'optimal' | 'fatigued' | 'neglected';
}

export interface BiomechanicalRadarFullProps {
  muscles: MuscleGroupDensity[];
  className?: string;
}

export const BiomechanicalRadarFull: React.FC<BiomechanicalRadarFullProps> = ({ muscles, className }) => {
  return (
    <ForgeCard glowColor="cyan" className={cn('p-6 md:p-8', className)}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <ForgeBadge variant="cyan" className="mb-1">🗺️ RADAR BIOMECÁNICO (30 DÍAS)</ForgeBadge>
          <ForgeText level="level4" className="text-zinc-500">TELEMETRÍA DE DENSIDAD DE SOBRECARGA</ForgeText>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {muscles.map((m, idx) => (
          <div
            key={idx}
            className={cn(
              'p-4 rounded-xl border font-mono transition-all',
              m.status === 'optimal'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : m.status === 'fatigued'
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-zinc-900/60 border-white/5 text-zinc-500'
            )}
          >
            <div className="text-xs font-bold text-white uppercase">{m.name}</div>
            <div className="text-sm font-black mt-2">{m.volumeKg.toLocaleString()} KG</div>
            <div className="text-[10px] text-zinc-400 mt-1">{m.setsCount} SERIES</div>
          </div>
        ))}
      </div>
    </ForgeCard>
  );
};
