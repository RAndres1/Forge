import React from 'react';
import { cn } from '../utils/cn';

export interface ForgeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: 'cyan' | 'emerald' | 'amber' | 'violet' | 'none';
  isInteractive?: boolean;
}

export const ForgeCard: React.FC<ForgeCardProps> = ({
  children,
  className,
  glowColor = 'none',
  isInteractive = false,
  style,
  ...props
}) => {
  const getGlowStyle = () => {
    switch (glowColor) {
      case 'cyan':
        return 'border-cyan-500/30 shadow-[0_0_35px_rgba(0,240,255,0.12)]';
      case 'emerald':
        return 'border-emerald-500/30 shadow-[0_0_35px_rgba(0,255,157,0.12)]';
      case 'amber':
        return 'border-amber-500/30 shadow-[0_0_35px_rgba(255,170,0,0.12)]';
      case 'violet':
        return 'border-purple-500/30 shadow-[0_0_35px_rgba(112,0,255,0.12)]';
      default:
        return 'border-white/10';
    }
  };

  return (
    <div
      className={cn(
        'bg-[#0c0c10]/70 backdrop-blur-2xl border rounded-2xl p-6 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]',
        getGlowStyle(),
        isInteractive && 'hover:-translate-y-0.5 hover:border-white/20 cursor-pointer',
        className
      )}
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
