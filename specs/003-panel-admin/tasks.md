# Tareas — Spec 003: Panel admin MVP

- **Fase:** F4
- **Estado:** T01–T08 completadas; F4 cerrada
- **Plan:** `specs/003-panel-admin/plan.md`
- **Regla:** una tarea por vez. No se avanza sin verificar la anterior.

---

## 1. Tabla de tareas

| ID | Tarea | Archivos / evidencia | Estado |
| :--- | :--- | :--- | :--- |
| T01 | Crear cliente Supabase público y migrar el servicio del catálogo. | `src/lib/supabase.js`, `src/services/catalogo.js`, `src/services/catalogo.test.js`; commit `49a6efa`. | Completada |
| T02 | Implementar Functions de login, sesión y logout. | `netlify/functions/admin-login.mjs`, `admin-session.mjs`, `admin-logout.mjs`, `_lib/password.mjs`, `_lib/sesion.mjs`, tests; commit `49a6efa`. | Completada |
| T03 | Crear login propio en `/estudio/login`. | `src/pages/admin/LoginPage.jsx`, `src/services/admin.js`, tests; commit `49a6efa`. | Completada |
| T04 | Proteger rutas administrativas y layout del panel. | `RutaAdminProtegida.jsx`, `AdminLayout.jsx`, `AppRouter.jsx`; commit `49a6efa`. | Completada |
| T05 | Crear dashboard básico. | `src/pages/admin/DashboardPage.jsx`, contadores de productos/categorías; commit `49a6efa`. | Completada |
| T06 | Implementar biblioteca de medios con recorte y WebP. | `admin-media-url.mjs`, `admin-media.mjs`, `MediaPage.jsx`, `react-easy-crop`, `src/utils/imagen.js`; commit `1aefebf`. | Completada |
| T07 | Implementar CRUD de productos, imágenes y opciones simples. | `admin-productos.mjs`, `ProductosPage.jsx`, `ProductoFormPage.jsx`, `src/services/admin.js`; commit `1aefebf`. | Completada |
| T08 | Cerrar pruebas, deploy, RLS y verificación de F4. | Deploy de `89eafb2`: `/`, `/catalogo` y `/estudio/login` responden `200`; login y medios probados; productos e imágenes reflejados en Supabase; RLS y Functions sin sesión verificadas; `specs/003-panel-admin/verificacion.md` cerrado. | Completada |

---

## 2. Evidencia de calidad

| Comando | Resultado |
| :--- | :--- |
| `npm test` | 276/276 tests, 61 archivos |
| `npm run lint` | Sin errores |
| `npm run build` | Correcto, 199 módulos transformados |
| `node --check` en Functions | Correcto |
| Deploy | `main` en `origin` hasta `89eafb2`; Netlify responde |

---

## 3. Evidencia de T08

1. Login real con `Facundo` en `/estudio/login`.
2. Subida de imágenes desde `/estudio/media` con recorte 4:3/16:9 y WebP.
3. Edición de productos con imágenes, hero y opciones.
4. Productos e imágenes reflejados en Supabase público.
5. RLS con `anon`: actualización de categoría devuelve 0 filas; usuarios no visibles.
6. Functions sin sesión responden `401`.
7. Deploy verificado: `/`, `/catalogo` y `/estudio/login` responden `200`; `/estudio/login` conserva `X-Robots-Tag: noindex`.
8. `specs/003-panel-admin/verificacion.md` cerrado.

---

## 4. Fuera del MVP

- CMS de secciones.
- Gestión de usuarios.
- Configuración del sitio.
- CRUD de categorías.
- Gráficos y analíticas.
