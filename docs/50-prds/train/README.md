# PRD: Módulo de Entrenamiento Activo (Train Engine)

## 1. Resumen Ejecutivo
El módulo **Train** es el corazón operativo de la app móvil de Forge. Su objetivo es permitir al atleta registrar sus series de gimnasio con la menor cantidad de taps posible, sin distracciones y con soporte completo fuera de línea.

---

## 2. Requerimientos Funcionales

| ID | Requerimiento | Descripción | Prioridad |
|----|---------------|-------------|-----------|
| **FT-01** | Selección de Rutina o Sesión Libre | El usuario puede iniciar una rutina preguardada (Push/Pull/Legs) o crear una sesión en blanco. | P0 |
| **FT-02** | Buscador y Filtrado de Ejercicios | Búsqueda por nombre o filtro por grupo muscular (Pecho, Espalda, Pierna, etc.) e implemento. | P0 |
| **FT-03** | Auto-completado de Cargas Anteriores | Al agregar un ejercicio, los campos de peso y repeticiones se autorellenan con los valores logrados en la sesión anterior. | P0 |
| **FT-04** | Modificador de Tipo de Serie | El usuario puede presionar el chip de tipo de serie para cambiar entre `W` (Warmup), `R` (Regular), `F` (Failure) y `D` (Drop Set). | P0 |
| **FT-05** | Cronómetro Automático de Rest | Al marcar el checkbox de serie completada, se inicia un temporizador modal o en barra superior con alarma sutil. | P1 |
| **FT-06** | Finalización y Resumen de Sesión | Al presionar "Finalizar", se calcula automáticamente el volumen total ($kg$), XP ganada y se muestra la pantalla de victoria. | P0 |

---

## 3. Experiencia de Usuario & Atajos en Gimnasio (UX & Usability)

- **Teclado numérico optimizado:** El teclado para peso/reps incluye botones de acceso rápido (`+2.5 kg`, `+5 kg`, `-2.5 kg`).
- **Feedback Háptico:** Modos de vibración diferenciados al completar una serie y al expirar el tiempo de descanso.
- **Modo Oscuro OLED:** Interfaz nativa en tonos oscuros profundos para optimizar batería durante la sesión de entrenamiento.
