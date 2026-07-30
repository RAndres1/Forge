# Definition of Done (DoD) — Forge

Para considerar un requerimiento, PRD o tarea técnica como **Completada (Done)** en Forge, debe cumplir estrictamente con la siguiente lista de verificación:

## Criterios de Aceptación Técnicos
- [ ] **TypeScript estricto:** Cero errores de TypeScript (`pnpm type-check` pasa limpio).
- [ ] **Tests de Dominio:** Los algoritmos de cálculos matemáticos de fuerza, 1RM, XP y rangos en `@forge/core` cuentan con pruebas unitarias en Vitest/Jest con cobertura $> 90\%$.
- [ ] **Seguridad RLS:** Las tablas asociadas en Supabase cuentan con políticas RLS probadas para evitar fugas de datos entre usuarios.
- [ ] **Resistencia Offline:** La función de escritura probada soporta caída de conexión de red sin perder datos en la app móvil.
- [ ] **Revisión de UX:** La interfaz cumple con el modo oscuro nativo, tiempos de respuesta instantáneos ($< 100\text{ ms}$) y feedback háptico en gimnasio.
- [ ] **Documentación:** Cualquier cambio en contratos de API o esquema de base de datos fue reflejado en la carpeta `forge-docs`.
