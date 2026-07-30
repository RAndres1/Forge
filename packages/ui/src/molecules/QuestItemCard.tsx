import React from 'react';
import { ForgeBadge } from '../primitives/ForgeBadge';
import { cn } from '../utils/cn';

export interface QuestItemCardProps {
  title: string;
  description: string;
  xpReward: number;
  isCompleted?: boolean;
  className?: string;
}

export const QuestItemCard: React.FC<QuestItemCardProps> = ({
  title,
  description,
  xpReward,
  isCompleted = false,
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-zinc-900/50 border border-white/5 rounded-xl p-4 border-l-4 transition-all duration-200',
        isCompleted ? 'border-l-emerald-500 bg-emerald-950/10' : 'border-l-cyan-400',
        className
      )}
    >
      <div className="flex justify-between items-center">
        <span className="font-extrabold text-sm tracking-wide text-white uppercase">{title}</span>
        <ForgeBadge variant={isCompleted ? 'emerald' : 'cyan'}>+{xpReward} XP</ForgeBadge>
      </div>
      <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">{description}</p>
    </div>
  );
};
