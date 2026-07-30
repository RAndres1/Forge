import './globals.css';
import React from 'react';
import { TrainingProvider } from '@/context/TrainingContext';
import { PerformanceDashboard } from '@/components/PerformanceDashboard';
import { DecisionTelemetryDashboard } from '@/components/DecisionTelemetryDashboard';

export const metadata = {
  title: 'Forge - Athlete Passport',
  description: 'Progression Platform for Elite Athletes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-[#030305] text-zinc-100 min-h-screen font-sans antialiased">
        <TrainingProvider>
          {children}
          <PerformanceDashboard />
          <DecisionTelemetryDashboard />
        </TrainingProvider>
      </body>
    </html>
  );
}
