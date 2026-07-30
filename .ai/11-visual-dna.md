# Forge Visual DNA v1.0

Este documento contiene las reglas de diseño objetivas, matemáticas y obligatorias para la interfaz de Forge. Ninguna decisión estética puede quedar a discreción subjetiva de un diseñador o de un modelo de IA.

---

## 1. Geometry System

### Base Grid & Escala Matemática
- **Unidad Base:** Grid estricto de **8px**. Todos los espaciados, paddings, margins y dimensiones deben ser múltiplos de 8px (excepción: micro-espaciados de 4px para badges y chips).
- **Escala de Espaciado:**
  - `space-xs`: 4px
  - `space-sm`: 8px
  - `space-md`: 16px
  - `space-lg`: 24px
  - `space-xl`: 32px
  - `space-2xl`: 48px
  - `space-3xl`: 64px
  - `space-4xl`: 96px

### Border Radius (Escala de 4 Niveles)
- **`radius-sm` (6px):** Badges, micro-chips de discos, etiquetas RPE.
- **`radius-md` (10px):** Botones, inputs, campos de texto, elementos interactivos primarios.
- **`radius-lg` (16px):** Filas de contenido, tarjetas secundarias, contenedores internos.
- **`radius-xl` (24px):** El Pasaporte de Atleta, modales flotantes y paneles dominantes.
- *Prohibición:* Prohibido utilizar border-radius intermedios (ej. 8px, 12px, 18px, 20px).

### Dimensiones y Tamaños Mínimos
- **Touch Target Mínimo (Móvil & Web):** 44px × 44px.
- **Altura de Botón Standard:** 44px (`size-md`), 36px (`size-sm`), 52px (`size-lg`).
- **Altura de Navbar Top:** 64px.
- **Ancho Máximo del Contenedor Principal (Web):** 1280px centrado.
- **Aspect Ratios Canónicos:**
  - `Pasaporte Slab`: 1.58 : 1 (proporción áurea de tarjeta metálica).
  - `Stat Tile`: 1.2 : 1.
  - `Radar Biomecánico`: 1 : 1.5.

---

## 2. Visual Signature

### Opciones Evaluadas:
1. *Opción A:* Marco de neón alrededor del viewport. (Rechazado: sobrecarga visual).
2. *Opción B:* Patrón de puntos matriciales en los bordes. (Rechazado: imitación directa de Nothing).
3. *Opción C:* **The Left Anchor Spine & Specular Rim Highlight.** (SELECCIONADA).

### Selección & Especificación Técnica de la Firma Visual
Toda pantalla en Forge debe llevar el elemento exclusivo: **"The Left Anchor Spine & Specular Rim Highlight"**.

#### Reglas de Ejecución:
1. **La Espina Vertical de Evidencia (Left Anchor Spine):**
   - Una línea guía vertical ininterrumpida de 2px de grosor en tono titanio (`rgba(255, 255, 255, 0.08)`) alineada al margen izquierdo de la estructura principal.
   - Cada hito, misión o serie completada nace de esta línea mediante un nodo cuadrado de 6px × 6px con una micro-etiqueta monospaciada `[ 01 ]`, `[ 02 ]`, `[ 03 ]`.
2. **El Bisel Especular Superior (Specular Rim Highlight):**
   - El borde superior de todo contenedor principal o tarjeta debe llevar un resplandor especular de 1px producido por:
     `background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)`

---

## 3. Surface Language

- **Fondo Base OLED:** `#030305` absoluto en todo el viewport.
- **Superficie de Tarjetas (`ForgeCard`):** `rgba(12, 12, 16, 0.65)` con `backdrop-filter: blur(32px)`.
- **Borde Perimetral:** 1px continuo en `rgba(255, 255, 255, 0.07)`.
- **Relieve Specular Interno:** `box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08)`.
- **Elevación Hover:** Transición de `-2px` en el eje Y y aumento de opacidad del bisel especular a `rgba(255, 255, 255, 0.25)`.
- **Respuesta al Clic / Tap:** Micro-compresión mecánica de `scale: 0.97` en 150ms.
- **Prohibición:** Prohibido el uso de sombras proyectadas con color o difuminados opacos de estilo Material Design.

---

## 4. Motion Language

- **Duración Estándar:** 150ms (micro-interacciones) a 250ms (transiciones de pantalla). Máximo absoluto: 350ms.
- **Curva de Easing Obligatoria:** `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out inercial).
- **Físicas de Resorte (Framer Motion Spring Defaults):**
  - Botones & Taps: `stiffness: 400`, `damping: 25`, `mass: 0.8`.
  - Tarjetas & Paneles: `stiffness: 300`, `damping: 30`, `mass: 1.0`.
- **Aparición (Entry):** `opacity: 0` -> `opacity: 1`, `y: 12px` -> `y: 0px`.
- **Desaparición (Exit):** `opacity: 1` -> `opacity: 0`, `y: 0px` -> `y: -8px` (duración: 150ms).
- **Contadores de Números:** Interpolación continua de valores numéricos sin saltos bruscos.
- **Navegación:** Transición lateral limpia de `x: 16px` -> `x: 0px` con fade atenuado.
- **Loaders:** Prohibido el uso de spinners circulares genéricos. Utilizar un pulso lineal sutil de 1.5s sobre la espina de evidencia.

---

## 5. Typography Hierarchy

| Nivel | Rol | Tamaño (px) | Peso | Tracking | Line Height | Font Family |
|---|---|---|---|---|---|---|
| **Level 0** | Métrica Dominante | 56px | 900 Black | -0.04em | 1.0 | Inter / SF Pro |
| **Level 1** | Título Primario (H1) | 36px | 900 Black | -0.02em | 1.1 | Inter / SF Pro |
| **Level 2** | Título Tarjeta (H2) | 18px | 800 ExtraBold | 0.02em | 1.3 | Inter / SF Pro |
| **Level 3** | Cuerpo de Texto | 14px | 500 Medium | 0.0em | 1.5 | Inter / SF Pro |
| **Level 4** | Telemetría / HUD | 11px | 700 Bold | 0.15em (UPPERCASE) | 1.2 | Monospace |

---

## 6. Color Rules

Queda estrictamente prohibido aplicar color de forma decorativa. Cada acento luminoso responde a una única regla funcional:

- **Cyan (`#00f0ff`):** Únicamente para el sistema de XP, telemetría activa, velocidad de sobrecarga y botones primarios de acción.
- **Emerald (`#00ff9d`):** Únicamente para confirmación de récords personales (*PRs*), sobrecarga completada y estados de recuperación óptima.
- **Amber (`#ffaa00`):** Únicamente para la racha de constancia activa, directivas diarias (*Quests*) e indicadores de alerta leve.
- **Crimson (`#ff0055`):** Únicamente para zonas musculares descuidadas, errores críticos de formulario o alertas de fatiga extrema.
- **Violet (`#7000ff`):** Únicamente para el nivel máximo de atleta (*Inmortal*) y componentes de rango Élite.
- **Gris Monocromo (`#52525b` / `#a1a1aa`):** Para todo el resto de la interfaz (textos secundarios, bordes y separadores).

---

## 7. Component Grammar

- **Cards (`ForgeCard`):** Vidrio de titanio `rgba(12, 12, 16, 0.65)`, borde 1px, bisel especular superior, padding de 28px.
- **Buttons (`ForgeButton`):**
  - *Primary:* Fondo `#00f0ff`, texto negro `#000000` peso 900, sombra de resplandor Cyan.
  - *Tactical:* Fondo `rgba(24, 24, 27, 0.8)`, texto `#f4f4f5`, borde 1px `rgba(255, 255, 255, 0.1)`.
  - *Micro-scale:* `whileTap: { scale: 0.97 }`.
- **Inputs (`ForgeInput`):** Fondo `#09090b`, borde `rgba(255, 255, 255, 0.1)`, foco con resplandor Cyan de 1px.
- **Badges (`ForgeBadge`):** Radius de 6px, texto monospaciado en 10px uppercase, padding 4px × 10px, 10% opacidad de fondo del color de acento.
- **Charts / Heatmap:** Líneas vectoriales de 1px, cero fondos de relleno sólidos.
- **Navigation:** Barra esmerilada con `backdrop-filter: blur(32px)`, padding 14px × 28px, bisel especular de 1px.
- **Passport:** Relación de aspecto 1.58 : 1, elevación flotante, medidor de rango HUD integrado.

---

## 8. Information Hierarchy

1. **Lo que el usuario ve primero (Foco Primario):** La Métrica Dominante (Level 0) o la tarjeta del Pasaporte de Atleta.
2. **Lo que ve después (Foco Secundario):** Las Directivas Diarias y el Historial de Evidencia.
3. **Lo que nunca debe competir:** Las micro-etiquetas de telemetría HUD y la barra de navegación (deben permanecer atenuadas en gris monocromo hasta que se interactúe con ellas).

---

## 9. Empty Space

- El espacio vacío es un elemento estructural activo de jerarquía.
- Se exige un espaciado mínimo de **48px a 64px** entre bloques dominantes.
- En tarjetas internas, el padding no puede ser menor a **24px**.
- Prohibido rellenar espacios vacíos con ilustraciones, banners promocionales o marca de agua decorativa.

---

## 10. Forge Principles

1. **Forge nunca** utiliza emojis del sistema operativo (`🏅`, `🔥`, `🎯`).
2. **Forge nunca** muestra barras de progreso sin muescas tácticas o telemetría numérica.
3. **Forge siempre** utiliza la espina vertical de evidencia (*Left Anchor Spine*) en el margen izquierdo.
4. **Forge siempre** valida que los números de volumen y 1RM dominen visualmente la pantalla.
5. **Forge evita** el uso de más de 3 niveles de jerarquía tipográfica en una misma vista.
6. **Forge evita** colores neón decorativos sin una función de estado estricta.
7. **Forge prioriza** el espacio negativo amplio sobre la alta densidad de tarjetas apretadas.
8. **Forge prioriza** la tipografía monospaciada para todos los datos cuantitativos y de tiempo.
9. **Forge jamás** utiliza animaciones flashy de más de 350ms o con efectos de rebote infantil.
10. **Forge prioriza** la identidad de una herramienta de ingeniería de precisión sobre las convenciones de las apps de gimnasio tradicionales.
