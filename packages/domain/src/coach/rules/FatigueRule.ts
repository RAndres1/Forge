import { CoachRule, CoachRecommendation, AthleteContext } from '../types/CoachTypes';

export class FatigueRule implements CoachRule {
  readonly ruleId = 'RULE_002_FATIGUE';

  evaluate(context: AthleteContext): CoachRecommendation | null {
    const lw = context.lastWorkout;
    if (!lw) return null;

    if (lw.achievedReps < lw.targetReps) {
      const reducedWeight = Number((lw.weightKg * 0.95).toFixed(1));
      return {
        ruleId: this.ruleId,
        title: 'Ajuste por fatiga concéntrica',
        message: `Reduce el peso un 5% (a ${reducedWeight} kg) para mantener volumen.`,
        reason: `Fallo prematuro en repetición ${lw.achievedReps} de ${lw.targetReps} prescritas.`,
        confidence: 0.92,
        priority: 'high',
        cta: `Reducir a ${reducedWeight} kg`,
        evidence: [
          `Repeticiones logradas: ${lw.achievedReps}/${lw.targetReps}`,
          'Fallo concéntrico detectado en serie activa',
          'Prevención de degradación de técnica',
        ],
      };
    }

    return null;
  }
}
