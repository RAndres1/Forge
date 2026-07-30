import { describe, it, expect } from 'vitest';
import { calculateBarbellPlates } from './plateCalculator';

describe('Plate Calculator Engine', () => {
  it('calculates plates per side correctly for 100 kg on 20 kg bar', () => {
    // 100 kg total - 20 kg bar = 80 kg total plates => 40 kg per side (20kg x 2 = 40kg)
    const result = calculateBarbellPlates(100, 20);
    expect(result.weightPerSideKg).toBe(40);
    expect(result.isExactMatch).toBe(true);
    expect(result.platesPerSide).toHaveLength(1);
    expect(result.platesPerSide[0].weightKg).toBe(20);
    expect(result.platesPerSide[0].countPerSide).toBe(2);
  });

  it('calculates combination of plates for 82.5 kg on 20 kg bar', () => {
    // 82.5 kg total - 20 kg bar = 62.5 kg total plates => 31.25 kg per side
    // 31.25 kg per side => 25 kg x 1 + 5 kg x 1 + 1.25 kg x 1 = 31.25 kg
    const result = calculateBarbellPlates(82.5, 20);
    expect(result.weightPerSideKg).toBe(31.25);
    expect(result.isExactMatch).toBe(true);
    expect(result.platesPerSide[0].weightKg).toBe(25);
    expect(result.platesPerSide[0].countPerSide).toBe(1);
    expect(result.platesPerSide[1].weightKg).toBe(5);
    expect(result.platesPerSide[1].countPerSide).toBe(1);
    expect(result.platesPerSide[2].weightKg).toBe(1.25);
    expect(result.platesPerSide[2].countPerSide).toBe(1);
  });
});
