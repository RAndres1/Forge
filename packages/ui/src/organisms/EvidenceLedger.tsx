import React from 'react';
import { ForgeCard } from '../primitives/ForgeCard';
import { ForgeBadge } from '../primitives/ForgeBadge';
import { ForgeHeading, ForgeText } from '../primitives/ForgeText';
import { cn } from '../utils/cn';

export interface EvidenceItem {
  id: string;
  title: string;
  timestamp: string;
  duration: string;
  volume: string;
  xp: string;
  pr?: string;
}

export interface EvidenceLedgerProps {
  evidences: EvidenceItem[];
  className?: string;
}

export const EvidenceLedger: React.FC<EvidenceLedgerProps> = ({ evidences, className }) => {
  return (
    <ForgeCard className={cn('p-8 md:p-10', className)}>
      <ForgeHeading level="level2" className="mb-8 tracking-wider">
        VERIFIED EVIDENCES LOG
      </ForgeHeading>

      <div className="flex flex-col gap-4">
        {evidences.map((ev) => (
          <div
            key={ev.id}
            className="flex flex-col md:flex-row md:items-center justify-between bg-zinc-900/40 border border-white/5 rounded-2xl p-6 transition-all duration-200 hover:border-white/10"
          >
            <div>
              <ForgeText level="level3" className="font-extrabold text-white tracking-wide">{ev.title}</ForgeText>
              <ForgeText level="level4" className="text-zinc-500 mt-1.5">
                DURATION: {ev.duration} &nbsp;|&nbsp; TIMESTAMP: {ev.timestamp}
              </ForgeText>
            </div>

            <div className="flex items-center gap-6 mt-4 md:mt-0">
              {ev.pr && <ForgeBadge variant="emerald">⚡ {ev.pr}</ForgeBadge>}
              <div className="text-right">
                <div className="text-lg font-black text-white font-mono">{ev.volume}</div>
                <ForgeText level="level4" className="text-emerald-400 font-bold mt-0.5">{ev.xp}</ForgeText>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ForgeCard>
  );
};
