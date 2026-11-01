# Plan Técnico — Spec 001: Home + Catálogo

- **Fase:** F2
- **Estado:** Propuesto para aprobación
- **Spec:** `specs/001-catalogo/spec.md`
- **Clarificación:** `specs/001-catalogo/clarificacion.md`
- **Regla:** no se escribe código hasta aprobar este plan y `tasks.md`.

---

## 1. Enfoque técnico

F2 implementa la vidriera pública como una SPA con React 18, Vite, React Router 7, Tailwind 3 y DaisyUI 4. No se conecta Supabase ni se escribe SQL: los datos viven en un mock y se consumen a través de una capa de servicio reemplazable en F4.

Decisiones técnicas principales:

1. **Separación por capas:** datos mock → servicio → hooks → páginas/componentes. Las páginas no conocen el mock; solo llaman a `src/services/catalogo.js`.
2. **Estado del catálogo en la URL:** `?categoria=slug` y `?buscar=texto` con `useSearchParams`. La categoría usa navegación normal; la búsqueda usa `replace` después de un debounce de 300 ms.
3. **Carruseles con un hook reutilizable:** `useCarrusel` maneja índice, avance automático, pausa por interacción, reanudación a los 5 s, pausa manual y movimiento reducido. El hero grande y el hero chico comparten la lógica, con intervalos de 8 s y 4 s.
4. **Progreso del hero:** animación CSS de 8 s con un tramo continuo hasta el 75 % y dos tramos cortos en el último 25 %; se pausa con `animation-play-state` y se oculta con movimiento reducido.
5. **Layout full-bleed:** se quita el contenedor global de `AppLayout`; cada página y sección decide su ancho con `.contenedor`. El footer pasa al layout.
6. **SEO con `react-helmet-async`:** un componente `SEO` centraliza title, description, canonical, Open Graph y Twitter. Se instala la dependencia aprobada y se registra en `docs/11-CAMBIOS.md`.
7. **Precios sin inventar:** todos los `precio_base` del mock serán `null` para mostrar “Precio a confirmar”. Los tests usarán fixtures numéricos para verificar el cálculo del precio estimado.
8. **Identidad visual:** solo tokens de Tailwind/CSS. No se escriben colores hex en componentes.
9. **Accesibilidad:** foco visible, teclado, `alt`, `aria-pressed`, `aria-live` solo manual, botón de pausa/play y manejo de foco del menú móvil.

---

## 2. Capas y archivos previstos

### Configuración y arranque

- `package.json` y `package-lock.json`: agregar `react-helmet-async` con versión exacta.
- `src/main.jsx`: envolver la app con `HelmetProvider`.
- `.env.example`: agregar `VITE_WHATSAPP`, `VITE_INSTAGRAM` y `VITE_EMAIL`; mantener `VITE_SITE_URL`.
- `src/config/configuracion.js`: leer variables de entorno y exponer valores con fallback seguro.
- `src/styles/index.css`: `scroll-margin-top` para anclas, animación de progreso, estilos de movimiento reducido y utilidades de full-bleed.
- `src/hooks/useMovimientoReducido.js`: detectar `prefers-reduced-motion`.

### Datos y servicios

- `src/data/mockCatalogo.js`: 4 categorías, 10 productos (2–3 por categoría), 4 destacados, 4 fotos de proceso y opciones de personalización. Todo marcado como provisional.
- `src/services/catalogo.js`: `obtenerCategorias`, `obtenerProductos`, `obtenerProductoPorSlug`, `obtenerDestacados`, `obtenerNovedades`.
- `src/utils/texto.js`: normalización sin acentos ni mayúsculas.
- `src/utils/precio.js`: formato ARS y cálculo del precio estimado.
- `src/utils/whatsapp.js`: construcción del mensaje y de la URL de WhatsApp.

### Hooks

- `src/hooks/useDebouncedValue.js`: retardo de 300 ms para la búsqueda.
- `src/hooks/useCatalogo.js`: carga de productos, loading, error y reintento.
- `src/hooks/useProducto.js`: carga del detalle por slug.
- `src/hooks/useCarrusel.js`: lógica compartida de los dos heroes.
- `src/hooks/useScrollToHash.js`: scroll a anclas después de navegar.
- `src/hooks/useMovimientoReducido.js`: preferencia de movimiento.

### Layout

- `src/components/layout/AppLayout.jsx`: Navbar + `<main>` sin contenedor global + Footer.
- `src/components/layout/Navbar.jsx`: enlaces de escritorio y botón hamburguesa.
- `src/components/layout/MenuMovil.jsx`: menú accesible con foco atrapado.
- `src/components/layout/Footer.jsx`: logo, navegación, contacto, redes y textos legales.

### Home

- `src/components/home/HeroDestacados.jsx`: carrusel principal.
- `src/components/home/HeroSlide.jsx`: slide con imagen, texto superpuesto y CTA.
- `src/components/home/HeroProceso.jsx`: hero chico de fotos de proceso.
- `src/components/home/IntroMarca.jsx`: presentación de la marca.
- `src/components/home/CategoriasHome.jsx`: 4 tarjetas de categoría.
- `src/components/home/Novedades.jsx`: 4 tarjetas de producto.
- `src/components/home/ServiciosCTA.jsx`: franja de servicios y WhatsApp.

### Catálogo

- `src/components/catalogo/BuscadorCatalogo.jsx`: input con etiqueta, limpieza y contador.
- `src/components/catalogo/FiltrosCategoria.jsx`: botones con `aria-pressed`.
- `src/components/catalogo/ProductoCard.jsx`: tarjeta de producto.
- `src/components/catalogo/GrillaProductos.jsx`: grilla responsive.
- `src/components/catalogo/SkeletonCard.jsx`: carga.
- `src/components/catalogo/EstadoVacio.jsx`: sin resultados y sin productos publicados.
- `src/components/catalogo/MensajeError.jsx`: error con reintento.

### Detalle

- `src/components/producto/GaleriaProducto.jsx`: imagen principal y miniaturas.
- `src/components/producto/OpcionesPersonalizacion.jsx`: grupos de radios por tipo.
- `src/components/producto/PrecioEstimado.jsx`: precio base + adicionales.
- `src/components/producto/NotasPersonalizacion.jsx`: textarea con máximo 500.
- `src/components/producto/CtaWhatsApp.jsx`: consulta por WhatsApp y botón deshabilitado de carrito.

### UI compartida y SEO

- `src/components/ui/PlaceholderImagen.jsx`: placeholder de marca con tokens y `alt`.
- `src/components/ui/Seccion.jsx`: contenedor semántico con título y ancho.
- `src/components/ui/Boton.jsx`: variantes de botón con tokens.
- `src/components/seo/SEO.jsx`: metadatos por ruta.

### Páginas y router

- `src/pages/HomePage.jsx`.
- `src/pages/CatalogoPage.jsx`.
- `src/pages/ProductoDetallePage.jsx`.
- `src/routes/AppRouter.jsx`: rutas `/`, `/catalogo`, `/catalogo/:slug` y `*`.

### Tests

- Tests colocados junto a cada archivo (`*.test.js` o `*.test.jsx`).
- `tests/setup.js`: mock de `window.matchMedia` para movimiento reducido.
- Tests de páginas con `MemoryRouter` y `HelmetProvider`.

---

## 3. Contratos de datos

### Categoría

```text
{
  id: string,
  nombre: string,
  slug: string,
  descripcion: string | null,
  orden: number,
  activo: boolean
}
```

### Producto

```text
{
  id: string,
  codigo: string,
  nombre: string,
  slug: string,
  categoria_id: string,
  categoria: { id, nombre, slug },
  descripcion: string,
  caracteristicas: string[],
  precio_base: number | null,
  destacado: boolean,
  disponible: boolean,
  meta_titulo: string | null,
  meta_descripcion: string | null,
  orden: number,
  imagenes: [{ id, url: string | null, alt: string, orden: number }],
  opciones: [{ id, tipo_opcion, valor, precio_extra: number, orden: number, activo: boolean }]
}
```

### Servicio

```text
obtenerCategorias(): Promise<Categoria[]>
obtenerProductos({ categoria, buscar }): Promise<Producto[]>
obtenerProductoPorSlug(slug): Promise<Producto | null>
obtenerDestacados(limite): Promise<Producto[]>
obtenerNovedades(limite, slugsExcluidos): Promise<Producto[]>
```

Reglas del servicio:

- Solo devuelve productos `disponible=true`.
- Excluye productos de categorías `activo=false`.
- `obtenerProductoPorSlug` devuelve `null` si el producto no existe, no está disponible o su categoría está inactiva.
- La búsqueda normaliza mayúsculas y acentos.
- Los destacados se ordenan por `orden`; las novedades son los siguientes por `orden`, excluyendo los slugs del hero.

### URL del catálogo

- `?categoria=slug`: filtro activo.
- `?buscar=texto`: búsqueda activa.
- La búsqueda se actualiza con `replace`; la categoría puede usar navegación normal.
- Una categoría inválida o inactiva se muestra como “Todas” con un aviso discreto.

### Mensaje de WhatsApp

```text
Hola, quiero consultar por:
Producto: {nombre} ({codigo})
Opciones: {tipo}: {valor} | ...
Notas: {notas}
URL: {url del producto}
```

- Si no hay opciones: `Opciones: Sin preferencia`.
- Si no hay notas: omitir la línea o usar “Sin notas”.
- Todo el mensaje se codifica con `encodeURIComponent`.
- Si `VITE_WHATSAPP` está vacío, la CTA se deshabilita y se muestra un aviso en desarrollo.

---

## 4. Comportamiento de los carruseles

### Hook `useCarrusel`

- Opciones: `total`, `intervalo`, `reanudarMs = 5000`.
- Estado: índice actual, pausa manual, pausa por interacción y movimiento reducido.
- `pausado = pausaManual || pausaPorInteraccion || movimientoReducido`.
- Al interactuar (hover, foco, clic, touch o teclado), se pausa y se programa la reanudación a los 5 s.
- El botón de pausa/play alterna la pausa manual; si el usuario pausa manualmente, no se reanuda solo.
- Las flechas cambian de slide y reinician el temporizador.
- Con movimiento reducido no hay avance automático.
- El hook no anuncia cambios automáticos; solo los manuales.

### Hero grande

- 4 slides, 8 s por slide.
- Texto superpuesto, frase fija “Papelería creativa / hecha con amor” en dos renglones.
- Barra de progreso de 8 s: tramo continuo hasta 75 % y dos tramos cortos en el último 25 %.
- Flechas, botón de pausa/play y barra se ocultan o desactivan con movimiento reducido.
- `aria-roledescription="carrusel"`, slides inactivos con `aria-hidden="true"`, `aria-live="polite"` solo para cambios manuales.

### Hero chico

- 4 slides de proceso, 4 s por slide, transición hacia la izquierda.
- Sin flechas; botón de pausa/play visible.
- Pausa por interacción y reanudación a los 5 s.
- Movimiento reducido: se detiene y se muestra una imagen fija.

---

## 5. SEO y accesibilidad

### SEO

- `HelmetProvider` en `src/main.jsx`.
- `SEO` recibe `titulo`, `descripcion`, `imagen`, `url` y `tipo`.
- Home y Catálogo usan los textos de `docs/09-SEO.md`.
- Detalle usa `meta_titulo` y `meta_descripcion`, con fallback a nombre y descripción.
- `canonical` y Open Graph usan `VITE_SITE_URL`; si falta, se usa `window.location.origin` en desarrollo.
- Imagen Open Graph provisional: `/marca/logo-icono.png`.
- `twitter:card` con `summary_large_image`.

### Accesibilidad

- Un `h1` por página.
- Foco visible global ya definido en `src/styles/index.css`.
- Enlaces y botones con texto claro; íconos con `aria-hidden`.
- `alt` descriptivo en imágenes; decorativas con `alt=""`.
- Filtros con `aria-pressed`; buscador con etiqueta visible o `sr-only`.
- Contador de resultados en `aria-live="polite"`.
- Menú móvil: `aria-expanded`, `aria-controls`, foco al primer enlace, Escape, foco atrapado y retorno del foco.
- Galería: miniaturas como botones con `aria-label` y navegación por teclado.
- Notas: `maxLength=500`, contador visible y `aria-describedby`.
- WhatsApp: enlace con `target="_blank"` y `rel="noopener noreferrer"`; si falta el número, botón deshabilitado con explicación.

---

## 6. Estrategia de tests

### Unitarios

- `src/services/catalogo.test.js`: filtros, búsqueda normalizada, categorías inactivas, detalle nulo, destacados y novedades.
- `src/utils/texto.test.js`: acentos, mayúsculas y espacios.
- `src/utils/precio.test.js`: formato ARS, base nula, suma de adicionales.
- `src/utils/whatsapp.test.js`: mensaje con/sin opciones y notas, codificación, número faltante.

### Hooks

- `useDebouncedValue`: con `vi.useFakeTimers()`.
- `useCarrusel`: avance, pausa por interacción, reanudación a los 5 s, pausa manual, flechas y movimiento reducido.
- `useCatalogo` / `useProducto`: loading, éxito, error y reintento.

### Componentes

- `ProductoCard`: nombre, categoría, precio nulo y enlace.
- `FiltrosCategoria`: `aria-pressed`, cambio de filtro y URL.
- `BuscadorCatalogo`: etiqueta, debounce, limpieza y contador.
- `EstadoVacio`: variante sin resultados y sin productos publicados.
- `MensajeError`: mensaje y reintento.
- `OpcionesPersonalizacion`: radios por tipo, “Sin preferencia” y adicionales.
- `NotasPersonalizacion`: límite de 500 y contador.
- `CtaWhatsApp`: mensaje, opciones, notas y número faltante.
- `GaleriaProducto`: miniaturas, teclado y placeholder.
- `HeroDestacados` / `HeroProceso`: pausa, reanudación, botón y `aria`.

### Páginas

- `HomePage`: secciones, un solo `h1`, SEO y CTA.
- `CatalogoPage`: URL, filtros, búsqueda, estados y contador.
- `ProductoDetallePage`: detalle, 404, opciones, notas, precio y SEO.
- `AppRouter`: rutas y 404.

### Calidad

- `npm test`.
- `npm run lint`.
- `npm run build`.
- Recorrido manual con teclado en Home, Catálogo y Detalle.
- Revisión responsive en 360 px, 768 px y 1280 px.
- Evidencia final en `specs/001-catalogo/verificacion.md`.

---

## 7. Riesgos y mitigaciones

| Riesgo | Mitigación |
| :--- | :--- |
| Timers reales en tests | Usar `vi.useFakeTimers()` y limpiar timers en cada test. |
| `matchMedia` no existe en jsdom | Mock en `tests/setup.js`. |
| Bucles al sincronizar URL y estado | Derivar el estado de `searchParams` y actualizar solo ante acciones del usuario. |
| Full-bleed con overflow horizontal | Revisar 360 px; usar `w-full` y `overflow-x-hidden` solo si es necesario. |
| Contraste sobre placeholders | Usar degradado oscuro con tokens y verificar con Lighthouse en F6. |
| `react-helmet-async` en tests | Envolver con `HelmetProvider` y usar `waitFor` para el `<head>`. |
| Precios inventados | Todos los `precio_base` mock en `null`; tests con fixtures numéricos. |
| Dependencia nueva | Instalar versión exacta y registrar justificación en `docs/11-CAMBIOS.md`. |
| Foco del menú móvil | Implementar foco atrapado y probar con teclado. |

---

## 8. Fuera de alcance

- Carrito, cantidades, persistencia y envío de encargo múltiple (F3).
- Supabase, SQL, RLS, Storage y migraciones (F4).
- Panel admin, CMS, usuarios y medios (F4).
- Fotos, precios y descripciones definitivas (F5).
- Paginación, ordenamiento avanzado, sitemap, robots y multiidioma.
- Pagos, checkout, cuentas de cliente, stock e historial.

---

## 9. Orden de implementación

1. Configuración y dependencia de SEO.
2. Datos mock, servicio y utilidades.
3. Hooks de datos, debounce y carrusel.
4. Layout, navbar y footer.
5. Heroes y secciones de la Home.
6. Catálogo: filtros, búsqueda, tarjetas y estados.
7. Detalle: galería, opciones, notas y WhatsApp.
8. SEO por ruta, accesibilidad y responsive.
9. Calidad final y evidencia.

El detalle verificable está en `specs/001-catalogo/tasks.md`. Cada tarea debe completarse y verificarse antes de pasar a la siguiente. La implementación comienza solo con la palabra **“aprobado”**.
