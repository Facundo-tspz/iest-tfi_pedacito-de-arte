---
description: Verifica una spec contra el código, los tests y la build, y genera el informe de validación.
agent: build
---

Vas a ejecutar únicamente la subfase **Validación** del ciclo SDD.

Spec objetivo: `$ARGUMENTS`

Si no se indica una spec, usar la fase activa registrada en `docs/PROGRESO.md`.

Antes de verificar:

1. Leer la spec, la clarificación, el plan, las tareas y la implementación.
2. Ejecutar `npm test`, `npm run lint` y `npm run build` si existen.
3. Revisar cada requisito funcional y no funcional.
4. No corregir código en esta subfase sin aprobación. Solo verificar y documentar.

Crear o actualizar `specs/NNN-nombre/verificacion.md` con:

- Fecha y commit verificado.
- Comandos ejecutados y resultado.
- Tabla: RF / criterio / evidencia (archivo, test o prueba manual) / estado.
- Estados permitidos: cumple, no cumple, prueba manual pendiente.
- Para cada falla: si es del código o de la spec.
- Riesgos residuales.
- Conclusión: aprobada o requiere cambios.

Reglas:

- No marcar “cumple” sin evidencia concreta.
- No inventar resultados de tests, build o Lighthouse.
- Si falta una prueba, marcarla como pendiente.
- Al terminar, actualizar `docs/PROGRESO.md` y detenerse.
- Solicitar aprobación antes de corregir o avanzar.
