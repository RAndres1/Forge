import { CoachRule, CoachRecommendation, AthleteContext } from '../types/CoachTypes';
import { WorkoutEngineServices } from '../../workout/use-cases/WorkoutEngineServices';

export class PRRule implements CoachRule {
  readonly ruleId = 'RULE_004_PR';

  evaluate(context: AthleteContext): CoachRecommendation | null {
    const lw = context.lastWorkout;
    if (!lw) return null;

    const prResult = WorkoutEngineServices.calculatePR(
      lw.previousBest1RM,
      lw.weightKg,
      lw.achievedReps
    );

    if (prResult.isNewPR) {
      return {
        ruleId: this.ruleId,
        title: 'Nuevo récord personal (PR)',
        message: `Has superado tu $1RM$ histórico en ${lw.exerciseName}.`,
        reason: `Nuevo 1RM estimado: ${prResult.new1RM} kg (Anterior: ${lw.previousBest1RM} kg).`,
        confidence: 0.99,
        priority: 'critical',
        cta: 'Grabar récord en expediente',
        evidence: [
          `Carga ejecutada: ${lw.weightKg} kg × ${lw.achievedReps} reps`,
          `Fórmula Epley 1RM: ${prResult.new1RM} kg`,
          `Incremento: +${prResult.new1RM - lw.previousBest1RM} kg`,
        ],
      };
    }

    return null;
  }
}
