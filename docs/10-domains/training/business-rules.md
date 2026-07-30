# Business Rules

## BR-001

Un entrenamiento siempre pertenece a un único usuario.

---

## BR-002

Un entrenamiento puede contener múltiples ejercicios.

---

## BR-003

Un ejercicio puede contener múltiples series.

---

## BR-004

Una serie nunca puede eliminarse físicamente.

Solo puede marcarse como eliminada.

Esto preserva la consistencia histórica.

---

## BR-005

Finalizar un entrenamiento genera automáticamente:

- Recalcular Progress Score.
- Buscar nuevos Personal Records.
- Actualizar Momentum.
- Actualizar Timeline.
- Generar Insights pendientes.
- Notificar al AI Coach.

---

## BR-006

Si la aplicación se cierra inesperadamente, la sesión debe recuperarse automáticamente.

Nunca se pierde información.
