export const forgeRadius = {
  subtle: '6px',
  interactive: '10px',
  container: '16px',
  slab: '24px',
  full: '9999px',
} as const;

export type ForgeRadiusKey = keyof typeof forgeRadius;
