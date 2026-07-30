# Offline First

Forge debe funcionar completamente sin conexión.

La sincronización nunca bloquea al usuario.

---

Principios

Toda escritura ocurre primero localmente.

Toda sincronización es asíncrona.
Cada cambio posee un UUID propio.

Nunca dependemos del orden de llegada.

---

Conflictos
Si existen conflictos:

1. detectar

2. resolver automáticamente

3. registrar auditoría

4. informar únicamente cuando sea necesario

---

Objetivo

El usuario nunca debe preguntarse si algo quedó guardado.
