# Sistema de Rangos y Gamificación (Rank Engine)

## 1. Escala de Rangos (Rank Ladder)

El sistema de rangos de **Forge** recompensa la constancia, el volumen total y la intensidad comprobada de los levantamientos.

| Rango | XP Requerida | Misión de Ascenso Requerida |
|-------|--------------|-----------------------------|
| **Bronce I** | $0$ | Completar 1º entrenamiento |
| **Bronce II** | $500$ | Registrar 3 entrenamientos |
| **Bronce III** | $1,200$ | Racha de 5 días activa |
| **Plata I** | $2,500$ | Acumular $10,000\text{ kg}$ levantados |
| **Plata II** | $4,500$ | Registrar 15 entrenamientos completados |
| **Plata III** | $7,000$ | Superar 1RM en 2 ejercicios |
| **Oro I** | $10,500$ | Acumular Racha de 3 semanas (Constancia $\ge 80\%$) |
| **Oro II** | $15,000$ | Levantar $50,000\text{ kg}$ en volumen acumulado |
| **Oro III** | $21,000$ | Entrenar 4 semanas seguidas sin fallar |
| **Platino I - III** | $28,000 - 45,000$ | Misiones de sobrecarga progresiva continua |
| **Diamante** | $65,000$ | Top 10% de consistencia del Círculo |
| **Gladiador** | $100,000$ | Demostrar 90 días de entrenamiento ininterrumpido |
| **Inmortal** | Top 1% Global | Rango de Leyenda reservado para la élite de constancia |

---

## 2. Fórmulas de Obtención de Experiencia (XP)

Por cada sesión de entrenamiento completada, el motor calcula los puntos de experiencia ($XP$) acumulados utilizando la siguiente ecuación:

\[
XP_{sesion} = XP_{base} + XP_{volumen} + XP_{intensidad} + XP_{racha}
\]

1. **$XP_{base}$:** $100\text{ XP}$ por completar una sesión válida de al menos 20 minutos.
2. **$XP_{volumen}$:** $\lfloor \text{Volumen Total en kg} \times 0.01 \rfloor$ (Max $150\text{ XP}$ por sesión para evitar sobreentrenamiento).
3. **$XP_{intensidad}$:** $+25\text{ XP}$ por cada serie registrada `at_failure` ($RPE = 10$).
4. **$XP_{racha}$:** Multiplicador por racha activa ($+10\%$ por semana ininterrumpida de entrenamiento, hasta un tope de $+50\%$).
