---
description: Revisa una spec como QA, detecta ambigüedades y registra las decisiones del estudiante.
agent: build
---

Vas a ejecutar únicamente la subfase **Clarificación** del ciclo SDD.

Spec objetivo: `$ARGUMENTS`

Si no se indica una spec, usar la fase activa registrada en `docs/PROGRESO.md`.

Antes de escribir:

1. Leer la spec completa y los documentos de contexto relacionados.
2. Revisar la spec como si fueras QA: ambigüedades, contradicciones, requisitos no verificables, casos límite faltantes, dependencias ocultas y riesgos de seguridad.
3. No escribir código ni modificar la spec sin aprobación.

Crear o actualizar `specs/NNN-nombre/clarificacion.md` con:

- Hallazgos numerados.
- Severidad: alta, media o baja.
- Pregunta concreta para el estudiante.
- Decisión tomada por el estudiante.
- Impacto en la spec.
- Estado: pendiente, resuelto o descartado.

Reglas:

- No avanzar si hay hallazgos de severidad alta sin resolver.
- No asumir decisiones de producto, precios, roles o seguridad.
- Al terminar, actualizar `docs/PROGRESO.md` y detenerse.
- Pedir aprobación antes de pasar a `/plan`.

> Nota: `/plan` se ejecutará cuando exista el comando o se solicitará explícitamente. La clarificación no implementa código.
