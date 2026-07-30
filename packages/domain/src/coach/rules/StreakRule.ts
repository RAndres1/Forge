import { CoachRule, CoachRecommendation, AthleteContext } from '../types/CoachTypes';

export class StreakRule implements CoachRule {
  readonly ruleId = 'RULE_005_STREAK';

  evaluate(context: AthleteContext): CoachRecommendation | null {
    const ws = context.weeklyStreak;
    if (!ws) return null;

    const isBehind = ws.completedSessionsCount < ws.targetSessionsCount;
    const isTimeRunningOut = ws.hoursLeftInWeek <= 24;

    if (isBehind && isTimeRunningOut) {
      return {
        ruleId: this.ruleId,
        title: 'Tu racha semanal está en riesgo',
        message: 'Quedan menos de 24 horas para completar tu cuota de constancia.',
        reason: `Sesiones: ${ws.completedSessionsCount}/${ws.targetSessionsCount} completadas con ${ws.hoursLeftInWeek}h restantes.`,
        confidence: 0.96,
        priority: 'critical',
        cta: 'Iniciar sesión rápida (25m)',
        evidence: [
          `Falta 1 sesión para proteger racha`,
          `Tiempo límite: ${ws.hoursLeftInWeek} horas`,
          'Preservación de estatus en Pasaporte',
        ],
      };
    }

    return null;
  }
}
