# Edge Cases

## El usuario pierde Internet

El entrenamiento continúa normalmente.

Sincronización posterior.

---

## Se queda sin batería

Toda la información debe haberse persistido localmente.

---

## Cierra accidentalmente la aplicación

Al abrir nuevamente:
"Se encontró un entrenamiento en progreso."
Continuar.
Descartar.

---

## Dos dispositivos abiertos

Solo un entrenamiento activo por usuario.

El segundo dispositivo entra en modo lectura.

---

## El reloj inteligente pierde conexión

Los datos quedan pendientes hasta recuperar sincronización.

---

## El usuario cambia de unidades (kg ↔ lb)

Los datos históricos nunca se modifican.

Solo cambia la representación visual.

Todas las conversiones se realizan en tiempo real.
