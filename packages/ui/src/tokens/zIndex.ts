export const forgeZIndex = {
  base: 0,
  card: 10,
  floating: 20,
  navbar: 50,
  modal: 100,
  tooltip: 200,
} as const;

export const forgeBlur = {
  subtle: 'blur(16px)',
  glass: 'blur(32px)',
} as const;

export const forgeBorders = {
  hairline: '1px solid rgba(255, 255, 255, 0.07)',
  subtle: '1px solid rgba(255, 255, 255, 0.12)',
  activeCyan: '1px solid rgba(0, 240, 255, 0.3)',
  activeEmerald: '1px solid rgba(0, 255, 157, 0.3)',
  activeAmber: '1px solid rgba(255, 170, 0, 0.3)',
} as const;
