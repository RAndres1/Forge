import React from 'react';
import Link from 'next/link';

export default function MuscleMapPage() {
  const muscleData = [
    { id: 'chest', name: 'PECTORALIS MAJOR', sets: 14, status: 'OPTIMAL STIMULUS', color: '#00ff9d', percent: 90 },
    { id: 'back', name: 'LATISSIMUS DORSII & TRAPEZIUS', sets: 16, status: 'OPTIMAL STIMULUS', color: '#00ff9d', percent: 95 },
    { id: 'legs', name: 'QUADRICEPS & HAMSTRINGS', sets: 18, status: 'MAXIMUM ADAPTATION', color: '#ffaa00', percent: 100 },
    { id: 'shoulders', name: 'DELTOIDS (ANTERIOR & LATERAL)', sets: 10, status: 'OPTIMAL STIMULUS', color: '#00ff9d', percent: 75 },
    { id: 'arms', name: 'BRACHIALIS & TRICEPS', sets: 12, status: 'OPTIMAL STIMULUS', color: '#00ff9d', percent: 80 },
    { id: 'core', name: 'RECTUS ABDOMINIS & CORE', sets: 2, status: 'UNDERTRAINED ALERT', color: '#ff0055', percent: 20 },
  ];

  return (
    <div style={{
      backgroundColor: '#030305',
      backgroundImage: `
        radial-gradient(circle at 50% -10%, rgba(0, 255, 157, 0.08) 0%, transparent 60%),
        radial-gradient(circle at 100% 100%, rgba(0, 240, 255, 0.05) 0%, transparent 50%)
      `,
      color: '#f4f4f5',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif',
      padding: '40px 64px',
      boxSizing: 'border-box',
    }}>
      
      {/* NAVBAR */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '56px',
        backgroundColor: 'rgba(12, 12, 16, 0.65)',
        backdropFilter: 'blur(32px)',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        padding: '14px 28px',
        borderRadius: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <Link href="/" style={{ textDecoration: 'none', color: '#ffffff', fontSize: '18px', fontWeight: '900', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00ff9d', boxShadow: '0 0 12px #00ff9d' }} />
            FORGE <span style={{ fontSize: '10px', color: '#00ff9d', letterSpacing: '3px', fontWeight: '700' }}>[ NEURAL MAP ]</span>
          </Link>
          <div style={{ display: 'flex', gap: '24px', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#888893' }}>Passport</Link>
            <Link href="/muscle-map" style={{ textDecoration: 'none', color: '#00ff9d', borderBottom: '1px solid #00ff9d', paddingBottom: '4px' }}>Neural Map</Link>
            <Link href="/routines" style={{ textDecoration: 'none', color: '#888893' }}>Protocols</Link>
            <Link href="/circle" style={{ textDecoration: 'none', color: '#888893' }}>League</Link>
            <Link href="/shop" style={{ textDecoration: 'none', color: '#888893' }}>Armory</Link>
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <header style={{ marginBottom: '40px' }}>
        <div style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '3px', color: '#00ff9d', backgroundColor: 'rgba(0, 255, 157, 0.08)', border: '1px solid rgba(0, 255, 157, 0.2)', padding: '4px 12px', borderRadius: '4px', display: 'inline-block', marginBottom: '12px' }}>
          ● NEURAL ANATOMICAL FEED // 7-DAY SCAN
        </div>
        <h1 style={{ fontSize: '38px', fontWeight: '900', margin: 0, letterSpacing: '-1px', color: '#ffffff' }}>BIOMECHANICAL MUSCLE HEATMAP</h1>
        <p style={{ color: '#71717a', fontSize: '15px', marginTop: '8px' }}>Real-time hyper-targeted fatigue & volume distribution telemetry.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '40px' }}>
        
        {/* SCI-FI ANATOMICAL SVG RADAR */}
        <section style={{
          backgroundColor: 'rgba(12, 12, 16, 0.65)',
          backdropFilter: 'blur(32px)',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          borderRadius: '24px',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        }}>
          <div style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '2px', color: '#00ff9d', marginBottom: '32px' }}>
            TELEMETRY SCANNER // ANATOMICAL VIEW
          </div>

          <svg width="240" height="360" viewBox="0 0 200 320" style={{ filter: 'drop-shadow(0 0 25px rgba(0, 255, 157, 0.25))' }}>
            {/* HEAD */}
            <circle cx="100" cy="35" r="20" fill="#121216" stroke="#27272a" strokeWidth="2" />
            
            {/* SHOULDERS */}
            <ellipse cx="60" cy="75" rx="14" ry="10" fill="#00ff9d" opacity="0.9" />
            <ellipse cx="140" cy="75" rx="14" ry="10" fill="#00ff9d" opacity="0.9" />

            {/* CHEST */}
            <path d="M 70 75 Q 100 85 130 75 Q 130 110 100 115 Q 70 110 70 75 Z" fill="#00ff9d" opacity="0.95" />

            {/* ARMS */}
            <rect x="42" y="88" width="14" height="45" rx="7" fill="#00ff9d" opacity="0.85" />
            <rect x="144" y="88" width="14" height="45" rx="7" fill="#00ff9d" opacity="0.85" />

            {/* CORE / ABS (NEON RED ALERT) */}
            <path d="M 75 118 L 125 118 L 120 160 L 80 160 Z" fill="#ff0055" opacity="0.95" />

            {/* LEGS / QUADS */}
            <rect x="70" y="165" width="26" height="90" rx="10" fill="#ffaa00" opacity="0.9" />
            <rect x="104" y="165" width="26" height="90" rx="10" fill="#ffaa00" opacity="0.9" />
          </svg>

          <div style={{ display: 'flex', gap: '20px', marginTop: '32px', fontSize: '11px', fontWeight: '800', letterSpacing: '1px' }}>
            <span style={{ color: '#00ff9d' }}>● OPTIMAL (90%+)</span>
            <span style={{ color: '#ffaa00' }}>● ADAPTATION</span>
            <span style={{ color: '#ff0055' }}>● DEFICIT ALERT</span>
          </div>
        </section>

        {/* DETAILED MUSCLE GROUP BREAKDOWN */}
        <section style={{
          backgroundColor: 'rgba(12, 12, 16, 0.65)',
          backdropFilter: 'blur(32px)',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        }}>
          <h2 style={{ fontSize: '16px', fontWeight: '900', margin: '0 0 28px 0', letterSpacing: '1.5px', color: '#ffffff' }}>7-DAY SET VOLUME DISTRIBUTION</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {muscleData.map((m) => (
              <div key={m.id} style={{ backgroundColor: 'rgba(24, 24, 27, 0.4)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontWeight: '800', fontSize: '14px', letterSpacing: '1px', color: '#ffffff' }}>{m.name}</span>
                  <span style={{ color: m.color, fontWeight: '900', fontSize: '12px', fontFamily: 'monospace' }}>{m.status} // {m.sets} SETS</span>
                </div>
                <div style={{ height: '8px', backgroundColor: 'rgba(39, 39, 42, 0.8)', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ width: `${m.percent}%`, height: '100%', backgroundColor: m.color, borderRadius: '4px', boxShadow: `0 0 12px ${m.color}` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
