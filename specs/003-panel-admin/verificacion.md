# Verificación — Spec 003: Panel admin MVP

- **Fecha:** 2026-11-02
- **Fase:** F4
- **Estado:** Implementación completa; verificación manual en Netlify pendiente.
- **Alcance:** login, dashboard, medios y productos del MVP.

---

## 1. Comandos de calidad

| Comando | Resultado |
| :--- | :--- |
| `npm test` | 257/257 tests, 58 archivos |
| `npm run lint` | Sin errores |
| `npm run build` | Correcto, 197 módulos transformados |
| `node --check` en Functions | Correcto |

---

## 2. Matriz de requisitos

| RF | Evidencia | Estado |
| :--- | :--- | :--- |
| RF09 — Login propio | Functions `admin-login`, `admin-session`, `admin-logout`; `LoginPage`; `RutaAdminProtegida`. | cumple |
| RF10 — Productos | `admin-productos.mjs`, `ProductosPage`, `ProductoFormPage`; opciones simples y precios. | cumple |
| RF11 — Medios | `admin-media-url.mjs`, `admin-media.mjs`, `MediaPage`, recorte con `react-easy-crop` y WebP. | cumple |
| RF12 — CMS | Fuera del MVP. | diferido |
| RF13 — Usuarios | Fuera del MVP; solo admin inicial por seed. | diferido |

---

## 3. Criterios de aceptación

| AC | Evidencia | Estado |
| :--- | :--- | :--- |
| AC01 | Login con el admin creado. | prueba manual pendiente en deploy |
| AC02 | Rutas `/estudio` protegidas. | implementado |
| AC03 | Dashboard básico con productos y categorías. | implementado |
| AC04 | Catálogo público usa Supabase cuando hay variables. | implementado |
| AC05 | Medios con subida, recorte, WebP, alt y reutilización. | prueba manual pendiente |
| AC06 | Productos con crear/editar/publicar, imágenes y opciones. | prueba manual pendiente |
| AC07 | Cambios del admin reflejados en catálogo público. | prueba manual pendiente |
| AC08 | Sin CMS, usuarios ni configuración. | cumple |
| AC09 | Tests, lint y build pasan. | cumple |

---

## 4. Pendiente manual

1. Redeploy en Netlify con las variables cargadas.
2. Probar `/estudio/login` con `Facundo`.
3. Subir una imagen desde `/estudio/media`, recortarla y verificar WebP.
4. Crear o editar un producto con imagen y opciones.
5. Verificar que el producto aparezca en `/catalogo`.
6. Verificar que `anon` no pueda escribir.
7. Revisar consola y Functions en Netlify.
