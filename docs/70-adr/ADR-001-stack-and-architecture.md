# ADR-001: Selección de Stack Tecnológico y Arquitectura de Monorepo

* **Estado:** Aprobado
* **Fecha:** 2026-07-29
* **Autores:** Equipo de Arquitectura Forge

## Contexto y Problema
Forge requiere una arquitectura multiplataforma que soporte una aplicación móvil nativa (iOS/Android) fluida para su uso en gimnasio, un dashboard web responsivo, procesamiento de inteligencia artificial y una base de datos reactiva con soporte de autenticación y permisos seguros.

## Opciones Consideradas
1. **Flutter + Firebase:** Excelente multiplataforma móvil, pero integración más compleja con el ecosistema de Next.js web y flexibilidad limitada en consultas relacionales complejas.
2. **React Native (Expo) + Next.js + Supabase (PostgreSQL) en Monorepo (Turborepo + pnpm):** Reutilización de código TypeScript, motor de base de datos relacional robusto con RLS, autenticación integrada y soporte nativo para tiempo real.

## Decisión Aprobada
Aprobar la **Opción 2**:
* **Mobile:** React Native con Expo SDK 51+ (React Navigation, Zustand/React Query).
* **Web & Admin:** Next.js (App Router, TailwindCSS).
* **Monorepo:** Turborepo gestionado por `pnpm`.
* **Backend Services:** Supabase (PostgreSQL, Supabase Auth, Storage, Realtime).
* **AI Engine:** Servicio Python FastAPI desacoplado para tareas intensivas de LLM / RAG.

## Consecuencias
* **Positivas:** Reutilización de tipos (`@forge/core`) entre cliente y servidor. Altísima velocidad de iteración mediante *vibecoding* y contratos tipados end-to-end.
* **Riesgos:** Requiere mantener cuidadosa separación entre librerías dependientes de React Native y librerías web dentro del paquete de UI.
