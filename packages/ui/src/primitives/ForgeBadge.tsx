import React from 'react';
import { cn } from '../utils/cn';

export interface ForgeBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'cyan' | 'emerald' | 'amber' | 'violet' | 'neutral';
}

export const ForgeBadge: React.FC<ForgeBadgeProps> = ({
  children,
  className,
  variant = 'cyan',
  style,
  ...props
}: ForgeBadgeProps) => {
  const variantStyles: Record<'cyan' | 'emerald' | 'amber' | 'violet' | 'neutral', string> = {
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    violet: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    neutral: 'bg-zinc-800/50 text-zinc-400 border-zinc-700/50',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-widest uppercase border',
        variantStyles[variant],
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </span>
  );
};
