export const forgeTypography = {
  level0: {
    fontSize: '56px',
    fontWeight: '900',
    letterSpacing: '-0.04em',
    lineHeight: '1.0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif',
  },
  level1: {
    fontSize: '36px',
    fontWeight: '900',
    letterSpacing: '-0.02em',
    lineHeight: '1.1',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif',
  },
  level2: {
    fontSize: '18px',
    fontWeight: '800',
    letterSpacing: '0.02em',
    lineHeight: '1.3',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif',
  },
  level3: {
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0em',
    lineHeight: '1.5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif',
  },
  level4: {
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.15em',
    lineHeight: '1.2',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    textTransform: 'uppercase',
  },
} as const;

export type ForgeTypographyLevel = keyof typeof forgeTypography;
