import React from 'react';
import { ForgeCard } from '../primitives/ForgeCard';
import { ForgeBadge } from '../primitives/ForgeBadge';
import { ForgeHeading } from '../primitives/ForgeText';
import { QuestItemCard } from '../molecules/QuestItemCard';
import { cn } from '../utils/cn';

export interface ProofTarget {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  isCompleted: boolean;
}

export interface NextProofProps {
  targets: ProofTarget[];
  totalAvailableXp: number;
  className?: string;
}

export const NextProof: React.FC<NextProofProps> = ({ targets, totalAvailableXp, className }) => {
  return (
    <ForgeCard glowColor="amber" className={cn('p-8', className)}>
      <div className="flex justify-between items-center mb-6">
        <ForgeHeading level="level2" className="text-amber-400 tracking-wider">
          🎯 DAILY DIRECTIVE PROTOCOLS
        </ForgeHeading>
        <ForgeBadge variant="amber">+{totalAvailableXp} XP AVAILABLE</ForgeBadge>
      </div>

      <div className="flex flex-col gap-4">
        {targets.map((target) => (
          <QuestItemCard
            key={target.id}
            title={target.title}
            description={target.description}
            xpReward={target.xpReward}
            isCompleted={target.isCompleted}
          />
        ))}
      </div>
    </ForgeCard>
  );
};
