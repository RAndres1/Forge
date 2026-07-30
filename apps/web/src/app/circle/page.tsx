import React from 'react';
import { calculateCircleRankings, CircleLeaderboardEntry, ActivityFeedPost } from '@forge/domain';

export default function CirclePage() {
  const rawLeaderboard: Omit<CircleLeaderboardEntry, 'position'>[] = [
    {
      userId: 'u-1',
      username: 'alex_fit',
      displayName: 'Alejandro M.',
      rank: 'Plata II',
      totalXp: 4850,
      weeklyVolumeKg: 13560,
      weeklyWorkoutsCount: 4,
      streakDays: 28,
    },
    {
      userId: 'u-2',
      username: 'carla_lifts',
      displayName: 'Carla R. (Hermana)',
      rank: 'Plata I',
      totalXp: 3200,
      weeklyVolumeKg: 9400,
      weeklyWorkoutsCount: 4,
      streakDays: 21,
    },
    {
      userId: 'u-3',
      username: 'mama_strength',
      displayName: 'Elena V. (Mamá)',
      rank: 'Bronce III',
      totalXp: 1850,
      weeklyVolumeKg: 6200,
      weeklyWorkoutsCount: 3,
      streakDays: 14,
    },
    {
      userId: 'u-4',
      username: 'carlos_coach',
      displayName: 'Carlos T.',
      rank: 'Oro I',
      totalXp: 11200,
      weeklyVolumeKg: 24800,
      weeklyWorkoutsCount: 5,
      streakDays: 45,
    },
  ];

  const leaderboard = calculateCircleRankings(rawLeaderboard);

  const feedPosts: ActivityFeedPost[] = [
    {
      id: 'post-1',
      userId: 'u-4',
      displayName: 'Carlos T.',
      actionText: 'completó su entrenamiento de Sentadilla',
      detailText: '🔥 Rompió su récord personal (PR) con 140 kg x 5 reps',
      timestamp: 'Hace 25 min',
      reactionsCount: { fire: 5, muscle: 3, bolt: 2 },
    },
    {
      id: 'post-2',
      userId: 'u-2',
      displayName: 'Carla R.',
      actionText: 'completó la misión diaria "Disciplina de Hierro"',
      detailText: '4/4 entrenamientos semanales alcanzados (+150 XP)',
      timestamp: 'Hace 2 horas',
      reactionsCount: { fire: 4, muscle: 2, bolt: 1 },
    },
  ];

  return (
    <div style={{ backgroundColor: '#09090b', color: '#f4f4f5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', padding: '32px' }}>
      
      {/* HEADER */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #27272a', paddingBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>🛡️ CÍRCULO: GLADIADORES FORGE</h1>
            <span style={{ backgroundColor: '#27272a', color: '#60a5fa', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>CÓDIGO: FORGE-8842</span>
          </div>
          <p style={{ color: '#a1a1aa', margin: '4px 0 0 0' }}>Grupo privado de entrenamiento familiar y amigos (4 miembros activos).</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
        
        {/* LEADERBOARD COLUMN */}
        <section style={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '16px', padding: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', marginTop: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🏆 TABLA DE CLASIFICACIÓN SEMANAL
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {leaderboard.map((user) => (
              <div
                key={user.userId}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: user.position === 1 ? 'rgba(234, 179, 8, 0.08)' : '#27272a',
                  border: user.position === 1 ? '1px solid #eab308' : '1px solid transparent',
                  padding: '16px',
                  borderRadius: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: user.position === 1 ? '#eab308' : user.position === 2 ? '#94a3b8' : user.position === 3 ? '#b45309' : '#3f3f46',
                      color: '#000',
                      fontWeight: '900',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                    }}
                  >
                    #{user.position}
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '15px' }}>{user.displayName}</div>
                    <div style={{ color: '#a1a1aa', fontSize: '12px', marginTop: '2px' }}>
                      🏅 {user.rank} • 🔥 {user.streakDays} días racha
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: '#22c55e' }}>{user.totalXp.toLocaleString()} XP</div>
                  <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: '600', marginTop: '2px' }}>{user.weeklyVolumeKg.toLocaleString()} kg sem.</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ACTIVITY FEED COLUMN */}
        <section style={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '16px', padding: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', marginTop: 0, marginBottom: '20px' }}>
            ⚡ FEED DE ACTIVIDAD EN TIEMPO REAL
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {feedPosts.map((post) => (
              <div key={post.id} style={{ backgroundColor: '#27272a', borderRadius: '12px', padding: '16px', border: '1px solid #3f3f46' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '800', color: '#60a5fa' }}>{post.displayName}</span>
                  <span style={{ color: '#71717a', fontSize: '12px' }}>{post.timestamp}</span>
                </div>
                <div style={{ marginTop: '6px', fontSize: '14px', color: '#f4f4f5' }}>{post.actionText}</div>
                <div style={{ marginTop: '4px', fontSize: '13px', color: '#38bdf8', fontWeight: '600' }}>{post.detailText}</div>

                {/* REACTION BUTTONS */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #3f3f46' }}>
                  <button style={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', color: '#fff', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                    🔥 {post.reactionsCount.fire}
                  </button>
                  <button style={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', color: '#fff', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                    💪 {post.reactionsCount.muscle}
                  </button>
                  <button style={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', color: '#fff', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                    ⚡ {post.reactionsCount.bolt}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
