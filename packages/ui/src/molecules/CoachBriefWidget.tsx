import React from 'react';
import { ForgeCard } from '../primitives/ForgeCard';
import { ForgeBadge } from '../primitives/ForgeBadge';
import { ForgeText } from '../primitives/ForgeText';
import { cn } from '../utils/cn';

export interface CoachBriefWidgetProps {
  adviceText: string;
  targetExercise?: string;
  suggestedAction?: string;
  className?: string;
}

export const CoachBriefWidget: React.FC<CoachBriefWidgetProps> = ({
  adviceText,
  targetExercise,
  suggestedAction,
  className,
}) => {
  return (
    <ForgeCard glowColor="violet" className={cn('p-6 md:p-8 relative overflow-hidden', className)}>
      <div className="flex items-center gap-2 mb-3">
        <ForgeBadge variant="violet">🧠 ASESOR TÁCTICO</ForgeBadge>
        <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase">RECOMENDACIÓN DEL DÍA</span>
      </div>

      <ForgeText level="level3" className="text-white font-bold text-base md:text-lg leading-relaxed m-0">
        "{adviceText}"
      </ForgeText>

      {(targetExercise || suggestedAction) && (
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs">
          {targetExercise && <span className="text-zinc-400">OBJETIVO: <strong className="text-white">{targetExercise}</strong></span>}
          {suggestedAction && <span className="text-purple-400 font-bold">{suggestedAction}</span>}
        </div>
      )}
    </ForgeCard>
  );
};
