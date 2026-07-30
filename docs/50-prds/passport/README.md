# PRD: Pasaporte del Atleta & Perfil de Progreso (Passport & Progress)

## 1. Resumen Ejecutivo
El **Athlete Passport** es la representación gráfica y pública del progreso físico y la constancia del usuario. Sirve como su "tarjeta de identidad deportiva" en la comunidad Forge.

---

## 2. Requerimientos Funcionales

| ID | Requerimiento | Descripción | Prioridad |
|----|---------------|-------------|-----------|
| **FP-01** | Tarjeta de Rango e Insignia | Muestra el rango actual (*Bronce* a *Inmortal*), la barra de progreso de XP al siguiente nivel y la medalla visual. | P0 |
| **FP-02** | Gráfico de Sobrecarga Progresiva | Visualización gráfica del volumen acumulado mensual y 1RM estimado por ejercicio clave (Sentadilla, Banca, Peso Muerto). | P0 |
| **FP-03** | Calendario de Constancia (Heatmap) | Mapa de calor estilo GitHub que muestra los días entrenados en el año actual. | P0 |
| **FP-04** | Indicador de Racha (Streak Badge) | Muestra el número de semanas consecutivas cumpliendo la frecuencia meta de entrenamiento. | P0 |
| **FP-05** | Galería Privada de Comparativa Corporal | Registro de peso corporal e fotos de progreso (almacenamiento encriptado y privado). | P1 |

---

## 3. Criterios de Aceptación

- El gráfico de 1RM debe calcularse dinámicamente llamando a la librería `@forge/core`.
- La información del Pasaporte debe poder compartirse en formato de imagen/story estilizada para redes sociales o dentro de los *Circles* de Forge.
