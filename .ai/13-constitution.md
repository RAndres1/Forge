# 📜 CONSTITUCIÓN OFICIAL DE FORGE v1.0 (FORGE 2.0)

Este documento es la ley suprema e inmutable de producto de Forge. Define los criterios objetivos que rigen el diseño, la arquitectura y el desarrollo. Ningún cambio de código o propuesta de interfaz puede ser aprobado si viola una sola de estas leyes.

---

## 🏛️ LAS 12 LEYES SUPREMAS DE FORGE

### LEY 01: LA PRIORIDAD DE LA IDENTIDAD
El entrenamiento nunca es el producto final. El objetivo exclusivo de Forge es construir y consolidar la identidad del atleta.
- **Consecuencia:** Si una funcionalidad, métrica o animación no fortalece la percepción de identidad del atleta, se descarta inmediatamente.

### LEY 02: LA SUPREMACÍA DEL PASSPORT
El Pasaporte del Atleta es el corazón monolítico del sistema. Ninguna pantalla o flujo puede ser más importante ni tener mayor jerarquía visual.
- **Consecuencia:** Toda sesión de entrenamiento, hito o evidencia generada debe culminar obligatoriamente en la actualización de la credencial del Pasaporte.

### LEY 03: ZERO INPUT EN EJECUCIÓN PRESCRITA
Registrar una serie en la consola de entrenamiento (`Train`) jamás debe requerir escribir texto ni desplegar teclados si el atleta cumple la carga planificada.
- **Consecuencia:** Un solo toque (*One-Tap*) debe marcar la serie como completada, actualizar el volumen e iniciar el temporizador de descanso en 0ms.

### LEY 04: CERO MÉTRICAS DECORATIVAS
Toda cifra, gráfico o indicador numérico mostrado en pantalla debe servir estrictamente para tomar una decisión táctica o respaldar una marca inmutable.
- **Consecuencia:** Queda prohibido mostrar calorías quemadas, porcentajes estéticos de grasa corporal o gráficos de adorno que no aporten evidencia objetiva de sobrecarga.

### LEY 05: SEPARACIÓN DE ESTADOS (TRABAJO VS. REFLEXIÓN)
`Train` es ejecución industrial rápida; `Passport` es contemplación ceremonial y recompensa. Jamás deben mezclarse ambos estados en una misma pantalla.
- **Consecuencia:** Queda prohibido incluir gráficos decorativos pesados en la pantalla de entrenamiento o pedir datos administrativos durante la sesión activa.

### LEY 06: LA ESPINA DE EVIDENCIAS CONTINUA
Todo hito histórico, marca o serie completada debe anclarse visual y conceptualmente a la línea vertical de evidencia ininterrumpida (`LeftAnchorSpine`).
- **Consecuencia:** No existen tarjetas de historial flotando de forma aislada. Todo dato pertenece a la cadena cronológica de la carrera del atleta.

### LEY 07: PROHIBICIÓN DEL RUIDO Y LA MOTIVACIÓN ARTIFICIAL
Forge mantiene un silencio visual monástico. Se prohíbe cualquier uso de emojis informales, mensajes de felicitación infantil o aplausos artificiales.
- **Consecuencia:** La interfaz nunca dice "¡Excelente trabajo bro! 🎉". Dice: `EVIDENCIA REGISTRADA • SOBRECARGA VERIFICADA`.

### LEY 08: JERARQUÍA DEL ÚNICO PROTAGONISTA (NIVEL 0)
En cualquier pantalla de Forge solo puede existir un único héroe visual (Nivel 0). Ningún elemento secundario puede competir en volumen, color o brillo.
- **Consecuencia:** Se prohíben las pantallas divididas en cajas cuadradas idénticas con múltiples resplandores neón simultáneos.

### LEY 09: LA LUZ DE ESTADO QUIRÚRGICA
El color en Forge no es decorativo; es luz de telemetría funcional (Cyan = XP/Sobrecarga, Esmeralda = Récord/PR, Ámbar = Racha/Directiva, Carmesí = Fatiga).
- **Consecuencia:** Queda prohibido aplicar gradientes multicolor a tarjetas o botones solo para que "luzcan atractivos".

### LEY 10: ESPACIO NEGATIVO ESTRUCTURAL
El espacio en blanco no es vacío desperdiciado; es la estructura que otorga estatus, serenidad y peso a la información del atleta.
- **Consecuencia:** Se exige un espacio de 48px a 64px entre bloques primarios. Prohibido apretar elementos para "rellenar la pantalla".

### LEY 11: LENGUAJE DE EXPEDIENTE PERMANENTE
Forge utiliza únicamente vocabulario de alta precisión e ingeniería de carrera (*Expediente, Credencial, Evidencia, Sobrecarga, Carrera, Identidad*).
- **Consecuencia:** Se erradica por completo la jerga fitness convencional (*Perfil, Historial, Logros, Actividad, Dashboard, Workout, Nivel*).

### LEY 12: PERMANENCIA Y ATEMPORALIDAD
Cada componente debe diseñarse para durar 10 años sin parecer obsoleto o sujeto a modas de diseño efímeras.
- **Consecuencia:** Se priorizan paneles monolíticos de cristal obsidiana y titanio con tipografía limpia por encima de tendencias pasajeras.

---

## 🔍 AUDITORÍA DE MÓDULOS DE FORGE

El mapa de Forge queda simplificado a 4 Consolas Primarias:
1. 💳 **PASSPORT** (El Expediente e Identidad del Atleta, incorporando Evidence, Bodygraph y Asesor Coach).
2. ⚡ **TRAIN** (La Consola Industrial de Ejecución Rápida One-Tap).
3. 🛡️ **LEAGUE** (La Liga de Honor y Constancia).
4. 🏬 **ARMORY** (Desbloqueo de Materiales para la Credencial).

*Módulos eliminados:* Nutrition (0% pertenencia a Forge), Evidence separado (fusionado en Passport), Recovery separado (fusionado en Bodygraph/Passport).
