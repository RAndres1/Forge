'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body style={{ backgroundColor: '#09090b', color: '#ffffff', fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center' }}>
        <h2>SISTEMA FORGE EN RECENTRADO</h2>
        <button
          onClick={() => reset()}
          style={{ backgroundColor: '#00f0ff', color: '#000000', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}
        >
          REINTENTAR
        </button>
      </body>
    </html>
  );
}
