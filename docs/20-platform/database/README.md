# Database Architecture

Estado: P0

## Filosofía

La base de datos de Forge no es un repositorio de pantallas.

Es la representación del dominio.

Cada tabla debe responder una pregunta del negocio.

Nunca se crean tablas para facilitar una pantalla específica.

---

## Principios

- UUID como clave primaria.
- Timestamps en UTC.
- Soft Delete siempre que exista valor histórico.
- Auditoría automática.
- Diseño compatible con Offline First.
- Row Level Security en todas las tablas del usuario.
- Idempotencia para sincronización.

---

## Dominios

Identity
Training
Progress
Legacy
Community
AI
Notifications
Analytics

---

## Motores

La base de datos nunca calcula reglas complejas.

Las reglas pertenecen a los Engines.

La base almacena estado y eventos.
