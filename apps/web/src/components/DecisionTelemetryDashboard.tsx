'use client';

import React, { useEffect, useState } from 'react';
import { DecisionHistoryEngine } from '@forge/domain';

export function DecisionTelemetryDashboard() {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const [metrics, setMetrics] = useState<ReturnType<typeof DecisionHistoryEngine.prototype.getMetrics>>({
    totalIssued: 0,
    totalAccepted: 0,
    overallAcceptanceRate: 0,
    overallSuccessRate: 0,
    avgTimeToDecisionMs: 0,
    ruleMetrics: [],
    topTriggeredRules: [],
    leastUsefulRules: [],
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateMetrics = () => {
      const history = DecisionHistoryEngine.getInstance();
      setMetrics(history.getMetrics());
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="fixed bottom-4 left-4 z-[9999] font-mono text-[11px] select-none">
      {isOpen ? (
        <div className="bg-[#09090b]/95 backdrop-blur-2xl border border-violet-500/40 p-4 rounded-xl shadow-[0_0_30px_rgba(112,0,255,0.2)] text-zinc-300 w-80">
          <div className="flex justify-between items-center pb-2 mb-3 border-b border-white/10">
            <span className="font-bold text-violet-400">🧠 COACH DECISION OBSERVABILITY</span>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white text-xs px-1">
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-zinc-400">EMITIDAS:</span>
              <span className="text-white font-bold">{metrics.totalIssued}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">ACEPTADAS:</span>
              <span className="text-emerald-400 font-bold">{metrics.totalAccepted}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">TASA DE ACEPTACIÓN:</span>
              <span className="text-cyan-400 font-bold">{metrics.overallAcceptanceRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">TASA DE ÉXITO DE ACCIÓN:</span>
              <span className="text-emerald-400 font-bold">{metrics.overallSuccessRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">TIEMPO PROMEDIO A DECISIÓN:</span>
              <span className="text-amber-400 font-bold">{metrics.avgTimeToDecisionMs} ms</span>
            </div>

            <div className="mt-2 pt-2 border-t border-white/10">
              <div className="text-[10px] text-zinc-500 font-bold mb-1">REGLAS MÁS DISPARADAS</div>
              {metrics.topTriggeredRules.length > 0 ? (
                metrics.topTriggeredRules.map((rule) => (
                  <div key={rule} className="text-[10px] text-zinc-300 font-mono">
                    • {rule}
                  </div>
                ))
              ) : (
                <div className="text-[10px] text-zinc-600 italic">Sin actividad registrada</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#09090b]/90 backdrop-blur-xl border border-violet-500/30 text-violet-400 px-3 py-1.5 rounded-lg shadow-lg font-mono font-bold hover:border-violet-400 transition-all"
        >
          🧠 COACH OBSERVE: {metrics.totalIssued} ISSUED ({metrics.overallAcceptanceRate}%)
        </button>
      )}
    </aside>
  );
}
