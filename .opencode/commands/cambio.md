---
description: Gestiona un requisito nuevo actualizando primero la spec y después el plan.
agent: build
---

Vas a ejecutar la subfase **Cambio** del ciclo SDD.

Cambio solicitado: `$ARGUMENTS`

Protocolo obligatorio:

1. Identificar la spec afectada.
2. Explicar por qué el cambio no estaba cubierto.
3. Actualizar primero `spec.md` con el requisito nuevo en EARS.
4. Registrar el cambio en `clarificacion.md` o en una sección de historial de la spec.
5. Actualizar `plan.md` y `tasks.md` si corresponde.
6. No escribir código hasta que la spec actualizada sea aprobada.
7. Si el cambio afecta una fase ya validada, indicar qué validaciones deben repetirse.

Reglas:

- No usar el cambio para justificar código ya escrito sin spec.
- No alterar el alcance de otra fase.
- No borrar requisitos anteriores sin decisión explícita.
- Al terminar, actualizar `docs/PROGRESO.md` y detenerse.
- Pedir aprobación antes de implementar.
