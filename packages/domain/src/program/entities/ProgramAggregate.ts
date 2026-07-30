import { ProgramId } from '../value-objects/ProgramValueObjects';
import { RoutineEntity } from './RoutineEntity';

export class ProgramAggregate {
  public readonly id: ProgramId;
  public title: string;
  public isActive: boolean;
  public routines: RoutineEntity[];
  public version: number;

  constructor(id: ProgramId, title: string, isActive: boolean = false, routines: RoutineEntity[] = [], version: number = 1) {
    this.id = id;
    this.title = title;
    this.isActive = isActive;
    this.routines = routines;
    this.version = version;
  }

  static create(title: string): ProgramAggregate {
    return new ProgramAggregate(ProgramId.generate(), title, false, [], 1);
  }

  activate(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }

  addRoutine(routine: RoutineEntity): void {
    this.routines.push(routine);
    this.version++;
  }

  removeRoutine(routineIdStr: string): void {
    this.routines = this.routines.filter((r) => r.id.value !== routineIdStr);
    this.version++;
  }
}
