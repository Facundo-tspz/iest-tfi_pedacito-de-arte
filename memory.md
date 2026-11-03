# Memoria del Proyecto

- **Fuente completa de progreso:** `docs/PROGRESO.md`
- **Fase actual:** F4 en curso — Bloque C completado y deploy verificado; pruebas manuales y RLS pendientes
- **Último cambio:** Medios ahora soporta 16:9 y los productos tienen imagen de hero separada (`es_hero`). Tests 267/267.
- **Próximo paso:** Ejecutar `db/005_hero_imagen.sql`, subir las imágenes 16:9 y probar hero/catálogo.
- **Commits pendientes:** Tareas de F3/F4, `docs/informe` y soporte de imagen de hero, pendientes de aprobación.
- **Push pendiente:** Ninguno; `main` sincronizado hasta `1aefebf`.
- **Regla:** no avanzar de fase sin la palabra “aprobado”.

## Contexto mínimo para un agente nuevo

1. Leer `AGENTS.md`.
2. Leer `docs/CONSTITUCION.md`.
3. Leer `docs/REGLAS-IA.md`.
4. Leer `docs/ROADMAP.md`.
5. Leer `docs/PROGRESO.md`.
6. Leer la spec activa en `specs/`.
7. Leer `docs/11-CAMBIOS.md` si la tarea toca dependencias, datos o configuración.

## Datos fijos

- Emprendimiento: Pedacito de Arte.
- Productos: Agendas, Agendas Docentes, Anotadores y Revistas para Colorear.
- WhatsApp: +54 9 297 462 371.
- Usuario admin inicial: Facundo.
- Stack: React + Vite + Supabase + Netlify.
- La web es solo de encargos: sin pagos, sin checkout y sin historial de pedidos.

## Preferencias del estudiante

- Avisar antes de comenzar el diseño del panel administrativo (F4) para revisarlo.
- Panel admin: ruta `/estudio`, sidebar azul con iconos, contenido blanco, login partido y navegación responsive.
