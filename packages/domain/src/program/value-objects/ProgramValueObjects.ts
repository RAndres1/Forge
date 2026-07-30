export class ProgramId {
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('ProgramId cannot be empty');
    }
  }

  static generate(): ProgramId {
    return new ProgramId(`prog_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
  }
}

export class RoutineId {
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('RoutineId cannot be empty');
    }
  }

  static generate(): RoutineId {
    return new RoutineId(`rot_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
  }
}
