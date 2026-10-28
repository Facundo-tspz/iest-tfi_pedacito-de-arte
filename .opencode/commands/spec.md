---
description: Crea la especificación de una funcionalidad a partir de los requisitos, sin escribir código.
agent: build
---

Vas a ejecutar únicamente la subfase **Spec** del ciclo SDD.

Funcionalidad solicitada: `$ARGUMENTS`

Antes de escribir:

1. Leer `AGENTS.md`, `docs/CONSTITUCION.md`, `docs/REGLAS-IA.md`, `docs/ROADMAP.md`, `docs/PROGRESO.md`, los documentos `01` a `10` y la spec anterior si existe.
2. Identificar la fase del roadmap a la que pertenece.
3. No escribir código, no instalar dependencias y no tocar Supabase ni Netlify.

Crear `specs/NNN-nombre/spec.md` con:

- Contexto y problema.
- Historias de usuario.
- Requisitos funcionales en notación EARS.
- Requisitos no funcionales aplicables.
- Casos límite.
- Fuera de alcance.
- Dependencias con otras specs.
- Criterios de aceptación verificables.
- Matriz de trazabilidad RF → criterio.
- Preguntas abiertas.

Reglas:

- Usar numeración secuencial `001`, `002`, etc.
- No inventar requisitos: si falta información, marcarla como pregunta abierta.
- No modificar la spec aprobada de otra funcionalidad.
- Al terminar, actualizar `docs/PROGRESO.md` y detenerse.
- Pedir aprobación antes de pasar a `/clarificar`.
