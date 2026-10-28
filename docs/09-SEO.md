# 09 - SEO y Accesibilidad: Pedacito de Arte

Este documento define metadatos, Open Graph, sitemap, accesibilidad y límites del SPA.

---

## 1. Metadatos por página

### Home

- **Title:** `Pedacito de Arte | Papelería Creativa hecha con amor`
- **Description:** `Agendas personalizadas, agendas docentes, anotadores y revistas para colorear. Papelería artesanal hecha con amor. Armá tu encargo y envialo por WhatsApp.`

### Catálogo

- **Title:** `Catálogo de Productos | Pedacito de Arte`
- **Description:** `Explorá agendas, agendas docentes, anotadores y revistas para colorear. Personalizá tu encargo y consultá por WhatsApp.`

### Detalle de producto

- **Title:** `{nombre} | Pedacito de Arte`
- **Description:** usar `meta_descripcion` del producto o un resumen de la descripción.

### Servicios

- **Title:** `Servicios y Personalización | Pedacito de Arte`
- **Description:** `Diseño, impresión, laminado y encuadernación artesanal para regalos, docentes y emprendedores.`

### Contacto

- **Title:** `Contacto | Pedacito de Arte`
- **Description:** `Consultanos por WhatsApp para encargos personalizados, ferias y trabajos especiales.`

---

## 2. Open Graph

Usar URLs absolutas y sin Markdown. Ejemplo:

```html
<meta property="og:type" content="website" />
<meta property="og:title" content="Pedacito de Arte - Papelería creativa hecha con amor" />
<meta property="og:description" content="Agendas personalizadas, agendas docentes, anotadores y revistas para colorear. Armá tu encargo online." />
<meta property="og:image" content="https://TU-SITIO.netlify.app/media/og-compartir.jpg" />
<meta property="og:url" content="https://TU-SITIO.netlify.app" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Pedacito de Arte - Papelería creativa" />
<meta name="twitter:image" content="https://TU-SITIO.netlify.app/media/og-compartir.jpg" />
```

`VITE_SITE_URL` define la URL base. No hardcodear el dominio final.

---

## 3. Slugs y sitemap

- Cada producto tiene `slug` único.
- Ruta pública: `/catalogo/:slug`.
- Sitemap con Home, Catálogo, Servicios, Contacto y productos activos.
- `robots.txt` permite el sitio público y bloquea `/admin`.
- `/admin/*` responde con `X-Robots-Tag: noindex`.

---

## 4. Límites del SPA

Al ser una SPA con Vite, el HTML inicial no contiene el contenido de cada producto. Mitigaciones:

- Metadatos por ruta con `react-helmet-async`.
- Slugs descriptivos.
- Sitemap actualizado.
- Open Graph con imagen absoluta.
- Contenido principal renderizado sin depender de interacción.

Si el SEO orgánico se vuelve crítico, se evaluará prerenderizado o migración a SSR en una fase futura, con aprobación.

---

## 5. Accesibilidad

- Un `h1` por página y jerarquía correcta.
- Todos los controles con etiqueta.
- Foco visible.
- Navegación por teclado.
- Contraste suficiente.
- `alt` descriptivo en imágenes de productos y secciones.
- Imágenes decorativas con `alt=""`.
- Botones con texto claro, no solo íconos.
- Mensajes de error asociados a campos.
- Respeto por `prefers-reduced-motion`.

---

## 6. Lighthouse

Objetivo mínimo: **80 puntos** en Rendimiento, Accesibilidad, Buenas prácticas y SEO.

Acciones previstas:

- Imágenes WebP con tamaño adecuado y `loading="lazy"` fuera del primer viewport.
- Code splitting por ruta.
- Fuentes con `display=swap`.
- Sin librerías innecesarias.
- Evitar layout shift.
- Medir en móvil y escritorio.

El informe de Lighthouse se guarda como evidencia en la fase F6.
