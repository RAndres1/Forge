# ADR-002: Estrategia de Sincronización y Resistencia Offline (Offline-First)

* **Estado:** Aprobado
* **Fecha:** 2026-07-29
* **Autores:** Equipo de Ingeniería Forge

## Contexto y Problema
Los sótanos y áreas de gimnasio suelen tener una cobertura de red móvil deficiente o inestable. Un fallo de sincronización mientras el usuario completa un entrenamiento no debe resultar bajo ninguna circunstancia en la pérdida de los pesos o repeticiones registradas.

## Decisión Aprobada
Implementar un patrón **Offline-First con Optimistic Updates y Sync Queue**:

1. **Almacenamiento Local Secundario:** En la app móvil, cada acción de marcado de serie se escribe de forma síncrona en el almacenamiento local del dispositivo (`AsyncStorage` / SQLite local) marcando el registro con el flag `sync_status = 'pending'`.
2. **Actualizaciones Optimistas de la Interfaz:** La interfaz de usuario refleja los cambios instantáneamente ($0\text{ ms}$ de latencia).
3. **Cola de Sincronización en Segundo Plano (Background Sync Queue):** Un listener de conectividad (`NetInfo`) procesa la cola de pendientes tan pronto como la red vuelve a estar disponible, enviando lotes (*batches*) de transacciones a Supabase.
4. **Resolución de Conflictos:** En caso de conflicto de edición en el mismo `workout_id`, prevalecerá la marca de tiempo más reciente (*Last-Write-Wins*) por serie individual (`set_id`).

## Consecuencias
* **Positivas:** La experiencia de usuario es ininterrumpida incluso si el teléfono pierde señal durante todo el entrenamiento.
* **Negativas:** Incrementa ligeramente la complejidad del cliente móvil al requerir manejo de cola de reintentos con *exponential backoff*.
