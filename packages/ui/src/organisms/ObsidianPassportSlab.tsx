import React from 'react';
import { ForgeBadge } from '../primitives/ForgeBadge';
import { ForgeProgressBar } from '../primitives/ForgeProgressBar';
import { cn } from '../utils/cn';

export interface ObsidianPassportSlabProps {
  athleteName: string;
  athleteId: string;
  currentRank: string;
  nextRank: string | null;
  totalXp: number;
  progressPercentage: number;
  momentumIndex: number;
  className?: string;
}

export const ObsidianPassportSlab: React.FC<ObsidianPassportSlabProps> = ({
  athleteName,
  athleteId,
  currentRank,
  nextRank,
  totalXp,
  progressPercentage,
  momentumIndex,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative bg-[#0c0c10]/80 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_32px_64px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(0,240,255,0.15)]',
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
            <span className="text-[11px] font-mono text-zinc-500 font-bold tracking-widest">{athleteId}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase font-sans">
            {athleteName}
          </h2>
        </div>

        {/* RANK BADGE HUD */}
        <div className="text-right bg-zinc-900/80 border border-cyan-500/30 rounded-2xl px-5 py-3 shadow-[0_0_25px_rgba(0,240,255,0.15)]">
          <div className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">TIER STATUS</div>
          <div className="text-xl font-black text-cyan-400 tracking-wider">🏅 {currentRank.toUpperCase()}</div>
          <div className="text-xs font-mono font-extrabold text-emerald-400 mt-0.5">{totalXp.toLocaleString()} XP</div>
        </div>
      </div>

      {/* FOOTER STATS & PROGRESS */}
      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-zinc-500 tracking-widest uppercase">MOMENTUM INDEX</span>
            <div className="text-2xl font-black text-amber-400 font-mono">{momentumIndex} <span className="text-xs text-zinc-500">/ 100</span></div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono font-bold text-zinc-500 tracking-widest uppercase">NEXT TIER</span>
            <div className="text-sm font-bold text-white uppercase">{nextRank || 'MAX TIER'}</div>
          </div>
        </div>

        <ForgeProgressBar
          progressPercentage={progressPercentage}
          labelLeft="XP LEVEL PROGRESSION"
          labelRight={`${progressPercentage}%`}
        />
      </div>
    </div>
  );
};
