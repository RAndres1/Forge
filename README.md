# Forge Docs

Monorepo de documentación e implementación de referencia para **Forge**.

## Estructura

| Carpeta | Contenido |
|---------|-----------|
| [docs/](./docs/) | Contenedor de toda la documentación |
| [00-company/governance/](./docs/00-company/governance/) | Misión, visión, principios y gobernanza |
| [01-product/](./docs/01-product/) | Product Bible |
| [10-domains/](./docs/10-domains/) | Dominios: identity, training, progress, ai, social… |
| [20-platform/](./docs/20-platform/) | Base de datos, arquitectura, backend, frontend, devops |
| [30-design/](./docs/30-design/) | Diseño |
| [40-engineering/](./docs/40-engineering/) | Procesos, runbooks, estándares de ingeniería |
| [50-api/](./docs/50-api/) | OpenAPI y contratos de API |
| [50-prds/](./docs/50-prds/) | PRDs por épica (train, passport, coach, goals…) |
| [60-quality/](./docs/60-quality/) | QA, testing, criterios de aceptación |
| [70-adr/](./docs/70-adr/) | Architecture Decision Records |
| [80-appendix/](./docs/80-appendix/) | Material de referencia adicional |
| [90-rfcs/](./docs/90-rfcs/) | RFCs técnicos |
| [90-templates/](./docs/90-templates/) | Plantillas de documentos |
| [apps/](./apps/) | Aplicaciones (mobile, web, admin) |
| [packages/](./packages/) | Paquetes compartidos del monorepo |
| [supabase/](./supabase/) | Migraciones y configuración de base de datos |

## Inicio rápido

- **Empresa:** [governance/README.md](./docs/00-company/governance/README.md)
- **Producto:** [Product-Bible.md](./docs/01-product/Product-Bible.md)
- **Dominio Progress:** [10-domains/progress/README.md](./docs/10-domains/progress/README.md)
- **PRD Train:** [50-prds/train/README.md](./docs/50-prds/train/README.md)
- **PRD Passport:** [50-prds/passport/README.md](./docs/50-prds/passport/README.md)
- **Desarrollo:** [docs/development-flow.md](./docs/development-flow.md)

## Mantenimiento

Para normalizar espacios en blanco en archivos Markdown:

```bash
python scripts/normalize-markdown.py
```
