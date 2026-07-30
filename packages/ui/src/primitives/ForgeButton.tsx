import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-bold tracking-wider uppercase transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-cyan-400 text-black hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.4)]',
        tactical: 'bg-zinc-900 text-zinc-100 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800',
        glow: 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_25px_rgba(0,255,157,0.4)]',
        amber: 'bg-amber-500 text-black hover:bg-amber-400 shadow-[0_0_25px_rgba(255,170,0,0.4)]',
        ghost: 'bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-900/50',
        danger: 'bg-rose-600 text-white hover:bg-rose-500 shadow-[0_0_20px_rgba(255,0,85,0.4)]',
      },
      size: {
        sm: 'px-3 py-1.5 text-xs rounded-md',
        md: 'px-5 py-2.5 text-xs rounded-lg',
        lg: 'px-7 py-3.5 text-sm rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ForgeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const ForgeButton = React.forwardRef<HTMLButtonElement, ForgeButtonProps>(
  ({ className, variant, size, isLoading, children, style, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif',
          letterSpacing: '1px',
          ...style,
        }}
        {...props}
      >
        {isLoading ? 'LOADING...' : children}
      </button>
    );
  }
);

ForgeButton.displayName = 'ForgeButton';
