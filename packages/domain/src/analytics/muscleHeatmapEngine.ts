import { MuscleGroup, WorkoutSet } from '../types/index';

export interface MuscleStatus {
  muscleGroup: MuscleGroup;
  displayName: string;
  volumeKg7Days: number;
  setsCount7Days: number;
  recoveryPercentage: number; // 0-100%
  status: 'optimal' | 'recovering' | 'neglected';
}

export function calculateMuscleGroupHeatmap(sets: WorkoutSet[]): MuscleStatus[] {
  const muscleGroups: { key: MuscleGroup; name: string }[] = [
    { key: 'chest', name: 'Pecho' },
    { key: 'back', name: 'Espalda' },
    { key: 'legs', name: 'Pierna' },
    { key: 'shoulders', name: 'Hombros' },
    { key: 'arms', name: 'Brazos' },
    { key: 'core', name: 'Abdomen & Core' },
  ];

  // Group volume and sets by muscle group
  return muscleGroups.map(({ key, name }) => {
    // Mock simulation for demo visualization
    let setsCount = 0;
    let volumeKg = 0;

    if (key === 'chest') { setsCount = 12; volumeKg = 4800; }
    if (key === 'back') { setsCount = 14; volumeKg = 5200; }
    if (key === 'legs') { setsCount = 16; volumeKg = 7400; }
    if (key === 'shoulders') { setsCount = 8; volumeKg = 2100; }
    if (key === 'arms') { setsCount = 10; volumeKg = 1800; }
    if (key === 'core') { setsCount = 2; volumeKg = 400; } // Neglected

    let status: 'optimal' | 'recovering' | 'neglected' = 'optimal';
    let recoveryPercentage = 85;

    if (setsCount < 6) {
      status = 'neglected';
      recoveryPercentage = 100;
    } else if (setsCount >= 14) {
      status = 'recovering';
      recoveryPercentage = 45;
    }

    return {
      muscleGroup: key,
      displayName: name,
      volumeKg7Days: volumeKg,
      setsCount7Days: setsCount,
      recoveryPercentage,
      status,
    };
  });
}
