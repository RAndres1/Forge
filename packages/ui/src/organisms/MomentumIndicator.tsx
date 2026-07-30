import React from 'react';
import { ForgeCard } from '../primitives/ForgeCard';
import { ForgeBadge } from '../primitives/ForgeBadge';
import { ForgeHeading, ForgeText } from '../primitives/ForgeText';
import { cn } from '../utils/cn';

export interface MomentumIndicatorProps {
  momentumIndex: number;
  streakWeeks: number;
  statusLabel?: string;
  className?: string;
}

export const MomentumIndicator: React.FC<MomentumIndicatorProps> = ({
  momentumIndex,
  streakWeeks,
  statusLabel = 'UNSTOPPABLE STREAK',
  className,
}) => {
  return (
    <ForgeCard glowColor="amber" className={cn('p-8', className)}>
      <ForgeText level="level4" className="text-zinc-500 mb-2">MOMENTUM VECTOR</ForgeText>
      
      <div className="flex items-baseline gap-3">
        <ForgeHeading level="level0" className="text-amber-400 font-mono">
          {momentumIndex}
        </ForgeHeading>
        <ForgeText level="level3" className="text-zinc-500 font-mono">/ 100</ForgeText>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <ForgeBadge variant="amber">🔥 {streakWeeks} WEEKS ACTIVE</ForgeBadge>
        <ForgeText level="level4" className="text-amber-400 font-bold">{statusLabel}</ForgeText>
      </div>
    </ForgeCard>
  );
};
