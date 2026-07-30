'use client';

import React from 'react';
import Link from 'next/link';
import { ForgePage, ForgeContainer, ForgeCard, ForgeBadge, ForgeButton } from '@forge/ui';

export default function NotFound() {
  return (
    <ForgePage className="min-h-screen flex items-center justify-center">
      <ForgeContainer>
        <ForgeCard className="p-12 text-center max-w-md mx-auto font-mono">
          <ForgeBadge variant="cyan" className="mb-2">404 • PÁGINA NO ENCONTRADA</ForgeBadge>
          <h1 className="text-2xl font-black text-white uppercase m-0">RUTA FUERA DE TELEMETRÍA</h1>
          <p className="text-xs text-zinc-400 mt-2 mb-6">
            La página solicitada no existe o ha sido movida del expediente.
          </p>
          <Link href="/" prefetch={true} className="no-underline inline-block">
            <ForgeButton variant="primary" size="md">
              🏠 VOLVER AL PASAPORTE
            </ForgeButton>
          </Link>
        </ForgeCard>
      </ForgeContainer>
    </ForgePage>
  );
}
