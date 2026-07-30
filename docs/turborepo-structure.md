# Turborepo Monorepo Structure — Forge

## Organigrama de Directorios

```text
forge-docs/
├── apps/
│   ├── mobile/         # React Native + Expo app
│   ├── web/            # Next.js Web App
│   └── admin/          # Panel de Administración
├── packages/
│   ├── core/           # Dominio, Matemáticas de entrenamiento y Ranks
│   ├── ui/             # Design System de Tailwind / React Native
│   ├── api-client/     # Cliente Supabase & Fetch wrapper
│   └── config/         # Configuración compartida (ESLint, Prettier, TSConfig)
├── supabase/
│   ├── migrations/     # Scripts de migración SQL
│   └── seed.sql        # Datos iniciales para desarrollo local
├── docs/               # Toda la documentación del proyecto
│   ├── shared/         # Tipos y esquemas compartidos OpenAPI / Zod
│   ├── 00-company/     # Misión, visión, gobernanza
│   ├── 01-product/     # Product Bible
│   ├── 10-domains/     # Dominios
│   ├── 20-platform/    # Plataforma técnica
│   ├── 30-design/      # Diseño
│   ├── 40-engineering/ # Procesos y estándares
│   ├── 50-api/         # API contracts
│   ├── 50-prds/        # PRDs por épica
│   ├── 60-quality/     # QA y testing
│   ├── 70-adr/         # Architecture Decision Records
│   ├── 80-appendix/    # Material de referencia
│   ├── 90-rfcs/        # RFCs técnicos
│   └── 90-templates/   # Plantillas
├── pnpm-workspace.yaml # Workspace root config
├── turbo.json          # Pipelines de compilación y caching
└── package.json        # scripts globales
```

## Scripts Principales

- `pnpm dev`: Inicia el entorno de desarrollo paralelo con Turborepo.
- `pnpm build`: Compila los paquetes y aplicaciones para producción.
- `pnpm lint`: Ejecuta el linter en todo el monorepo.
- `pnpm test`: Corre las pruebas unitarias e integración de `@forge/core`.
