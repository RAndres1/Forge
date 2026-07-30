import React from 'react';
import { cn } from '../utils/cn';

export interface ForgeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

export const ForgeInput: React.FC<ForgeInputProps> = ({ label, errorMessage, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 font-mono text-xs">
      {label && <label className="text-zinc-400 font-bold uppercase tracking-wider">{label}</label>}
      <input
        className={cn(
          'bg-[#09090b] text-white border border-white/10 rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:border-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed',
          errorMessage && 'border-rose-500/80 text-rose-400 focus:border-rose-500',
          className
        )}
        {...props}
      />
      {errorMessage && <span className="text-[11px] text-rose-400 font-bold">{errorMessage}</span>}
    </div>
  );
};
