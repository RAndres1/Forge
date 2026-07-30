export interface DomainEvent {
  eventName: string;
  occurredOn: Date;
}

export class WorkoutStartedEvent implements DomainEvent {
  readonly eventName = 'WorkoutStarted';
  readonly occurredOn = new Date();

  constructor(
    public readonly workoutId: string,
    public readonly title: string
  ) {}
}

export class SetCompletedEvent implements DomainEvent {
  readonly eventName = 'SetCompleted';
  readonly occurredOn = new Date();

  constructor(
    public readonly workoutId: string,
    public readonly exerciseId: string,
    public readonly setId: string,
    public readonly weightKg: number,
    public readonly reps: number
  ) {}
}

export class PersonalRecordAchievedEvent implements DomainEvent {
  readonly eventName = 'PersonalRecordAchieved';
  readonly occurredOn = new Date();

  constructor(
    public readonly athleteId: string,
    public readonly exerciseId: string,
    public readonly exerciseName: string,
    public readonly previous1RM: number,
    public readonly new1RM: number
  ) {}
}

export class WorkoutFinishedEvent implements DomainEvent {
  readonly eventName = 'WorkoutFinished';
  readonly occurredOn = new Date();

  constructor(
    public readonly workoutId: string,
    public readonly totalVolumeKg: number,
    public readonly totalDurationSeconds: number,
    public readonly totalXpEarned: number,
    public readonly title: string = 'Entrenamiento Realizado'
  ) {}
}

export class EvidenceGeneratedEvent implements DomainEvent {
  readonly eventName = 'EvidenceGenerated';
  readonly occurredOn = new Date();

  constructor(
    public readonly evidenceId: string,
    public readonly workoutTitle: string,
    public readonly volumeKg: number,
    public readonly prSummary?: string
  ) {}
}

export class PassportUpdatedEvent implements DomainEvent {
  readonly eventName = 'PassportUpdated';
  readonly occurredOn = new Date();

  constructor(
    public readonly athleteId: string,
    public readonly addedXp: number,
    public readonly addedVolumeKg: number,
    public readonly newRankName: string
  ) {}
}
