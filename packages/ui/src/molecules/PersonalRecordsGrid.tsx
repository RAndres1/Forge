import React from 'react';
import { ForgeCard } from '../primitives/ForgeCard';
import { ForgeBadge } from '../primitives/ForgeBadge';
import { ForgeText } from '../primitives/ForgeText';
import { cn } from '../utils/cn';

export interface PersonalRecordItem {
  exerciseName: string;
  oneRepMaxKg: number;
  date: string;
  badge: string;
}

export interface PersonalRecordsGridProps {
  records: PersonalRecordItem[];
  className?: string;
}

export const PersonalRecordsGrid: React.FC<PersonalRecordsGridProps> = ({ records, className }) => {
  return (
    <ForgeCard glowColor="emerald" className={cn('p-6 md:p-8', className)}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <ForgeBadge variant="emerald" className="mb-1">🏆 RÉCORDS PERSONALES MÁXIMOS (1RM)</ForgeBadge>
          <ForgeText level="level4" className="text-zinc-500">CUADRO DE HONOR ESTRUCTURAL</ForgeText>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {records.map((r, idx) => (
          <div
            key={idx}
            className="bg-zinc-900/60 border border-emerald-500/30 rounded-xl p-5 flex justify-between items-center shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-emerald-400 transition-all"
          >
            <div>
              <ForgeText level="level3" className="font-extrabold text-white uppercase">{r.exerciseName}</ForgeText>
              <ForgeText level="level4" className="text-zinc-500 mt-1">{r.date}</ForgeText>
            </div>
            <div className="text-right font-mono">
              <div className="text-xl font-black text-emerald-400">{r.oneRepMaxKg} KG</div>
              <div className="text-[10px] text-zinc-400 font-bold mt-0.5">{r.badge}</div>
            </div>
          </div>
        ))}
      </div>
    </ForgeCard>
  );
};
