import React from 'react';
import { ForgeCard } from '../primitives/ForgeCard';
import { cn } from '../utils/cn';

export interface StatTileProps {
  label: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  glowColor?: 'cyan' | 'emerald' | 'amber' | 'violet' | 'none';
  className?: string;
}

export const StatTile: React.FC<StatTileProps> = ({
  label,
  value,
  unit,
  subtext,
  trend,
  trendDirection = 'up',
  glowColor = 'none',
  className,
}) => {
  return (
    <ForgeCard glowColor={glowColor} className={cn('p-6', className)}>
      <div className="text-[11px] font-mono font-bold tracking-widest text-zinc-500 uppercase">{label}</div>
      <div className="text-4xl font-black tracking-tight text-white mt-3 font-sans">
        {value} {unit && <span className="text-lg font-mono font-semibold text-zinc-500">{unit}</span>}
      </div>
      {trend && (
        <div
          className={cn(
            'text-xs font-mono font-bold mt-2.5 flex items-center gap-1.5 tracking-wide',
            trendDirection === 'up' ? 'text-emerald-400' : trendDirection === 'down' ? 'text-rose-400' : 'text-zinc-400'
          )}
        >
          <span>{trendDirection === 'up' ? '▲' : trendDirection === 'down' ? '▼' : '●'}</span>
          {trend}
        </div>
      )}
      {subtext && !trend && <div className="text-xs text-zinc-400 font-medium mt-2.5">{subtext}</div>}
    </ForgeCard>
  );
};
