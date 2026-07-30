# Convenciones de API y Contratos de Servicios

## 1. Estándares Generales
- **Base URL:** `/api/v1`
- **Formato:** JSON UTF-8
- **Autenticación:** Header `Authorization: Bearer <Supabase_JWT>`
- **Fechas:** Formato ISO-8601 UTC (ej. `2026-07-29T02:45:00.000Z`)

---

## 2. Endpoints Principales (REST / PostgREST)

### **Workouts & Sets**
- `POST /api/v1/workouts` — Iniciar un nuevo entrenamiento.
- `PATCH /api/v1/workouts/{id}` — Actualizar notas o estado.
- `POST /api/v1/workouts/{id}/finish` — Finalizar sesión y calcular XP / volumen.
- `POST /api/v1/workouts/{id}/sets` — Registrar o actualizar una serie (`workout_set`).
- `DELETE /api/v1/sets/{id}` — Eliminar una serie registrada.

### **Progress & Passport**
- `GET /api/v1/progress/summary` — Obtener resumen de 1RM, volumen acumulado y Momentum Index.
- `GET /api/v1/passport/{userId}` — Obtener datos públicos del pasaporte del atleta.

### **Circles & Social**
- `GET /api/v1/circles/me` — Obtener círculos del usuario.
- `POST /api/v1/circles/join` — Unirse a un círculo mediante `invite_code`.
- `GET /api/v1/circles/{id}/leaderboard` — Obtener tabla de clasificación semanal.

---

## 3. Modelo Unificado de Errores

Todas las respuestas de error utilizarán la siguiente estructura estándar:

```json
{
  "error": {
    "code": "EXERCISE_NOT_FOUND",
    "message": "El ejercicio solicitado no existe en el catálogo.",
    "details": null,
    "timestamp": "2026-07-29T02:45:00.000Z"
  }
}
```
