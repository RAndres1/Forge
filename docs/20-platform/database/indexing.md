# Index Strategy

Objetivo

Optimizar consultas frecuentes sin sobrecargar las escrituras.

---

Índices críticos
users(email)
workouts(user_id, started_at DESC)
sets(exercise_id)
sets(completed_at)
progress_snapshots(user_id, captured_at DESC)
milestones(user_id)
personal_records(user_id, exercise_id)
events(user_id, created_at DESC)
notifications(user_id, is_read)

---

Todos los índices deben justificarse mediante una consulta de negocio.

Nunca se crean índices "por si acaso".
