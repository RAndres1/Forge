import React from 'react';
import { ForgeCard } from '../primitives/ForgeCard';
import { ForgeBadge } from '../primitives/ForgeBadge';
import { ForgeProgressBar } from '../primitives/ForgeProgressBar';
import { ForgeHeading, ForgeText } from '../primitives/ForgeText';
import { cn } from '../utils/cn';

export interface PassportCredentialProps {
  athleteName: string;
  athleteId: string;
  currentRank: string;
  nextRank: string | null;
  totalXp: number;
  progressPercentage: number;
  className?: string;
}

export const PassportCredential: React.FC<PassportCredentialProps> = ({
  athleteName,
  athleteId,
  currentRank,
  nextRank,
  totalXp,
  progressPercentage,
  className,
}) => {
  return (
    <ForgeCard
      glowColor="cyan"
      className={cn(
        'relative overflow-hidden transition-all duration-300 hover:border-cyan-500/40 p-8 md:p-10',
        className
      )}
      style={{
        aspectRatio: '1.58 / 1',
        minHeight: '280px',
      }}
    >
      {/* TOP SPECULAR RIM HIGHLIGHT */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* HEADER ROW */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ForgeBadge variant="emerald">● SYSTEM OPERATIONAL</ForgeBadge>
            <ForgeText level="level4" className="text-zinc-500 font-bold">{athleteId}</ForgeText>
          </div>
          <ForgeHeading level="level1" className="uppercase tracking-tight">
            {athleteName}
          </ForgeHeading>
        </div>

        {/* RANK HUD BADGE */}
        <div className="text-right bg-zinc-900/80 border border-cyan-500/30 rounded-2xl px-5 py-3 shadow-[0_0_25px_rgba(0,240,255,0.15)]">
          <ForgeText level="level4" className="text-zinc-400 mb-0.5">TIER STATUS</ForgeText>
          <div className="text-xl font-black text-cyan-400 tracking-wider font-sans">🏅 {currentRank.toUpperCase()}</div>
          <ForgeText level="level4" className="text-emerald-400 font-extrabold mt-0.5">{totalXp.toLocaleString()} XP</ForgeText>
        </div>
      </div>

      {/* FOOTER PROGRESS */}
      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="flex justify-between items-center mb-4">
          <ForgeText level="level4" className="text-zinc-400">NEXT TIER</ForgeText>
          <ForgeText level="level3" className="text-white font-bold uppercase">{nextRank || 'MAX TIER'}</ForgeText>
        </div>

        <ForgeProgressBar
          progressPercentage={progressPercentage}
          labelLeft="XP LEVEL PROGRESSION"
          labelRight={`${progressPercentage}%`}
        />
      </div>
    </ForgeCard>
  );
};
