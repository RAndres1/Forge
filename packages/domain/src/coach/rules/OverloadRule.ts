import { CoachRule, CoachRecommendation, AthleteContext } from '../types/CoachTypes';

export class OverloadRule implements CoachRule {
  readonly ruleId = 'RULE_001_OVERLOAD';

  evaluate(context: AthleteContext): CoachRecommendation | null {
    const lw = context.lastWorkout;
    if (!lw) return null;

    if (lw.targetCompleted && lw.lastRpe < 8.5) {
      return {
        ruleId: this.ruleId,
        title: 'Incrementa +2.5 kg',
        message: `Puedes aumentar el peso inicial en ${lw.exerciseName}.`,
        reason: `RPE medio (${lw.lastRpe}) inferior a 8.5 con objetivo completado.`,
        confidence: 0.95,
        priority: 'high',
        cta: 'Aplicar incremento (+2.5 kg)',
        evidence: [
          `Último RPE: ${lw.lastRpe}`,
          `Repeticiones completadas: ${lw.achievedReps}/${lw.targetReps}`,
          'Capacidad muscular de sobrecarga verificada',
        ],
      };
    }

    return null;
  }
}
