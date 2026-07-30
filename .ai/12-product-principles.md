# Forge Product Principles (La Constitución de Forge)

Este documento es la ley suprema de producto de Forge. Define los criterios objetivos e inmutables para la toma de decisiones. Cualquier funcionalidad, pantalla o refactorización que no pueda justificarse bajo estos principios debe ser descartada de inmediato.

---

## Principios de Producto

### 1. Identity Before Statistics
- **Regla:** Ningún dato cuantitativo se muestra aislado; toda métrica debe servir como evidencia directa para construir o respaldar la identidad del atleta.
- **Explicación:** Las apps de gimnasio tradicionales muestran números fríos y gráficos sin contexto. En Forge, los números no son el fin, son la prueba inalterable de quién te has convertido.
- **Ejemplo correcto:** "Rango Oro III respaldado por 42,560 kg de volumen mensual verificado."
- **Ejemplo incorrecto:** "Has quemado 450 kcal hoy."

---

### 2. Evidence Over Promises
- **Regla:** Forge solo reconoce y celebra lo que ha sido verificado físicamente mediante datos objetivos de entrenamiento; no celebra intenciones ni estimaciones.
- **Explicación:** Protege la autoridad del producto. Evita la motivación vacía, los aplausos artificiales y los cálculos estéticos o calóricos imprecisos.
- **Ejemplo correcto:** "Sesión de sobrecarga validada: +185 XP asignados tras completar 4 series al fallo."
- **Ejemplo incorrecto:** "¡Vas a lograr un gran cuerpo este verano! ¡Sigue así!"

---

### 3. One Uncontested Protagonist
- **Regla:** Cada vista o lienzo debe poseer un único héroe visual e informativo; ningún elemento secundario puede competir en jerarquía o volumen con el objeto principal.
- **Explicación:** Evita la sobrecarga cognitiva de los dashboards tradicionales. Garantiza que la mirada del usuario descanse sobre la credencial del Pasaporte o la métrica dominante sin distracción.
- **Ejemplo correcto:** El Pasaporte de Atleta lidera la pantalla como elemento Nivel 0, flanqueado por aire y espacio negativo.
- **Ejemplo incorrecto:** Una pantalla dividida en 6 tarjetas cuadradas con el mismo tamaño, borde y resplandor.

---

### 4. Monastic Calm & Zero Noise
- **Regla:** Forge mantiene un silencio visual absoluto; se prohíbe el uso de emojis informales, barras de herramientas saturadas, pop-ups invasivos o gamificación infantil.
- **Explicación:** Protege la experiencia de ser percibida como un videojuego arcade o una app convencional. Mantiene un ambiente monástico, elegante y enfocado en la disciplina física.
- **Ejemplo correcto:** "Directiva diaria: Completar 1 serie al fallo concéntrico (RPE 10)."
- **Ejemplo incorrecto:** "¡¡¡Enhorabuena bro!!! 🚀🔥 ¡Aplastaste el entrenamiento hoy! 🎉"

---

### 5. Architectural Whitespace
- **Regla:** El espacio negativo no es espacio no utilizado; es un elemento estructural activo que otorga estatus, jerarquía y descanso visual a la información.
- **Explicación:** Obliga a mantener espaciados generosos (48px - 64px) entre bloques primarios. Evita apretar elementos para "aprovechar la pantalla".
- **Ejemplo correcto:** Una separación de 64px entre el Pasaporte y el timeline de evidencia para permitir una pausa editorial.
- **Ejemplo incorrecto:** Llenar los márgenes con mini-widgets de clima, frases motivacionales o gráficos secundarios.

---

### 6. Surgical Color Purpose
- **Regla:** Ningún color se aplica de forma decorativa; cada acento luminoso debe responder estrictamente a un estado funcional (Cyan = XP, Esmeralda = PR, Ámbar = Racha/Directiva, Carmesí = Fatiga/Déficit).
- **Explicación:** Evita el ruido neón y mantiene la estética obsidiana/titanio sobria.
- **Ejemplo correcto:** Un badge Cyan de 1px que indica la velocidad de sobrecarga progresiva activa.
- **Ejemplo incorrecto:** Aplicar un degradado multicolor a las tarjetas para que "luzcan más modernas".

---

### 7. The Immutable Line of Evidence (The Spine)
- **Regla:** Todo evento histórico o hito de entrenamiento debe conectarse visual y conceptualmente a la línea vertical de evidencia ininterrumpida.
- **Explicación:** Garantiza que la experiencia sea narrativa. El usuario no ve listas aisladas, sino la cadena cronológica de su evolución.
- **Ejemplo correcto:** Una línea de titanio de 2px de la que nacen los nodos numerados `[ 01 ]`, `[ 02 ]`, `[ 03 ]`.
- **Ejemplo incorrecto:** Tarjetas sueltas flotando en un grid tipo Masonry sin conexión cronológica.

---

### 8. Honest Quantitative Telemetry
- **Regla:** Las métricas deben presentarse en su formato matemático puro (monospaciado, unidades exactas), sin alterar escalas para inflar el progreso.
- **Explicación:** Genera confianza absoluta en el usuario. Si Forge dice que levantaste 42,560 kg o que tu 1RM es 105 kg, el dato es matemáticamente indiscutible.
- **Ejemplo correcto:** "105.00 KG 1RM (Fórmula Epley/Brzycki integrada)."
- **Ejemplo incorrecto:** "¡Fuerza súper alta! ¡Estás al 99% del máximo!"

---

### 9. Tactile Physical Resistance
- **Regla:** Cada interacción en Forge debe ofrecer una respuesta micro-mecánica (escala 0.97x, físicas de resorte en 150ms) que simule accionar hardware de alta precisión.
- **Explicación:** Convierte la pantalla táctil en una consola física de titanio y obsidiana.
- **Ejemplo correcto:** Al presionar "COMPLETAR SERIE", la fila se comprime suavemente en 150ms con un destello esmeralda de 1px.
- **Ejemplo incorrecto:** Transiciones de pantalla lentas con efectos de rotación 3D o desvanecimientos festivos.

---

### 10. Long-term Permanence
- **Regla:** Todo componente, tipografía o interfaz debe diseñarse para durar 10 años sin parecer obsoleto o sujeto a modas efímeras.
- **Explicación:** Protege a Forge de caer en tendencias de diseño pasajeras (*Neumorfismo, Frutiger Aero, Glassmorphism recargado*).
- **Ejemplo correcto:** Paneles monolíticos de titanio oscuro con tipografía Helvetica/SF Pro/Inter limpia.
- **Ejemplo incorrecto:** Botones 3D de plástico con sombras de colores y texto inclinado.

---

# Product Review Checklist

Antes de fusionar cualquier Pull Request o aprobar un diseño, responda la siguiente checklist:

1. □ ¿Existe un único héroe visual (Nivel 0) claramente identificable en la pantalla?
2. □ ¿Cada métrica o dato mostrado aporta evidencia real a la identidad del atleta?
3. □ ¿Se respetaron las reglas funcionales de color (Cyan/Esmeralda/Ámbar/Carmesí) sin uso decorativo?
4. □ ¿Se mantuvo la espina vertical de evidencia (`LeftAnchorSpine`) en el margen de la estructura?
5. □ ¿El espacio entre secciones principales es de al menos 48px a 64px?
6. □ ¿Se eliminó cualquier emoji del sistema operativo (`🏅`, `🔥`, `🎯`)?
7. □ ¿Los números y telemetrías utilizan estrictamente tipografía monospaciada?
8. □ ¿Los botones e interacciones responden con micro-escala mecánica (0.97x) en 150ms?
9. □ ¿Existe algún banner, ilustración o adorno que no cumpla una función técnica?
10. □ ¿El tono de voz es sobrio, seguro y monástico sin exclamaciones infantiles?
11. □ ¿La tarjeta del Pasaporte mantiene su proporción metálica de 1.58 : 1?
12. □ ¿La jerarquía visual se limita a un máximo de 3 niveles en esta vista?
13. □ ¿Podría eliminarse algún elemento secundario sin perder el significado de la pantalla?
14. □ ¿Esta pantalla funciona con la misma claridad en modo oscuro OLED puro (`#030305`)?
15. □ ¿Se utilizaron exclusivamente componentes primitivos y moléculas de `@forge/ui`?
16. □ ¿La pantalla incluye estados de carga, error y estado vacío sin spinners circulares genéricos?
17. □ ¿Se evitó cualquier referencia a calorías, estética superficial o comparaciones no saludables?
18. □ ¿Las animaciones duran menos de 350ms y utilizan curvas de resorte amortiguadas?
19. □ ¿El bisel especular superior de 1px está presente en los contenedores primarios?
20. □ ¿Esta funcionalidad hace que Forge se parezca más a una app de gimnasio tradicional? *(Si la respuesta es SÍ, rechazar de inmediato).*

---

# Auditoría Crítica del Producto (Principal Design Review)

Como Principal Product Designer (ex-Apple, Linear, Stripe, Notion), he auditado críticamente la visión completa de Forge para identificar riesgos, contradicciones y complejidades antes de la fase de código.

---

### 1. Riesgo Identificado: "El Monolito Desconectado del Flujo Diario"
- **Fallo:** Tener una tarjeta espectacular como el Pasaporte en la cima puede convertirla en un adorno estático si el usuario solo entra a la app para anotar series rápido mientras descansa en el gimnasio.
- **Riesgo:** Que en el uso diario el usuario ignore el Pasaporte y salte directo a la pantalla de entrenamiento, volviendo a la app una herramienta utilitarian genérica.
- **Solución Obligatoria:** Hacer que el Pasaporte **reaccione en tiempo real** durante la sesión de entrenamiento. Cada serie completada debe emitir un impulso de XP que ilumine sutilmente la credencial del Pasaporte desde la barra superior, conectando el esfuerzo del minuto a minuto con la identidad del Pasaporte.

---

### 2. Riesgo Identificado: "Over-Engineering de Lenguaje Sci-Fi (`NODE // 01`, `TELEMETRY`)"
- **Fallo:** Uso excesivo de términos como `NODE // 01`, `PROTOCOL`, `TELEMETRY SCANNER`. Esto contradice el principio de *Monastic Calm* y roza el cliché ciberpunk de videojuego.
- **Riesgo:** Que atletas serios o de mayor edad sientan que la app es un juguete para gamers en lugar de una herramienta profesional de rendimiento.
- **Solución Obligatoria:** Simplificar el lenguaje textual. Reemplazar `NODE // 01 • ATHLETE OBSIDIAN SLAB` por etiquetas sobrias en español: `[ 01 ] PASAPORTE DE ATLETA` y `[ 02 ] EVIDENCIAS VERIFICADAS`. La sofisticación debe estar en la geometría y la tipografía, no en la jerga de ciencia ficción.

---

### 3. Riesgo Identificado: "Complejidad de Mantenimiento de Variantes en `@forge/ui`"
- **Fallo:** Intentar crear decenas de componentes atómicos hiper-específicos para cada caso antes de tener la aplicación real corriendo con datos de Supabase.
- **Riesgo:** Bloqueo por sobre-diseño (*Design System Paralysis*), donde se invierten semanas manteniendo librerías de componentes aislados que luego cambian al conectar las API reales.
- **Solución Obligatoria:** Mantener la librería `@forge/ui` limitada estrictamente a **8 componentes fundamentales** (`ForgeButton`, `ForgeCard`, `ForgeBadge`, `ForgeProgressBar`, `LeftAnchorSpine`, `StatTile`, `QuestItemCard`, `ObsidianPassportSlab`). Prohibido añadir nuevos componentes sin una orden de trabajo expresamente justificada.

---

### 4. Riesgo Identificado: "Incompatibilidad de Glassmorphism en Móviles Gama Media"
- **Fallo:** El uso masivo de `backdrop-filter: blur(32px)` y capas de cristal súperpuestas puede degradar los FPS en dispositivos Android de gama media/baja durante los entrenamientos.
- **Riesgo:** Lag en la interfaz táctil cuando el atleta tiene las manos sudadas y necesita anotar una serie rápidamente.
- **Solución Obligatoria:** Implementar un *fallback* sólido y elegante en CSS/StyleSheet: en dispositivos móviles o modo de ahorro de energía, reemplazar el desenfoque de cristal por superficies sólidas opacas en titanio oscuro (`#121216`) con borde especular de 1px. El diseño no perderá su elegancia y correrá a 120 FPS constantes.

---

### 5. Juicio Final sobre los Principios de Producto
La estructura de 10 principios y la checklist de 20 preguntas garantizan que Forge se mantenga **inmune a la mediocridad**. Los riesgos identificados quedan resueltos mediante simplificación de lenguaje, optimización de FPS y conexión en tiempo real entre el entrenamiento activo y la credencial del Pasaporte.
