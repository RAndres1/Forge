'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SignUpPage() {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!displayName || !username || !email || !password) {
      setErrorMsg('Por favor completa todos los campos requeridos.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg('¡Cuenta de atleta creada exitosamente! Rango inicial asignado: 🏅 Bronce I. Redirigiendo...');
    }, 1200);
  };

  return (
    <div style={{ backgroundColor: '#09090b', color: '#f4f4f5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', padding: '20px' }}>
      
      <div style={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '440px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>🛡️</div>
          <h1 style={{ fontSize: '26px', fontWeight: '900', margin: 0, letterSpacing: '-0.5px' }}>REGISTRO DE ATLETA FORGE</h1>
          <p style={{ color: '#a1a1aa', fontSize: '13px', marginTop: '6px' }}>Crea tu pasaporte y comienza tu camino hacia el rango Inmortal.</p>
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

        <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', color: '#a1a1aa', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>NOMBRE COMPLETO / MOSTRAR</label>
            <input
              type="text"
              placeholder="Ej. Alejandro Martínez"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              style={{ width: '100%', backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '10px', padding: '10px 14px', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#a1a1aa', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>NOMBRE DE USUARIO (@USERNAME)</label>
            <input
              type="text"
              placeholder="alex_fit"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '10px', padding: '10px 14px', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#a1a1aa', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>CORREO ELECTRÓNICO</label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '10px', padding: '10px 14px', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#a1a1aa', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>CONTRASEÑA</label>
            <input
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '10px', padding: '10px 14px', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ marginTop: '10px', backgroundColor: '#22c55e', color: '#000000', border: 'none', borderRadius: '10px', padding: '14px', fontSize: '15px', fontWeight: '900', cursor: 'pointer' }}
          >
            {loading ? 'CREANDO CUENTA...' : 'UNIRME A FORGE 🏆'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px', color: '#a1a1aa' }}>
          ¿Ya posees una cuenta?{' '}
          <Link href="/login" style={{ color: '#60a5fa', fontWeight: '700', textDecoration: 'none' }}>
            Inicia sesión
          </Link>
        </div>

      </div>

    </div>
  );
}
