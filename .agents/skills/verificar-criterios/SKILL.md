---
name: verificar-criterios
description: Verifica requisitos, criterios de aceptación y evidencias de una spec antes de aprobar una fase. Usar al ejecutar /verificar, cerrar una tarea o revisar el cumplimiento de RF.
---

# Verificar criterios

## Cuándo usar

Usar esta skill cuando haya que comprobar si una funcionalidad cumple su spec, antes de cerrar una tarea, generar `verificacion.md` o responder si un RF está terminado.

## Proceso

1. Leer `spec.md`, `clarificacion.md`, `plan.md`, `tasks.md` y la implementación relacionada.
2. Extraer cada RF y cada criterio de aceptación.
3. Buscar evidencia concreta:
   - Archivo y línea del código.
   - Test automatizado que lo cubre.
   - Resultado de `npm test`.
   - Resultado de `npm run build`.
   - Prueba manual reproducible.
4. Ejecutar los comandos de verificación disponibles.
5. Clasificar cada criterio:
   - `cumple`: existe evidencia verificable.
   - `no cumple`: la evidencia demuestra una falla.
   - `prueba manual pendiente`: no hay evidencia suficiente.
6. Indicar si una falla es del código o de la spec.
7. Escribir o actualizar `specs/NNN-nombre/verificacion.md`.

## Formato de salida

```markdown
| RF | Criterio | Evidencia | Estado |
| :--- | :--- | :--- | :--- |
| RF01 | ... | `archivo:línea`, test o prueba manual | cumple |
```

## Reglas

- No marcar `cumple` sin evidencia.
- No inventar resultados de tests, build o Lighthouse.
- No corregir código durante la verificación sin aprobación.
- Si falta una prueba, dejarla como pendiente y proponer cómo verificarla.
- Si la spec es ambigua, marcarlo como hallazgo y no como falla del código.
