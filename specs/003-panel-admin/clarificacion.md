# Clarificación — Spec 003: Panel admin

- **Fecha:** 2026-11-02
- **Estado:** Aprobada para el MVP
- **Regla:** CMS, usuarios y configuración quedan fuera del MVP.

| ID | Decisión |
| :--- | :--- |
| C01 | Ruta base `/estudio`, no `/admin` ni `/panel`. |
| C02 | Login propio con usuario y contraseña. |
| C03 | Sin Supabase Auth, Gmail ni recuperación por email. |
| C04 | Un solo admin inicial `Facundo`; sin pantalla de usuarios. |
| C05 | Categorías fijas por seed. |
| C06 | Sidebar azul con iconos y contenido blanco. |
| C07 | Título de sección en sidebar, barra superior y `h1`. |
| C08 | Login partido: marca a la izquierda, formulario a la derecha. |
| C09 | Medios con subida, recorte, WebP, alt y reutilización. |
| C10 | Productos con precio, categoría, imágenes, características, SEO y opciones simples. |
| C11 | CMS de secciones queda para futuro. |
| C12 | Gestión de usuarios queda para futuro. |
| C13 | Configuración del sitio queda para futuro. |
| C14 | Dashboard básico sin gráficos. |
| C15 | Catálogo público usa Supabase en producción. |
| C16 | `SUPABASE_SERVICE_ROLE_KEY` solo en Netlify Functions. |
| C17 | `noindex` para `/estudio/*`. |
| C18 | Se mantiene RLS y lectura pública con publishable key. |
| C19 | Edición de categorías fuera del MVP. |
| C20 | Medios avanzados y analíticas quedan para futuro. |
