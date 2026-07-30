import React from 'react';
import { cn } from '../utils/cn';

export interface ForgeProgressBarProps {
  progressPercentage: number;
  labelLeft?: string;
  labelRight?: string;
  gradient?: 'cyan-purple' | 'emerald-cyan' | 'amber-orange';
  className?: string;
}

export const ForgeProgressBar: React.FC<ForgeProgressBarProps> = ({
  progressPercentage,
  labelLeft,
  labelRight,
  gradient = 'cyan-purple',
  className,
}: ForgeProgressBarProps) => {
  const gradientStyles: Record<'cyan-purple' | 'emerald-cyan' | 'amber-orange', string> = {
    'cyan-purple': 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_20px_rgba(0,240,255,0.6)]',
    'emerald-cyan': 'bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_20px_rgba(0,255,157,0.6)]',
    'amber-orange': 'bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_20px_rgba(255,170,0,0.6)]',
  };

  return (
    <div className={cn('w-full', className)}>
      {(labelLeft || labelRight) && (
        <div className="flex justify-between items-center mb-2.5 text-xs font-mono font-bold tracking-wider">
          {labelLeft && <span className="text-zinc-400">{labelLeft}</span>}
          {labelRight && <span className="text-cyan-400">{labelRight}</span>}
        </div>
      )}
      <div className="h-2.5 w-full bg-zinc-900/80 rounded-full overflow-hidden p-0.5 border border-white/5">
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', gradientStyles[gradient])}
          style={{ width: `${Math.min(100, Math.max(0, progressPercentage))}%` }}
        />
      </div>
    </div>
  );
};
