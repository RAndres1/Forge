export class WorkoutId {
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('WorkoutId cannot be empty');
    }
  }

  static generate(): WorkoutId {
    return new WorkoutId(`wo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
  }
}

export class ExerciseId {
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('ExerciseId cannot be empty');
    }
  }
}

export class SetId {
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('SetId cannot be empty');
    }
  }

  static generate(): SetId {
    return new SetId(`set_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
  }
}

export class Weight {
  constructor(public readonly amountKg: number) {
    if (amountKg < 0.5 || amountKg > 450) {
      throw new Error('Weight must be between 0.5 kg and 450 kg');
    }
  }

  get amountLbs(): number {
    return Number((this.amountKg * 2.20462).toFixed(2));
  }
}

export class Repetitions {
  constructor(public readonly count: number) {
    if (count < 1 || count > 100 || !Number.isInteger(count)) {
      throw new Error('Repetitions must be an integer between 1 and 100');
    }
  }
}

export class Volume {
  constructor(public readonly totalKg: number) {
    if (totalKg < 0) {
      throw new Error('Volume cannot be negative');
    }
  }

  static fromSets(sets: { weightKg: number; reps: number; isCompleted: boolean }[]): Volume {
    const total = sets.reduce((sum, s) => sum + (s.isCompleted ? s.weightKg * s.reps : 0), 0);
    return new Volume(total);
  }
}

export class Duration {
  constructor(public readonly seconds: number) {
    if (seconds < 0 || seconds > 36000) {
      throw new Error('Duration seconds must be between 0 and 36,000 (10 hours)');
    }
  }

  get minutes(): number {
    return Math.ceil(this.seconds / 60);
  }
}

export class RestTime {
  constructor(public readonly seconds: number) {
    if (seconds < 0 || seconds > 1800) {
      throw new Error('RestTime must be between 0 and 1,800 seconds');
    }
  }
}

export class RPE {
  constructor(public readonly value: number) {
    if (value < 0 || value > 10) {
      throw new Error('RPE must be between 0 and 10');
    }
  }
}

export class RIR {
  constructor(public readonly value: number) {
    if (value < 0 || value > 5) {
      throw new Error('RIR must be between 0 and 5');
    }
  }
}
