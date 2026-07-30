'use client';

import React from 'react';
import Link from 'next/link';
import { ForgePage, ForgeContainer, ForgeCard, ForgeBadge, ForgeButton } from '@forge/ui';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ForgePage className="min-h-screen flex items-center justify-center">
      <ForgeContainer>
        <ForgeCard className="p-12 text-center max-w-md mx-auto font-mono">
          <ForgeBadge variant="amber" className="mb-2">500 • ERROR DE SISTEMA</ForgeBadge>
          <h1 className="text-2xl font-black text-white uppercase m-0">EXCEPCIÓN EN TELEMETRÍA</h1>
          <p className="text-xs text-zinc-400 mt-2 mb-6">
            Ocurrió una interrupción temporal durante la ejecución.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase"
            >
              🔄 REINTENTAR
            </button>
            <Link href="/" prefetch={true} className="no-underline inline-block">
              <ForgeButton variant="primary" size="md">
                🏠 PASAPORTE
              </ForgeButton>
            </Link>
          </div>
        </ForgeCard>
      </ForgeContainer>
    </ForgePage>
  );
}
