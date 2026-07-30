import React from 'react';
import { ForgeCard } from '../primitives/ForgeCard';
import { ForgeBadge } from '../primitives/ForgeBadge';
import { ForgeText } from '../primitives/ForgeText';
import { cn } from '../utils/cn';

export interface LastEvidenceCardProps {
  title: string;
  timestamp: string;
  volume: string;
  duration: string;
  xp: string;
  pr?: string;
  className?: string;
}

export const LastEvidenceCard: React.FC<LastEvidenceCardProps> = ({
  title,
  timestamp,
  volume,
  duration,
  xp,
  pr,
  className,
}) => {
  return (
    <ForgeCard glowColor="emerald" className={cn('p-6 md:p-8', className)}>
      <div className="flex justify-between items-center mb-4">
        <ForgeBadge variant="emerald">⚡ ÚLTIMA EVIDENCIA GRABADA</ForgeBadge>
        <span className="text-[11px] font-mono text-zinc-500">{timestamp}</span>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-lg font-black text-white tracking-wide uppercase m-0">{title}</h3>
          <ForgeText level="level4" className="text-zinc-500 mt-1">DURACIÓN: {duration}</ForgeText>
        </div>

        <div className="text-right font-mono">
          <div className="text-2xl font-black text-white">{volume}</div>
          <div className="text-xs text-emerald-400 font-bold mt-0.5">{xp}</div>
        </div>
      </div>

      {pr && (
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
          <span className="text-xs font-mono font-extrabold text-emerald-400">🏆 MARCA CONQUISTADA: {pr}</span>
        </div>
      )}
    </ForgeCard>
  );
};
