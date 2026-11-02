# Plan Técnico — Spec 003: Panel admin MVP

- **Fase:** F4
- **Estado:** Bloque B implementado; Bloque C pendiente
- **Spec:** `specs/003-panel-admin/spec.md`
- **Clarificación:** `specs/003-panel-admin/clarificacion.md`

---

## 1. Bloque B — Base administrativa

Implementado:

- `@supabase/supabase-js`.
- `src/lib/supabase.js`.
- Servicio público híbrido: Supabase en producción, mock en tests/desarrollo sin variables.
- `netlify/functions/admin-login.mjs`.
- `netlify/functions/admin-session.mjs`.
- `netlify/functions/admin-logout.mjs`.
- Helpers de sesión, contraseña y Supabase admin.
- `src/services/admin.js`.
- `/estudio/login`.
- `RutaAdminProtegida`.
- `AdminLayout`.
- Dashboard básico.

## 2. Bloque C — Administración mínima

Pendiente:

- `admin-media-url.mjs`: URL firmada para subir a Storage.
- `admin-media.mjs`: registrar y editar medios.
- `admin-productos.mjs`: CRUD de productos.
- Biblioteca de medios.
- Formulario de producto.
- Asociación de imágenes.
- Opciones simples por filas.
- Recorte y WebP con `react-easy-crop`.
- Pruebas de flujo.

## 3. Fuera del MVP

- CMS de secciones.
- Gestión de usuarios.
- Configuración del sitio.
- CRUD de categorías.
- Analíticas y gráficos.
- F5 multimedia.

## 4. Criterio de cierre

- Login y dashboard funcionando.
- Medios y productos administrables.
- Catálogo público leyendo Supabase.
- Tests, lint y build en verde.
- Deploy probado.
