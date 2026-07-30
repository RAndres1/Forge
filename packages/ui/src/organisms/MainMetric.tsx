import React from 'react';
import { ForgeCard } from '../primitives/ForgeCard';
import { ForgeBadge } from '../primitives/ForgeBadge';
import { ForgeHeading, ForgeText } from '../primitives/ForgeText';
import { cn } from '../utils/cn';

export interface MainMetricProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  glowColor?: 'cyan' | 'emerald' | 'amber' | 'violet' | 'none';
  className?: string;
}

export const MainMetric: React.FC<MainMetricProps> = ({
  label,
  value,
  unit,
  trend,
  trendDirection = 'up',
  glowColor = 'cyan',
  className,
}) => {
  return (
    <ForgeCard glowColor={glowColor} className={cn('p-8', className)}>
      <ForgeText level="level4" className="text-zinc-500 mb-3">{label}</ForgeText>
      
      <div className="flex items-baseline gap-2">
        <ForgeHeading level="level0" className="tracking-tighter">
          {value}
        </ForgeHeading>
        {unit && <ForgeText level="level3" className="text-zinc-500 font-mono">{unit}</ForgeText>}
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-2">
          <ForgeBadge variant={trendDirection === 'up' ? 'emerald' : trendDirection === 'down' ? 'neutral' : 'cyan'}>
            {trendDirection === 'up' ? '▲' : trendDirection === 'down' ? '▼' : '●'} {trend}
          </ForgeBadge>
        </div>
      )}
    </ForgeCard>
  );
};
