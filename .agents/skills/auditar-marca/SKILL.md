---
name: auditar-marca
description: Audita que la interfaz use tokens de marca, tipografías oficiales, contraste, alt text y responsive. Usar al cerrar una pantalla, revisar estilos o antes de validar una spec de UI.
---

# Auditar marca y accesibilidad

## Cuándo usar

Usar esta skill al terminar una pantalla, revisar un componente visual, validar una spec de UI o preparar una entrega con requisitos de identidad visual y accesibilidad.

## Proceso

1. Leer `docs/IDENTIDAD-MARCA.md` y `docs/06-DISENO-UI.md`.
2. Revisar los archivos de UI modificados.
3. Comprobar:
   - Colores: solo tokens o clases derivadas de tokens. Ningún hex suelto en componentes.
   - Tipografías: Cormorant Garamond para títulos y Poppins para cuerpo/UI.
   - Contraste: texto legible sobre fondos de marca.
   - Imágenes: `alt` descriptivo y no redundante.
   - Responsive: funciona desde 360 px y en escritorio.
   - Teclado: foco visible, orden lógico y controles accesibles.
   - Botones: texto claro y estados hover/focus/disabled.
   - Semántica: un `h1` por página y jerarquía de encabezados correcta.
   - Contenido: sin textos de relleno ni lorem ipsum.
4. Reportar hallazgos con severidad y ubicación.

## Formato de salida

```markdown
| Hallazgo | Severidad | Ubicación | Corrección propuesta |
| :--- | :--- | :--- | :--- |
| ... | alta/media/baja | `archivo:línea` | ... |
```

## Reglas

- No modificar estilos sin aprobación.
- No introducir colores nuevos fuera de la paleta.
- No aceptar imágenes sin `alt`.
- No dar por aprobada una UI con problemas de contraste o navegación por teclado.
