'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !password) {
      setErrorMsg('Por favor completa todos los campos.');
      return;
    }

    setLoading(true);
    // Simulate Supabase login or call client SDK
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg('¡Sesión iniciada con éxito! Redirigiendo a tu Pasaporte...');
    }, 1000);
  };

  return (
    <div style={{ backgroundColor: '#09090b', color: '#f4f4f5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', padding: '20px' }}>
      
      <div style={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '420px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>⚡</div>
          <h1 style={{ fontSize: '26px', fontWeight: '900', margin: 0, letterSpacing: '-0.5px' }}>INICIAR SESIÓN EN FORGE</h1>
          <p style={{ color: '#a1a1aa', fontSize: '14px', marginTop: '6px' }}>Demuestra objetivamente que hoy eres más fuerte que ayer.</p>
        </div>

        {errorMsg && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#f87171', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px', fontWeight: '600' }}>
            ⚠️ {errorMsg}
          </div>
        )}

        {successMsg && (
          <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', color: '#4ade80', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px', fontWeight: '600' }}>
            ✅ {successMsg}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', color: '#a1a1aa', fontSize: '12px', fontWeight: '700', marginBottom: '6px' }}>CORREO ELECTRÓNICO</label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '10px', padding: '12px 16px', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#a1a1aa', fontSize: '12px', fontWeight: '700', marginBottom: '6px' }}>CONTRASEÑA</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '10px', padding: '12px 16px', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ marginTop: '8px', backgroundColor: '#3b82f6', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '14px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', transition: 'background-color 0.2s' }}
          >
            {loading ? 'INGRESANDO...' : 'ENTRAR AL GIMNASIO 🔥'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: '#a1a1aa' }}>
          ¿No tienes una cuenta de atleta aún?{' '}
          <Link href="/signup" style={{ color: '#60a5fa', fontWeight: '700', textDecoration: 'none' }}>
            Regístrate gratis
          </Link>
        </div>

      </div>

    </div>
  );
}
