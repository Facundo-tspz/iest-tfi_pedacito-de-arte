# Tareas — Spec 003: Panel admin MVP

- **Fase:** F4
- **Estado:** T01–T07 completadas; T08 en curso — deploy publicado, prueba manual/RLS pendiente
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
| T08 | Cerrar pruebas, deploy, RLS y verificación de F4. | Deploy de `1aefebf` publicado: home `200`, `/estudio/login` `200`, Function `admin-login` desplegada. Falta probar login real, media, producto y RLS con `anon`. | En curso |

---

## 2. Evidencia de calidad

| Comando | Resultado |
| :--- | :--- |
| `npm test` | 257/257 tests, 58 archivos |
| `npm run lint` | Sin errores |
| `npm run build` | Correcto, 197 módulos transformados |
| `node --check` en Functions | Correcto |
| Deploy | `main` en `origin` hasta `1aefebf`; Netlify responde |

---

## 3. Pendiente de T08

1. Probar `/estudio/login` con `Facundo` y la contraseña local.
2. Subir una imagen, recortarla y verificar WebP.
3. Crear o editar un producto con imágenes y opciones.
4. Verificarlo en `/catalogo`.
5. Probar que `anon` no pueda escribir.
6. Revisar Functions y consola en Netlify.
7. Cerrar `specs/003-panel-admin/verificacion.md`.

---

## 4. Fuera del MVP

- CMS de secciones.
- Gestión de usuarios.
- Configuración del sitio.
- CRUD de categorías.
- Gráficos y analíticas.
