import React from 'react';
import { cn } from '../utils/cn';

export interface ForgePageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ForgePage: React.FC<ForgePageProps> = ({ children, className, style, ...props }) => {
  return (
    <div
      className={cn('min-h-screen bg-[#030305] text-zinc-100 font-sans p-6 md:p-12 box-border', className)}
      style={{
        backgroundColor: '#030305',
        backgroundImage: `
          radial-gradient(circle at 50% -10%, rgba(0, 240, 255, 0.06) 0%, transparent 60%),
          radial-gradient(circle at 100% 100%, rgba(112, 0, 255, 0.04) 0%, transparent 50%)
        `,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export interface ForgeContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ForgeContainer: React.FC<ForgeContainerProps> = ({ children, className, style, ...props }) => {
  return (
    <div
      className={cn('max-w-[1280px] mx-auto w-full', className)}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export interface ForgeSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const ForgeSection: React.FC<ForgeSectionProps> = ({ children, className, style, ...props }) => {
  return (
    <section
      className={cn('mb-14 last:mb-0', className)}
      style={style}
      {...props}
    >
      {children}
    </section>
  );
};

export interface ForgeStackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: 'column' | 'row';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ForgeStack: React.FC<ForgeStackProps> = ({
  children,
  direction = 'column',
  gap = 'md',
  className,
  style,
  ...props
}) => {
  const gapStyles = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  return (
    <div
      className={cn(
        'flex',
        direction === 'column' ? 'flex-col' : 'flex-row items-center',
        gapStyles[gap],
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};
