# Training API

Estado: Draft

## Objetivo

Definir los contratos públicos del dominio Training.

## Casos de uso

- Crear entrenamiento
- Iniciar entrenamiento
- Agregar ejercicio
- Registrar serie
- Editar serie
- Finalizar entrenamiento

## Principios

- Todas las operaciones son idempotentes cuando aplica.
- Todas las respuestas incluyen `workout_id`.
- Las escrituras generan eventos de dominio.
