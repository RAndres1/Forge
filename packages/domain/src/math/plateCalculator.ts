export interface PlateConfig {
  weightKg: number;
  colorHex: string;
  countPerSide: number;
}

export interface PlateCalculationResult {
  targetWeightKg: number;
  barWeightKg: number;
  weightPerSideKg: number;
  isExactMatch: boolean;
  remainderKg: number;
  platesPerSide: PlateConfig[];
}

export const STANDARD_OLYMPIC_PLATES = [
  { weightKg: 25, colorHex: '#ef4444' }, // Red
  { weightKg: 20, colorHex: '#3b82f6' }, // Blue
  { weightKg: 15, colorHex: '#eab308' }, // Yellow
  { weightKg: 10, colorHex: '#22c55e' }, // Green
  { weightKg: 5, colorHex: '#ffffff' },  // White
  { weightKg: 2.5, colorHex: '#71717a' },// Grey/Black
  { weightKg: 1.25, colorHex: '#a855f7' },// Micro Purple
];

/**
 * Calculates exact plates required per side for a target barbell weight
 */
export function calculateBarbellPlates(
  targetTotalWeightKg: number,
  barWeightKg: number = 20
): PlateCalculationResult {
  if (targetTotalWeightKg <= barWeightKg) {
    return {
      targetWeightKg: Math.max(0, targetTotalWeightKg),
      barWeightKg,
      weightPerSideKg: 0,
      isExactMatch: targetTotalWeightKg === barWeightKg,
      remainderKg: 0,
      platesPerSide: [],
    };
  }

  const weightToLoad = targetTotalWeightKg - barWeightKg;
  let remainingPerSide = weightToLoad / 2;

  const resultPlates: PlateConfig[] = [];

  for (const plate of STANDARD_OLYMPIC_PLATES) {
    if (remainingPerSide >= plate.weightKg) {
      const count = Math.floor(remainingPerSide / plate.weightKg);
      resultPlates.push({
        weightKg: plate.weightKg,
        colorHex: plate.colorHex,
        countPerSide: count,
      });
      remainingPerSide = Number((remainingPerSide - count * plate.weightKg).toFixed(2));
    }
  }

  return {
    targetWeightKg: targetTotalWeightKg,
    barWeightKg,
    weightPerSideKg: Number(((targetTotalWeightKg - barWeightKg) / 2).toFixed(2)),
    isExactMatch: remainingPerSide === 0,
    remainderKg: remainingPerSide * 2, // Total unmatched weight across both sides
    platesPerSide: resultPlates,
  };
}
