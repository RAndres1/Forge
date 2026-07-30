import React from 'react';
import { forgeTypography, ForgeTypographyLevel } from '../tokens/typography';
import { cn } from '../utils/cn';

export interface ForgeTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  level?: 'level3' | 'level4';
  as?: 'p' | 'span' | 'div';
}

export const ForgeText: React.FC<ForgeTextProps> = ({
  children,
  level = 'level3',
  as: Component = 'p',
  className,
  style,
  ...props
}) => {
  const tokenStyles = forgeTypography[level];

  return (
    <Component
      className={cn('m-0 text-zinc-300', className)}
      style={{
        ...tokenStyles,
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export interface ForgeHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 'level0' | 'level1' | 'level2';
  as?: 'h1' | 'h2' | 'h3' | 'div';
}

export const ForgeHeading: React.FC<ForgeHeadingProps> = ({
  children,
  level = 'level1',
  as: Component = 'h1',
  className,
  style,
  ...props
}) => {
  const tokenStyles = forgeTypography[level];

  return (
    <Component
      className={cn('m-0 text-white', className)}
      style={{
        ...tokenStyles,
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};
