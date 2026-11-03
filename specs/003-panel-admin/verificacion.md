# Verificación — Spec 003: Panel admin MVP

- **Fecha:** 2026-11-03
- **Fase:** F4
- **Estado:** F4 cerrada; implementación y verificación completas.
- **Alcance:** login, dashboard, medios y productos del MVP.

---

## 1. Comandos de calidad

| Comando | Resultado |
| :--- | :--- |
| `npm test` | 276/276 tests, 61 archivos |
| `npm run lint` | Sin errores |
| `npm run build` | Correcto, 199 módulos transformados |
| `node --check` en Functions | Correcto |

---

## 2. Deploy y rutas

| Comprobación | Resultado |
| :--- | :--- |
| Commit desplegado | `89eafb2` |
| `/` | `200` |
| `/catalogo` | `200` |
| `/estudio/login` | `200` |
| `X-Robots-Tag` en `/estudio/login` | `noindex` |

---

## 3. Matriz de requisitos

| RF | Evidencia | Estado |
| :--- | :--- | :--- |
| RF09 — Login propio | Functions `admin-login`, `admin-session`, `admin-logout`; `LoginPage`; `RutaAdminProtegida`; login manual en Netlify. | cumple |
| RF10 — Productos | `admin-productos.mjs`, `ProductosPage`, `ProductoFormPage`; productos e imágenes reflejados en Supabase público. | cumple |
| RF11 — Medios | `admin-media-url.mjs`, `admin-media.mjs`, `MediaPage`, recorte 4:3/16:9, WebP y alt; imagen pública `200` con `image/webp`. | cumple |
| RF12 — CMS | Fuera del MVP. | diferido |
| RF13 — Usuarios | Fuera del MVP; solo admin inicial por seed. | diferido |

---

## 4. Criterios de aceptación

| AC | Evidencia | Estado |
| :--- | :--- | :--- |
| AC01 | Login con el admin creado y uso real del panel en Netlify. | cumple |
| AC02 | Rutas `/estudio` protegidas; Functions sin sesión responden `401`. | cumple |
| AC03 | Dashboard básico con productos y categorías. | cumple |
| AC04 | Catálogo público usa Supabase: 4 categorías y 6 productos disponibles. | cumple |
| AC05 | Medios con subida, recorte, WebP, alt y reutilización; imágenes públicas verificadas. | cumple |
| AC06 | Productos con crear/editar/publicar, imágenes y opciones; datos públicos actualizados. | cumple |
| AC07 | Cambios del admin reflejados en catálogo público; productos con imágenes y hero marcados. | cumple |
| AC08 | Sin CMS, usuarios ni configuración. | cumple |
| AC09 | Tests, lint y build pasan. | cumple |

---

## 5. Evidencia de datos públicos

Consulta con la clave pública/anon:

- 4 categorías activas.
- 6 productos disponibles.
- Imágenes por producto:
  - Anotador A6 x 50 hojas: 2 imágenes, 1 hero.
  - Libro de Recetas A5 x 40 hojas: 1 imagen, 1 hero.
  - Revista para Colorear: 1 imagen, 1 hero.
  - Agenda 2027 Docente A5: 3 imágenes, 1 hero.
  - Agenda Personalizada: 0 imágenes, 0 hero.
  - Libro A5 para Colorear: 1 imagen, 1 hero.
- La Agenda 2027 Docente A5 conserva el cambio de nombre realizado desde el panel.
- La imagen pública consultada responde `200` con `Content-Type: image/webp`.

---

## 6. RLS y Functions

- Actualización de una categoría con `anon`: devuelve 0 filas.
- Lectura de `usuarios_admin` con `anon`: devuelve vacío.
- `db/002_policies.sql` no define políticas de escritura para `anon`.
- Functions sin sesión:
  - `admin-productos`: `401`.
  - `admin-media`: `401`.
  - `admin-session`: `401`.
- No se ejecutaron inserciones o borrados con `anon` para no alterar datos reales.

---

## 7. Observaciones para F5

- Tres productos solo tienen imagen de hero: Libro de Recetas, Revista para Colorear y Libro A5 para Colorear. Hasta subir sus imágenes 4:3, el catálogo y la galería muestran placeholder.
- Agenda Personalizada no tiene imágenes; queda con placeholder.
- El hero se excluye del catálogo y de la galería; solo aparece en el Home.
- La biblioteca de medios permite buscar, filtrar por formato y ordenar por nombre o fecha.

---

## 8. Cierre

F4 queda cerrada. Las pruebas de login, medios, productos, RLS, Functions y deploy están registradas. El trabajo pendiente corresponde a F5 y F6.
