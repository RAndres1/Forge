import React from 'react';
import { ForgeBadge } from '../primitives/ForgeBadge';
import { cn } from '../utils/cn';

export interface RankBadgeHUDProps {
  rankName: string;
  totalXp: number;
  className?: string;
}

export const RankBadgeHUD: React.FC<RankBadgeHUDProps> = ({ rankName, totalXp, className }) => {
  return (
    <div
      className={cn(
        'bg-[#0c0c10]/80 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl px-6 py-4 text-right shadow-[0_0_35px_rgba(0,240,255,0.12),inset_0_1px_0_rgba(255,255,255,0.1)]',
        className
      )}
    >
      <div className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase mb-1">
        ATHLETE RANKING
      </div>
      <div className="text-2xl font-black tracking-wider text-cyan-400 font-sans">
        🏅 {rankName.toUpperCase()}
      </div>
      <div className="text-xs font-mono font-extrabold text-emerald-400 mt-1">
        {totalXp.toLocaleString()} XP
      </div>
    </div>
  );
};
