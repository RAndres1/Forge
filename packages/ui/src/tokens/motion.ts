export const forgeMotion = {
  durationFast: 0.15,
  durationNormal: 0.25,
  durationSlow: 0.35,
  easingDefault: [0.16, 1, 0.3, 1], // ease-out inertial
  springButton: {
    stiffness: 400,
    damping: 25,
    mass: 0.8,
  },
  springCard: {
    stiffness: 300,
    damping: 30,
    mass: 1.0,
  },
} as const;
