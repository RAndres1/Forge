import { DecisionHistoryEngine } from '../DecisionHistory';

describe('DecisionHistoryEngine Observability Tests', () => {
  const history = DecisionHistoryEngine.getInstance();

  beforeEach(() => {
    history.clear();
  });

  test('Records recommendation lifecycle and calculates acceptance rates', () => {
    const id1 = history.recordIssued('ath_1', 'RULE_001_OVERLOAD', 'Incrementa +2.5 kg');
    history.recordAction(id1, 'accepted', 1500);
    history.recordOutcome(id1, { wasSuccessful: true, resultedInPR: true, sessionCompleted: true });

    const id2 = history.recordIssued('ath_1', 'RULE_001_OVERLOAD', 'Incrementa +2.5 kg');
    history.recordAction(id2, 'dismissed', 800);

    const metrics = history.getMetrics();
    expect(metrics.totalIssued).toBe(2);
    expect(metrics.totalAccepted).toBe(1);
    expect(metrics.overallAcceptanceRate).toBe(50.0);
    expect(metrics.overallSuccessRate).toBe(100.0);
    expect(metrics.topTriggeredRules).toContain('RULE_001_OVERLOAD');
  });
});
