# Dominio de Entrenamiento (Training Domain)

## 1. Responsabilidad del Dominio

El **Training Domain** es el núcleo de Forge encargado de gestionar el catálogo de ejercicios, la estructura de entrenamientos activos, el registro de series (*sets*) y las fórmulas fundamentales de fuerza.

---

## 2. Modelos y Conceptos Clave

### **Entrenamiento (Workout)**
Un entrenamiento representa una sesión iniciada por un atleta.
- **Estados:** `in_progress` | `completed` | `discarded`
- **Atributos:** Fecha de inicio, fecha de fin, duración total (segundos), notas, volumen total acumulado ($kg$) y XP obtenida.

### **Serie (WorkoutSet)**
Unidad mínima de esfuerzo registrado.
- **Tipos de Serie (`set_type`):**
  1. **`warmup` (Calentamiento):** Acondicionamiento de articulaciones y sistema nervioso. No computa para la fatiga del volumen efectivo ni XP de trabajo máximo.
  2. **`working` (Efectiva):** Serie dentro del rango objetivo de intensidad para hipertrofia o fuerza.
  3. **`failure` (Al Fallo):** Serie efectiva llevada hasta la incapacidad concéntrica momentánea ($RPE = 10$). Otorga bonificador de XP (+25%).
  4. **`drop_set` (Descendente):** Serie realizada inmediatamente después de una serie efectiva reduciendo el peso en un $20\%-30\%$ sin descanso.

---

## 3. Fórmulas de Fuerza y 1RM Estimado

Forge utiliza las fórmulas universales de **Epley** y **Brzycki** para calcular el **One-Rep Max (1RM)** estimado en tiempo real sin requerir que el usuario realice levantamientos máximos reales.

### **Fórmula de Epley ($Reps > 1$)**
\[
1RM_{Epley} = w \times \left(1 + \frac{r}{30}\right)
\]
*Donde $w$ es el peso en $kg$ y $r$ es el número de repeticiones.*

### **Fórmula de Brzycki ($Reps \le 10$)**
\[
1RM_{Brzycki} = w \times \left(\frac{36}{37 - r}\right)
\]

### **Volumen Total de la Sesión**
\[
V_{total} = \sum_{i=1}^{n} (peso_i \times repeticiones_i) \quad \forall \text{ series donde } set\_type \neq 'warmup'
\]

---

## 4. Reglas de Negocio del Dominio

1. **Auto-fill de Sesión Previa:** Al agregar un ejercicio a un entrenamiento activo, la app propone automáticamente las repeticiones y pesos usados en la última sesión registrada para dicho ejercicio.
2. **Autoguardado Local:** Cada serie marcada como `is_completed = true` se persiste en almacenamiento local inmediatamente para evitar pérdida de datos si la batería del dispositivo se agota.
3. **Cronómetro de Descanso:** Al completar una serie, la app activa automáticamente un temporizador configurable (ej. 90s para aislados, 180s para compuestos).
