# Especificaciones (SDD)

Cada funcionalidad del TFI vive en su propia carpeta:

```text
specs/
├── 001-catalogo/
│   ├── spec.md
│   ├── clarificacion.md
│   ├── plan.md
│   ├── tasks.md
│   └── verificacion.md
├── 002-carrito-whatsapp/
└── 003-panel-admin/
```

## Reglas

- Numeración secuencial de tres dígitos.
- No se escribe código sin `spec.md` aprobada.
- No se implementa una tarea sin `tasks.md` aprobado.
- Cada tarea tiene un “Listo cuando” verificable.
- Cada RF debe tener evidencia en `verificacion.md`.
- Si aparece un requisito nuevo, se actualiza primero la spec con `/cambio`.
- Una spec no puede mezclar funcionalidades de otra.

## Notación EARS

- **Ubicuo:** “El sistema deberá …”.
- **Evento:** “Cuando …, el sistema deberá …”.
- **Estado:** “Mientras …, el sistema deberá …”.
- **Condición:** “Si …, entonces el sistema deberá …”.
- **Opción:** “Donde …, el sistema deberá …”.

## Flujo

```text
/spec → /clarificar → /plan → implementación por tarea → /verificar → /cambio si corresponde
```

Cada paso requiere aprobación humana antes de continuar.
