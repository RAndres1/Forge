import React from 'react';
import { cn } from '../utils/cn';

export interface LeftAnchorSpineProps {
  children: React.ReactNode;
  className?: string;
}

export interface SpineNodeProps {
  indexLabel: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

export const LeftAnchorSpine: React.FC<LeftAnchorSpineProps> = ({ children, className }) => {
  return (
    <div className={cn('relative pl-8 border-l-2 border-white/[0.08]', className)}>
      {children}
    </div>
  );
};

export const SpineNode: React.FC<SpineNodeProps> = ({
  indexLabel,
  children,
  isActive = false,
  className,
}) => {
  return (
    <div className={cn('relative mb-12 last:mb-0', className)}>
      {/* 6px x 6px Square Tactical Node */}
      <div
        className={cn(
          'absolute -left-[37px] top-1.5 w-3 h-3 border flex items-center justify-center bg-[#030305] transition-all duration-300',
          isActive
            ? 'border-cyan-400 bg-cyan-400/20 shadow-[0_0_12px_rgba(0,240,255,0.8)]'
            : 'border-zinc-700 bg-zinc-900'
        )}
      >
        <div className={cn('w-1 h-1', isActive ? 'bg-cyan-400' : 'bg-zinc-500')} />
      </div>

      {/* Micro Index Tag */}
      <div className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 mb-2 uppercase">
        {indexLabel}
      </div>

      {children}
    </div>
  );
};
