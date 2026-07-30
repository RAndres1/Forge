import React from 'react';
import {
  SHOP_ITEMS_CATALOG,
  calculateExerciseStrengthTier,
  calculateMuscleGroupHeatmap,
} from '@forge/domain';

export default function ShopAndAnalyticsPage() {
  const userOre = 1250; // User virtual currency balance
  const exercisesRank = [
    calculateExerciseStrengthTier('Press de Banca Plano', 105, 70), // Ratio ~1.5 => Avanzado
    calculateExerciseStrengthTier('Sentadilla Trasera', 130, 70),   // Ratio ~1.85 => Élite
    calculateExerciseStrengthTier('Peso Muerto', 160, 70),          // Ratio ~2.28 => Titán
  ];

  const muscleStatuses = calculateMuscleGroupHeatmap([]);

  return (
    <div style={{ backgroundColor: '#09090b', color: '#f4f4f5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', padding: '32px' }}>
      
      {/* HEADER WITH ORE BALANCE */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #27272a', paddingBottom: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>🏬 TIENDA FORGE & MAPA CORPORAL</h1>
          <p style={{ color: '#a1a1aa', margin: '4px 0 0 0' }}>Canjea tus Minerales (Forge Ore) por cosméticos y revisa tus rangos específicos por ejercicio.</p>
        </div>
        <div style={{ backgroundColor: 'rgba(234, 179, 8, 0.15)', border: '1px solid #eab308', padding: '12px 24px', borderRadius: '12px', textAlign: 'right' }}>
          <div style={{ fontSize: '12px', color: '#eab308', fontWeight: '800' }}>SALDO VIRTUAL</div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#facc15' }}>🪙 {userOre} FORGE ORE</div>
        </div>
      </header>

      {/* SECTION 1: EXERCISE STRENGTH RANKS & MUSCLE HEATMAP GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        
        {/* EXERCISE RANKS CARD */}
        <section style={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '16px', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', marginTop: 0, marginBottom: '16px', color: '#60a5fa' }}>
            🏋️ RANGOS DE FUERZA POR EJERCICIO
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {exercisesRank.map((e, idx) => (
              <div key={idx} style={{ backgroundColor: '#27272a', borderRadius: '10px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '14px' }}>{e.exerciseName}</div>
                  <div style={{ color: '#a1a1aa', fontSize: '12px', marginTop: '2px' }}>
                    1RM Est: <strong>{e.oneRepMaxKg} kg</strong> ({e.bodyWeightRatio}x peso corporal)
                  </div>
                </div>
                <div style={{ backgroundColor: '#18181b', padding: '6px 12px', borderRadius: '8px', border: '1px solid #3f3f46', textAlign: 'right' }}>
                  <span style={{ fontSize: '14px', fontWeight: '800' }}>{e.badgeIcon} {e.tier}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MUSCLE HEATMAP STATUS CARD */}
        <section style={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '16px', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', marginTop: 0, marginBottom: '16px', color: '#4ade80' }}>
            🗺️ MAPA CORPORAL DE CALOR (7 DÍAS)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {muscleStatuses.map((m) => (
              <div
                key={m.muscleGroup}
                style={{
                  backgroundColor: m.status === 'neglected' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                  border: m.status === 'neglected' ? '1px solid #ef4444' : '1px solid #22c55e',
                  borderRadius: '10px',
                  padding: '12px',
                }}
              >
                <div style={{ fontWeight: '800', fontSize: '13px' }}>{m.displayName}</div>
                <div style={{ fontSize: '11px', color: '#a1a1aa', marginTop: '4px' }}>
                  {m.setsCount7Days} series ({m.volumeKg7Days.toLocaleString()} kg)
                </div>
                <div style={{ fontSize: '11px', fontWeight: '700', marginTop: '4px', color: m.status === 'neglected' ? '#f87171' : '#4ade80' }}>
                  {m.status === 'neglected' ? '⚠️ Descuidado' : '✅ Óptimo'}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* SECTION 2: FORGE SHOP CATALOG */}
      <section style={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '16px', padding: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', marginTop: 0, marginBottom: '20px', color: '#facc15' }}>
          🛒 TIENDA DE COSMÉTICOS Y TÍTULOS (FORGE SHOP)
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {SHOP_ITEMS_CATALOG.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#27272a', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid #3f3f46' }}>
              <div>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{ fontWeight: '800', fontSize: '16px', color: '#f4f4f5' }}>{item.name}</div>
                <p style={{ color: '#a1a1aa', fontSize: '12px', margin: '8px 0 16px 0', lineHeight: 1.4 }}>{item.description}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #3f3f46', paddingTop: '12px' }}>
                <span style={{ fontWeight: '900', color: '#facc15', fontSize: '14px' }}>🪙 {item.priceOre} Ore</span>
                <button
                  style={{
                    backgroundColor: userOre >= item.priceOre ? '#eab308' : '#3f3f46',
                    color: userOre >= item.priceOre ? '#000' : '#71717a',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontWeight: '800',
                    fontSize: '12px',
                    cursor: userOre >= item.priceOre ? 'pointer' : 'not-allowed',
                  }}
                >
                  {userOre >= item.priceOre ? 'CANJEAR' : 'BLOQUEADO'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
