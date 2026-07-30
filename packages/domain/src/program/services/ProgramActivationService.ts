import { ProgramAggregate } from '../entities/ProgramAggregate';

export class ProgramActivationService {
  static activateProgram(targetProgramIdStr: string, allPrograms: ProgramAggregate[]): ProgramAggregate[] {
    return allPrograms.map((prog) => {
      if (prog.id.value === targetProgramIdStr) {
        prog.activate();
      } else {
        prog.deactivate();
      }
      return prog;
    });
  }
}
