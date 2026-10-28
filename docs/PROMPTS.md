# Registro de Prompts y Errores de IA

Este archivo documenta los pedidos más importantes realizados a la IA, las decisiones tomadas y, como mínimo, tres errores detectados con su corrección. Es evidencia para el TFI y para la defensa oral.

---

## 1. Prompts relevantes

| Fecha | Fase / spec | Prompt o pedido resumido | Resultado | Decisión humana |
| :--- | :--- | :--- | :--- | :--- |
| 2026-10-28 | F0 | Analizar el kit del TP3, la consigna del TFI y proponer arquitectura para Netlify + Supabase. | Plan de arquitectura, roles, CMS y roadmap. | Se aprobó React + Vite + Supabase + Netlify, con auth propia y 3 specs. |
| 2026-10-28 | F0 | Crear constitución, roadmap, reglas de IA y arnés del agente. | Documentos base y comandos. | Pendiente de revisión final del estudiante. |

> Completar una fila por cada pedido importante durante F1 a F6.

---

## 2. Errores de la IA

Se requieren al menos tres casos. No inventar casos: registrar solo errores reales ocurridos durante el desarrollo.

### Caso 1

- **Fase / spec:**
- **Qué hizo mal la IA:**
- **Cómo se detectó:**
- **Corrección aplicada:**
- **Archivo o commit:**
- **Aprendizaje:**

### Caso 2

- **Fase / spec:**
- **Qué hizo mal la IA:**
- **Cómo se detectó:**
- **Corrección aplicada:**
- **Archivo o commit:**
- **Aprendizaje:**

### Caso 3

- **Fase / spec:**
- **Qué hizo mal la IA:**
- **Cómo se detectó:**
- **Corrección aplicada:**
- **Archivo o commit:**
- **Aprendizaje:**

---

## 3. Decisiones que evitó la revisión humana

| Fecha | Propuesta de la IA | Riesgo detectado | Decisión final |
| :--- | :--- | :--- | :--- |
| 2026-10-28 | Usar Supabase Auth para el panel. | El estudiante pidió auth propia sin Gmail ni Supabase Auth. | Se implementará auth propia con Functions, hash `scrypt` y roles. |
| 2026-10-28 | Persistir pedidos en Supabase. | El alcance es solo encargos por WhatsApp, sin historial. | No se persisten encargos en Fase 1. |
| 2026-10-28 | Mostrar precios exactos sin aclaración. | Los precios se cargan después y la personalización puede modificarlos. | Se muestra precio base y total estimado; se confirma por WhatsApp. |

---

## 4. Registro de uso de IA generativa

Las piezas de imagen, video y gráficos se registran en `multimedia/FICHAS-IA.md`. Este archivo no reemplaza esas fichas.
