# PRD: Círculos Privados & Liga de Amigos (Circle)

## 1. Resumen Ejecutivo
El módulo **Circle** implementa la capa social privada de Forge. Permite a grupos de amigos, familias o atletas de un mismo gimnasio competir por consistencia, ver la actividad en tiempo real y enviarse motivaciones.

---

## 2. Requerimientos Funcionales

| ID | Requerimiento | Descripción | Prioridad |
|----|---------------|-------------|-----------|
| **FC-01** | Creación y Unión por Código QR / Link | El usuario puede crear un Círculo (máx. 20 miembros en plan gratuito) y compartir un enlace o código único. | P0 |
| **FC-02** | Tabla de Clasificación Semanal (Leaderboard) | Ranking dentro del grupo ordenado por **Constancia %** y **XP acumulada** en la semana actual. | P0 |
| **FC-03** | Feed de Actividad | Feed en tiempo real que publica cuando un miembro completa una sesión de entrenamiento o rompe un récord personal (PR). | P0 |
| **FC-04** | Chispas de Motivación (Reacciones) | Posibilidad de enviar reacciones ("🔥", "💪", "⚡") a los entrenamientos de los miembros del grupo. | P1 |
| **FC-05** | Retos Semanales de Grupo | Misiones colectivas (ej. *"Completar entre todos 15 entrenamientos esta semana"*). | P1 |
