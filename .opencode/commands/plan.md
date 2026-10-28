---
description: Convierte una spec clarificada en plan técnico y tareas verificables, sin escribir código.
agent: build
---

Vas a ejecutar únicamente la subfase **Plan y Tareas** del ciclo SDD.

Spec objetivo: `$ARGUMENTS`

Si no se indica una spec, usar la fase activa registrada en `docs/PROGRESO.md`.

Antes de escribir:

1. Leer la spec, la clarificación y los documentos de arquitectura y datos.
2. Verificar que no queden hallazgos de severidad alta sin resolver.
3. No escribir código, no instalar dependencias y no modificar la base de datos.

Crear o actualizar:

- `specs/NNN-nombre/plan.md`: enfoque técnico, capas afectadas, archivos previstos, contratos de datos, riesgos y estrategia de tests. Sin código.
- `specs/NNN-nombre/tasks.md`: tareas de menos de 30 minutos, ordenadas, cada una con “Listo cuando”, archivos esperados, test asociado y dependencia.

Reglas:

- Cada tarea debe mapear a un RF o criterio de aceptación.
- No mezclar tareas de varias specs.
- No crear tareas de fases futuras.
- Si el plan requiere un cambio de alcance, detenerse y usar `/cambio`.
- Al terminar, actualizar `docs/PROGRESO.md` y detenerse.
- Pedir aprobación antes de implementar.
