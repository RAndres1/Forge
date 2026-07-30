import { CoachRule, CoachRecommendation, AthleteContext } from '../types/CoachTypes';

export class RestRule implements CoachRule {
  readonly ruleId = 'RULE_003_REST';

  evaluate(context: AthleteContext): CoachRecommendation | null {
    const lw = context.lastWorkout;
    if (!lw) return null;

    let restSeconds = 90;
    let description = 'Ejercicio de aislamiento o volumen medio';

    if (lw.isCompound && lw.isHeavy) {
      restSeconds = 180;
      description = 'Compuesto pesado de alta tensión mecánica';
    } else if (lw.isCompound) {
      restSeconds = 120;
      description = 'Compuesto multiarticular moderado';
    }

    return {
      ruleId: this.ruleId,
      title: `Descansa ${restSeconds} segundos`,
      message: `Pausa optimizada de ${restSeconds}s para resíntesis de ATP.`,
      reason: description,
      confidence: 0.98,
      priority: 'medium',
      cta: `Iniciar descanso (${restSeconds}s)`,
      evidence: [
        `Ejercicio: ${lw.exerciseName}`,
        `Tipo: ${lw.isCompound ? 'Compuesto' : 'Aislamiento'}`,
        `RPE alcanzado: ${lw.lastRpe}`,
      ],
    };
  }
}
