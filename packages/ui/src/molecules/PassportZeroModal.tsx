import React, { useState } from 'react';
import { ForgeCard } from '../primitives/ForgeCard';
import { ForgeBadge } from '../primitives/ForgeBadge';
import { ForgeButton } from '../primitives/ForgeButton';
import { ForgeInput } from '../primitives/ForgeInput';

export interface PassportZeroModalProps {
  onComplete: (name: string, bodyWeightKg: number) => void;
}

export const PassportZeroModal: React.FC<PassportZeroModalProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [bodyWeight, setBodyWeight] = useState('75');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor ingresa tu nombre de atleta');
      return;
    }
    const bw = parseFloat(bodyWeight);
    if (isNaN(bw) || bw < 30 || bw > 300) {
      setError('Por favor ingresa un peso corporal válido (30 kg - 300 kg)');
      return;
    }
    onComplete(name.trim(), bw);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-[#030305]/95 backdrop-blur-3xl flex items-center justify-center p-4">
      <ForgeCard glowColor="cyan" className="max-w-md w-full p-8 shadow-[0_0_50px_rgba(0,240,255,0.3)]">
        <div className="text-center mb-6">
          <ForgeBadge variant="cyan" className="mb-2">PASAPORTE ZERO • PRIMER INICIO</ForgeBadge>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight m-0">FORJA TU CREDENCIAL</h2>
          <p className="text-xs font-mono text-zinc-400 mt-2">
            Construye tu identidad de atleta en menos de 60 segundos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <ForgeInput
            label="NOMBRE COMPLETO DEL ATLETA"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            placeholder="Ej: Alejandro Martínez"
            errorMessage={error && !name ? error : undefined}
          />

          <ForgeInput
            label="PESO CORPORAL BASE (KG)"
            type="number"
            value={bodyWeight}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBodyWeight(e.target.value)}
            placeholder="75"
            errorMessage={error && name ? error : undefined}
          />

          <ForgeButton type="submit" variant="primary" size="lg" className="w-full mt-4">
            ⚡ ACTIVAR PASAPORTE Y ENTRENAR
          </ForgeButton>
        </form>
      </ForgeCard>
    </div>
  );
};
