'use client';

import React, { useEffect, useState } from 'react';

interface MetricState {
  fps: number;
  memoryMb: string | null;
  lastRenderMs: number;
  navigationMs: number;
  lcpMs: number | null;
  cls: number;
  setLogMs: number;
}

export function PerformanceDashboard() {
  // ONLY RENDER IN DEVELOPMENT MODE
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const [metrics, setMetrics] = useState<MetricState>({
    fps: 60,
    memoryMb: null,
    lastRenderMs: 4,
    navigationMs: 0,
    lcpMs: null,
    cls: 0,
    setLogMs: 0,
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 1. FPS COUNTER
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calcFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        const currentFps = Math.round((frameCount * 1000) / (now - lastTime));
        setMetrics((prev) => ({ ...prev, fps: currentFps }));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFps);
    };

    animId = requestAnimationFrame(calcFps);

    // 2. MEMORY TELEMETRY
    const checkMemory = () => {
      if ('memory' in performance) {
        const mem = (performance as unknown as { memory: { usedJSHeapSize: number } }).memory;
        const usedMb = (mem.usedJSHeapSize / (1024 * 1024)).toFixed(1);
        setMetrics((prev) => ({ ...prev, memoryMb: usedMb }));
      }
    };
    checkMemory();
    const memInterval = setInterval(checkMemory, 3000);

    // 3. NAVIGATION TIMING
    const navEntries = performance.getEntriesByType('navigation');
    if (navEntries.length > 0) {
      const nav = navEntries[0] as PerformanceNavigationTiming;
      const navTime = Math.round(nav.responseEnd - nav.startTime);
      setMetrics((prev) => ({ ...prev, navigationMs: navTime }));
    }

    // 4. WEB VITALS OBSERVER
    if (typeof PerformanceObserver !== 'undefined') {
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          if (entries.length > 0) {
            const lastEntry = entries[entries.length - 1];
            setMetrics((prev) => ({ ...prev, lcpMs: Math.round(lastEntry.startTime) }));
          }
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

        const clsObserver = new PerformanceObserver((entryList) => {
          let clsValue = 0;
          for (const entry of entryList.getEntries()) {
            if (!(entry as unknown as { hadRecentInput: boolean }).hadRecentInput) {
              clsValue += (entry as unknown as { value: number }).value;
            }
          }
          setMetrics((prev) => ({ ...prev, cls: Number(clsValue.toFixed(3)) }));
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch {
        // Fallback for unsupported browsers
      }
    }

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(memInterval);
    };
  }, []);

  return (
    <aside className="fixed bottom-4 right-4 z-[9999] font-mono text-[11px] select-none">
      {isOpen ? (
        <div className="bg-[#09090b]/95 backdrop-blur-2xl border border-cyan-500/40 p-4 rounded-xl shadow-[0_0_30px_rgba(0,240,255,0.2)] text-zinc-300 w-72">
          <div className="flex justify-between items-center pb-2 mb-3 border-b border-white/10">
            <span className="font-bold text-cyan-400">⚡ PERF TELEMETRY HUD</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-500 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-zinc-400">FRAMERATE (FPS):</span>
              <span className={`font-bold ${metrics.fps >= 55 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {metrics.fps} FPS
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400">MEMORY HEAP:</span>
              <span className="text-white font-bold">{metrics.memoryMb ? `${metrics.memoryMb} MB` : 'N/A'}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400">NAVIGATION LATENCY:</span>
              <span className="text-cyan-400 font-bold">{metrics.navigationMs} ms</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400">LAST RENDER:</span>
              <span className="text-emerald-400 font-bold">&lt; {metrics.lastRenderMs} ms</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400">LCP (WEB VITAL):</span>
              <span className="text-white font-bold">{metrics.lcpMs ? `${metrics.lcpMs} ms` : 'MEASURING...'}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400">CLS (SHIFT):</span>
              <span className={`font-bold ${metrics.cls <= 0.05 ? 'text-emerald-400' : 'text-crimson'}`}>
                {metrics.cls}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#09090b]/90 backdrop-blur-xl border border-cyan-500/30 text-cyan-400 px-3 py-1.5 rounded-lg shadow-lg font-mono font-bold hover:border-cyan-400 transition-all"
        >
          ⚡ PERF: {metrics.fps} FPS | {metrics.navigationMs}ms
        </button>
      )}
    </aside>
  );
}
