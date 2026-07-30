import { SetId, Weight, Repetitions, RPE, RIR } from '../value-objects/WorkoutValueObjects';

export type WorkoutSetCategory = 'warmup' | 'working' | 'dropset' | 'failure';

export interface WorkoutSetProps {
  id: SetId;
  setType: WorkoutSetCategory;
  weight: Weight;
  reps: Repetitions;
  isCompleted: boolean;
  rpe?: RPE;
  rir?: RIR;
  tempo?: string; // e.g. "3-0-1-0"
}

export class WorkoutSetEntity {
  public readonly id: SetId;
  public setType: WorkoutSetCategory;
  public weight: Weight;
  public reps: Repetitions;
  public isCompleted: boolean;
  public rpe?: RPE;
  public rir?: RIR;
  public tempo?: string;

  constructor(props: WorkoutSetProps) {
    this.id = props.id;
    this.setType = props.setType;
    this.weight = props.weight;
    this.reps = props.reps;
    this.isCompleted = props.isCompleted;
    this.rpe = props.rpe;
    this.rir = props.rir;
    this.tempo = props.tempo;
  }

  static create(weightKg: number, reps: number, setType: WorkoutSetCategory = 'working', tempo?: string): WorkoutSetEntity {
    return new WorkoutSetEntity({
      id: SetId.generate(),
      setType,
      weight: new Weight(weightKg),
      reps: new Repetitions(reps),
      isCompleted: false,
      tempo,
    });
  }

  complete(): void {
    this.isCompleted = true;
  }

  adjust(weightKg: number, reps?: number): void {
    this.weight = new Weight(weightKg);
    if (reps !== undefined) {
      this.reps = new Repetitions(reps);
    }
  }

  get calculated1RM(): number {
    if (this.reps.count === 0) return 0;
    if (this.reps.count === 1) return this.weight.amountKg;
    // Epley Formula
    return Math.round(this.weight.amountKg * (1 + this.reps.count / 30));
  }
}
