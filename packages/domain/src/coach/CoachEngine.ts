import { CoachRule, CoachRecommendation, AthleteContext, RecommendationPriority } from './types/CoachTypes';
import { OverloadRule } from './rules/OverloadRule';
import { FatigueRule } from './rules/FatigueRule';
import { RestRule } from './rules/RestRule';
import { PRRule } from './rules/PRRule';
import { StreakRule } from './rules/StreakRule';

const PRIORITY_RANK: Record<RecommendationPriority, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};

export class CoachEngine {
  private rules: CoachRule[];

  constructor(customRules?: CoachRule[]) {
    this.rules = customRules || [
      new PRRule(),
      new StreakRule(),
      new FatigueRule(),
      new OverloadRule(),
      new RestRule(),
    ];
  }

  evaluate(context: AthleteContext): {
    topRecommendation: CoachRecommendation | null;
    allRecommendations: CoachRecommendation[];
    executionTimeMs: number;
  } {
    const startTime = performance.now();

    const recommendations: CoachRecommendation[] = [];

    for (const rule of this.rules) {
      try {
        const rec = rule.evaluate(context);
        if (rec) {
          recommendations.push(rec);
        }
      } catch (err) {
        console.error(`Error evaluating rule ${rule.ruleId}:`, err);
      }
    }

    // SORT BY PRIORITY RANK (CRITICAL > HIGH > MEDIUM > LOW) AND CONFIDENCE
    recommendations.sort((a, b) => {
      const prioDiff = PRIORITY_RANK[b.priority] - PRIORITY_RANK[a.priority];
      if (prioDiff !== 0) return prioDiff;
      return b.confidence - a.confidence;
    });

    const executionTimeMs = Number((performance.now() - startTime).toFixed(2));

    return {
      topRecommendation: recommendations.length > 0 ? recommendations[0] : null,
      allRecommendations: recommendations,
      executionTimeMs,
    };
  }
}
