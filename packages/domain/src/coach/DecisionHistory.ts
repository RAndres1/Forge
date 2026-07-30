export type RecommendationAction =
  | 'issued'
  | 'viewed'
  | 'accepted'
  | 'dismissed'
  | 'ignored'
  | 'expired';

export interface DecisionRecord {
  id: string;
  athleteId: string;
  ruleId: string;
  recommendationTitle: string;
  action: RecommendationAction;
  timestamp: string;
  timeToDecisionMs?: number;
  outcome?: {
    wasSuccessful: boolean;
    resultedInPR: boolean;
    sessionCompleted: boolean;
  };
}

export interface RulePerformanceMetrics {
  ruleId: string;
  timesIssued: number;
  timesAccepted: number;
  timesDismissed: number;
  timesIgnored: number;
  acceptanceRate: number; // Percentage
  successRate: number; // Percentage of accepted that had positive outcome
  avgTimeToDecisionMs: number;
}

export class DecisionHistoryEngine {
  private static instance: DecisionHistoryEngine;
  private records: DecisionRecord[] = [];

  private constructor() {}

  static getInstance(): DecisionHistoryEngine {
    if (!DecisionHistoryEngine.instance) {
      DecisionHistoryEngine.instance = new DecisionHistoryEngine();
    }
    return DecisionHistoryEngine.instance;
  }

  recordIssued(athleteId: string, ruleId: string, title: string): string {
    const id = `dec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    this.records.push({
      id,
      athleteId,
      ruleId,
      recommendationTitle: title,
      action: 'issued',
      timestamp: new Date().toISOString(),
    });
    return id;
  }

  recordAction(decisionId: string, action: RecommendationAction, timeToDecisionMs?: number): void {
    const record = this.records.find((r) => r.id === decisionId);
    if (record) {
      record.action = action;
      if (timeToDecisionMs !== undefined) {
        record.timeToDecisionMs = timeToDecisionMs;
      }
    }
  }

  recordOutcome(decisionId: string, outcome: { wasSuccessful: boolean; resultedInPR: boolean; sessionCompleted: boolean }): void {
    const record = this.records.find((r) => r.id === decisionId);
    if (record) {
      record.outcome = outcome;
    }
  }

  getMetrics(): {
    totalIssued: number;
    totalAccepted: number;
    overallAcceptanceRate: number;
    overallSuccessRate: number;
    avgTimeToDecisionMs: number;
    ruleMetrics: RulePerformanceMetrics[];
    topTriggeredRules: string[];
    leastUsefulRules: string[];
  } {
    const totalIssued = this.records.length;
    const acceptedRecords = this.records.filter((r) => r.action === 'accepted');
    const totalAccepted = acceptedRecords.length;

    const overallAcceptanceRate = totalIssued > 0 ? Number(((totalAccepted / totalIssued) * 100).toFixed(1)) : 0;

    const successfulAccepted = acceptedRecords.filter((r) => r.outcome?.wasSuccessful);
    const overallSuccessRate = totalAccepted > 0 ? Number(((successfulAccepted.length / totalAccepted) * 100).toFixed(1)) : 0;

    const timedRecords = this.records.filter((r) => r.timeToDecisionMs !== undefined);
    const totalMs = timedRecords.reduce((sum, r) => sum + (r.timeToDecisionMs || 0), 0);
    const avgTimeToDecisionMs = timedRecords.length > 0 ? Math.round(totalMs / timedRecords.length) : 0;

    // RULE LEVEL METRICS
    const ruleMap = new Map<string, DecisionRecord[]>();
    for (const r of this.records) {
      if (!ruleMap.has(r.ruleId)) {
        ruleMap.set(r.ruleId, []);
      }
      ruleMap.get(r.ruleId)!.push(r);
    }

    const ruleMetrics: RulePerformanceMetrics[] = [];
    ruleMap.forEach((recs, ruleId) => {
      const issued = recs.length;
      const accepted = recs.filter((r) => r.action === 'accepted').length;
      const dismissed = recs.filter((r) => r.action === 'dismissed').length;
      const ignored = recs.filter((r) => r.action === 'ignored').length;
      const accRate = issued > 0 ? Number(((accepted / issued) * 100).toFixed(1)) : 0;

      const successful = recs.filter((r) => r.action === 'accepted' && r.outcome?.wasSuccessful).length;
      const succRate = accepted > 0 ? Number(((successful / accepted) * 100).toFixed(1)) : 0;

      const ruleTimed = recs.filter((r) => r.timeToDecisionMs !== undefined);
      const ruleMs = ruleTimed.reduce((sum, r) => sum + (r.timeToDecisionMs || 0), 0);
      const avgMs = ruleTimed.length > 0 ? Math.round(ruleMs / ruleTimed.length) : 0;

      ruleMetrics.push({
        ruleId,
        timesIssued: issued,
        timesAccepted: accepted,
        timesDismissed: dismissed,
        timesIgnored: ignored,
        acceptanceRate: accRate,
        successRate: succRate,
        avgTimeToDecisionMs: avgMs,
      });
    });

    ruleMetrics.sort((a, b) => b.timesIssued - a.timesIssued);

    return {
      totalIssued,
      totalAccepted,
      overallAcceptanceRate,
      overallSuccessRate,
      avgTimeToDecisionMs,
      ruleMetrics,
      topTriggeredRules: ruleMetrics.slice(0, 3).map((r) => r.ruleId),
      leastUsefulRules: [...ruleMetrics].sort((a, b) => a.acceptanceRate - b.acceptanceRate).slice(0, 3).map((r) => r.ruleId),
    };
  }

  clear(): void {
    this.records = [];
  }
}
