import React from 'react';
import { cn } from '../utils/cn';

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export interface ForgeBottomNavProps {
  items?: NavItem[];
  activeHref?: string;
  onNavigate?: (href: string) => void;
  className?: string;
}

const defaultItems: NavItem[] = [
  { label: 'Home', href: '/', icon: '🏠' },
  { label: 'Programas', href: '/routines', icon: '📋' },
  { label: 'Train', href: '/train', icon: '🏋️' },
  { label: 'Progress', href: '/progress', icon: '📈' },
  { label: 'Perfil', href: '/profile', icon: '👤' },
];

export const ForgeBottomNav: React.FC<ForgeBottomNavProps> = ({
  items = defaultItems,
  activeHref = '/',
  onNavigate,
  className,
}) => {
  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 bg-[#09090b]/90 backdrop-blur-3xl border-t border-white/10 px-4 py-2 flex justify-around items-center max-w-[800px] mx-auto rounded-t-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.8)]',
        className
      )}
    >
      {items.map((item) => {
        const isActive = activeHref === item.href;
        return (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate(item.href);
              }
            }}
            className={cn(
              'flex flex-col items-center gap-1 no-underline px-3 py-1.5 rounded-xl transition-all duration-200 cursor-pointer select-none',
              isActive
                ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                : 'text-zinc-500 hover:text-zinc-300'
            )}
          >
            <span className="text-base">{item.icon}</span>
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
};
