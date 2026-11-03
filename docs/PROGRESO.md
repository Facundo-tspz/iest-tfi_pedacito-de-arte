# Progreso del Proyecto: Pedacito de Arte

- **Última actualización:** 2026-11-02
- **Fase actual:** F4 en curso — Bloque C completado y deploy verificado; pruebas manuales y RLS pendientes
- **Repositorio:** https://github.com/Facundo-tspz/iest-tfi_pedacito-de-arte
- **Estado del repositorio:** `main` sincronizado hasta `323a4db`; sin cambios pendientes.

---

## 1. Decisiones vigentes

| Tema | Decisión |
| :--- | :--- |
| Stack | React 18 + Vite + React Router + Tailwind 3 + DaisyUI 4 + JavaScript/JSX. |
| Datos | Supabase Postgres + Storage. |
| Hosting | Netlify + Netlify Functions. |
| Lectura pública | Supabase con `anon key` y RLS de solo lectura. |
| Escritura admin | Netlify Functions con `service_role`. |
| Auth | Propia, usuario y contraseña, sin Supabase Auth ni Gmail. |
| Roles | `admin` y `editor`. |
| Productos | Agendas, Agendas Docentes, Anotadores y Para colorear. |
| Modelo | Solo encargos por WhatsApp; sin pagos, checkout, stock ni historial. |
| Precios | Precio base + total estimado; el final se confirma por WhatsApp. |
| WhatsApp | +54 9 297 462 371 → `549297462371`. |
| Admin inicial | Usuario `Facundo`; contraseña definida por script local. |
| Ruta admin | `/estudio`, con login partido, sidebar azul y contenido blanco. |
| Specs | 001 Catálogo, 002 Carrito/WhatsApp, 003 Panel admin + CMS. |
| Commits | Por fase; mensaje propuesto y aprobado antes de ejecutar. |
| Push | Solo con aprobación explícita. |

---

## 2. Completado en F0

### Documentos nuevos

- `docs/CONSTITUCION.md`
- `docs/ROADMAP.md`
- `docs/REGLAS-IA.md`
- `docs/PROGRESO.md`
- `docs/PROMPTS.md`
- `docs/DECLARACION-IA.md`
- `memory.md`
- `CLAUDE.md`
- `README.md`
- `specs/README.md`
- `multimedia/FICHAS-IA.md`

### Arnés del agente

- `opencode.json` con instrucciones y ruta de skills.
- Comandos: `/spec`, `/clarificar`, `/plan`, `/verificar`, `/cambio`.
- Skills: `verificar-criterios` y `auditar-marca`.
- `.gitignore` con entornos, build y dependencias.

### Documentación corregida

- `AGENTS.md` alineado a React + Vite + Supabase + Netlify.
- `docs/01-CONTEXTO.md` con las 4 líneas de producto y modelo de encargos.
- `docs/02-REQUERIMIENTOS.md` con RF de admin, roles, medios y CMS.
- `docs/03-TECNOLOGIAS.md` con justificación del cambio de stack.
- `docs/04-ARQUITECTURA.md` con Functions, admin, specs y multimedia.
- `docs/05-DATOS.md` con usuarios admin, media, secciones, configuración y RLS.
- `docs/06-DISENO-UI.md` con pantallas públicas y administrativas.
- `docs/07-CONVENCIONES.md` con reglas de commit y aprobación.
- `docs/08-TAREAS.md` alineado al roadmap.
- `docs/09-SEO.md` con Open Graph corregido y límites del SPA.
- `docs/10-SEGURIDAD.md` con auth propia, RBAC, RLS y uploads.
- `docs/IDENTIDAD-MARCA.md` con rutas de logo normalizadas y sin referencias a personajes protegidos.

---

## 3. Verificaciones realizadas en F0

- `opencode.json` validado como JSON.
- Repositorio remoto comprobado: público y vacío.
- Búsqueda de contradicciones: no quedan referencias a Neon, Vercel como stack, `DATABASE_URL` ni `lib/db.js`, salvo la justificación del cambio en `03-TECNOLOGIAS.md`.
- No se creó `package.json`.
- F0 se cerró sin `npm install`.
- No se creó código de aplicación en F0.
- No se tocó Supabase ni Netlify.
- Commit `76dee25` creado y push a `origin/main` realizado.

---

## 4. Estado de F1

Completado:

- `package.json` con versiones exactas y `package-lock.json`.
- Dependencias instaladas; `npm audit` sin vulnerabilidades.
- Vite, PostCSS, Tailwind, DaisyUI, ESLint, Prettier y Vitest configurados.
- Tokens de marca y fuentes `@fontsource` configurados.
- Logo, icono y favicon normalizados en `public/marca/`.
- Componente `Logo` con isotipo PNG y texto HTML; variantes para fondo claro y navbar azul.
- `Navbar` sticky siempre visible, azul sólido con degradado sutil al pie, blur y borde inferior dorado.
- Logo sobre navbar con círculo crema fijo, isotipo PNG más grande, texto blanco, `Pedacito` más grande y distribuido para alinear con `de ARTE`, y `ARTE` en Poppins ExtraBold.
- Token `blanco` agregado a Tailwind, CSS e identidad de marca.
- Tests de `Logo`, `Navbar`, página 404 y rutas.
- Router con `BrowserRouter`, layout base y página 404.
- Estructura inicial de `src/`, `tests/`, `public/`, `netlify/functions/` y `db/`.
- `netlify.toml` con build, publish `dist`, Functions y redirect SPA.
- `.env.example` con variables públicas y privadas.
- Deploy en Netlify verificado: assets, logo y rutas SPA responden correctamente.

Pendiente:

- Nada. F1 cerrada y aprobada; F2 comienza con la spec 001.

---

## 5. Estado de F2

Completado:

- Spec 001 de Home + Catálogo aprobada.
- Clarificación QA resuelta y aprobada; decisiones en `specs/001-catalogo/clarificacion.md`.
- `docs/11-CAMBIOS.md` creado como registro provisional de tecnologías, datos y configuración.
- `docs/05-DATOS.md` actualizado con `caracteristicas text[]`.
- `react-helmet-async` 3.0.0 instalado con versión exacta.
- `HelmetProvider` envolviendo la app en `src/main.jsx`.
- Smoke test de `src/main.test.jsx` agregado.
- `.env.example` con `VITE_WHATSAPP`, `VITE_INSTAGRAM` y `VITE_EMAIL`; `VITE_SITE_URL` conservada.
- `src/config/configuracion.js` con normalización de WhatsApp, URL del sitio y fallback seguro.
- Tests de configuración agregados.
- `docs/03-TECNOLOGIAS.md`, `docs/07-CONVENCIONES.md`, `docs/10-SEGURIDAD.md` y `docs/11-CAMBIOS.md` actualizados.
- `src/data/mockCatalogo.js` con 4 categorías, 10 productos, 4 destacados, 4 fotos de proceso y opciones de personalización.
- Todos los productos tienen `caracteristicas`, `precio_base: null` y marca `provisional: true`.
- Test de forma y cobertura del mock agregado.
- `src/services/catalogo.js` con categorías, productos, búsqueda, detalle, destacados y novedades.
- El servicio excluye productos no disponibles y categorías inactivas; completa destacados y normaliza búsqueda.
- `src/utils/texto.js` con normalización sin acentos ni mayúsculas; el servicio lo importa.
- `src/utils/precio.js` con formato ARS sin decimales, “Precio a confirmar” para base nula y cálculo del estimado.
- `src/utils/whatsapp.js` con mensaje de consulta y URL `wa.me` codificada; notas limitadas a 500 caracteres.
- `src/hooks/useDebouncedValue.js` con retardo de 300 ms y cancelación del temporizador anterior.
- `src/hooks/useCatalogo.js` con productos, loading, error y reintento; evita respuestas obsoletas.
- `src/hooks/useProducto.js` con detalle por slug, loading, error, no encontrado y reintento.
- `src/hooks/useMovimientoReducido.js` con detección y escucha de `prefers-reduced-motion`.
- `src/hooks/useScrollToHash.js` con scroll a anclas, offset del navbar y respeto al movimiento reducido.
- `src/hooks/useCarrusel.js` con avance automático, pausa por interacción, reanudación a los 5 s, pausa manual, flechas, índice circular y respeto al movimiento reducido.
- `src/components/ui/PlaceholderImagen.jsx` con placeholder de marca, tokens, aspecto configurable, `alt` accesible y modo decorativo.
- `src/components/ui/Seccion.jsx` con `section`, título semántico configurable, descripción, ancho y ancla por `id`.
- `src/components/ui/Boton.jsx` con variantes, tamaños, estado deshabilitado y soporte de enlace con `href`.
- `src/components/layout/AppLayout.jsx` sin contenedor global, con Navbar, `main` flexible, Outlet y Footer.
- `src/components/layout/Footer.jsx` con logo, navegación, contacto desde configuración, redes y textos legales.
- `src/components/layout/Navbar.jsx` con enlaces de escritorio y botón hamburguesa móvil.
- `src/components/layout/MenuMovil.jsx` con `aria-expanded`/`aria-controls`, foco inicial, trampa de foco, Escape, cierre por ruta y retorno de foco.
- `src/hooks/useScrollToHash.js` conectado en `AppLayout` para navegar a las anclas del Home.
- `src/styles/index.css` con `scroll-mt-24` para secciones con `id`.
- `HomePage` y `NotFoundPage` conservan su propio contenedor y espaciado vertical.
- `src/components/home/HeroDestacados.jsx` con hasta 4 destacados, frase de marca, flechas, pausa/play, barra de progreso, `aria-live` solo manual, fallback y respeto al movimiento reducido.
- `src/components/home/HeroSlide.jsx` con imagen o placeholder, categoría, nombre, descripción, precio y CTA; slides inactivos ocultos y fuera del orden de tabulación.
- `src/components/home/HeroProceso.jsx` con 4 fotos de proceso, rotación de 4 s hacia la izquierda, pausa/reanudación, botón de pausa/play, movimiento reducido y `aria` correctos.
- `src/components/home/IntroMarca.jsx` con presentación de marca, foto, enlaces al catálogo, WhatsApp y ancla `nosotros`.
- `src/components/home/ServiciosCTA.jsx` con franja de servicios, CTA de WhatsApp, estado sin número configurado y anclas `servicios` y `contacto`.
- `src/components/home/CategoriasHome.jsx` con 4 tarjetas de categoría y enlace al catálogo filtrado.
- `src/components/home/Novedades.jsx` con las siguientes 4 piezas por orden, excluyendo los slugs del hero.
- `src/components/seo/SEO.jsx` con título, descripción, canonical, Open Graph y Twitter absolutos desde `VITE_SITE_URL`.
- `HomePage` compuesta con hero, intro, categorías, novedades, proceso, servicios y SEO; un solo `h1`.
- `src/components/catalogo/BuscadorCatalogo.jsx` con etiqueta, debounce de 300 ms, limpieza, contador `aria-live` y URL con `replace`.
- `src/components/catalogo/FiltrosCategoria.jsx` con “Todas”, `aria-pressed`, URL sincronizada y conservación de la búsqueda.
- `src/components/catalogo/ProductoCard.jsx` con imagen o placeholder, categoría, nombre, descripción breve, precio y enlace al detalle.
- `src/components/catalogo/GrillaProductos.jsx` responsive de 1, 2, 3 y 4 columnas.
- `src/components/catalogo/SkeletonCard.jsx` decorativo, con pulso y respeto al movimiento reducido.
- `src/components/catalogo/EstadoVacio.jsx` con variantes sin resultados y sin productos publicados.
- `src/components/catalogo/MensajeError.jsx` con mensaje y acción de reintento.
- `src/pages/CatalogoPage.jsx` con lectura de URL, filtros, búsqueda, aviso de categoría inválida, contador `aria-live` y metadatos.
- Ruta `/catalogo` agregada a `AppRouter`.
- `Novedades` y `HeroSlide` reutilizan la tarjeta y el enlace `/catalogo/:slug`.
- `src/components/producto/GaleriaProducto.jsx` con imagen principal, miniaturas, navegación por teclado, placeholder y `alt`.
- `src/components/producto/OpcionesPersonalizacion.jsx` con radios por tipo, “Sin preferencia” y adicionales.
- `src/components/producto/PrecioEstimado.jsx` con base + adicionales o “Precio a confirmar”.
- `src/components/producto/NotasPersonalizacion.jsx` con límite de 500, contador y texto plano.
- `src/components/producto/CtaWhatsApp.jsx` con mensaje codificado, número faltante, carrito deshabilitado y aviso de próxima etapa.
- `src/pages/ProductoDetallePage.jsx` con información completa, 404, enlace de vuelta, SEO y ruta `/catalogo/:slug`.
- `useCarrusel` expone `reinicio` para reiniciar la barra de progreso al reanudar o cambiar de slide.
- `src/styles/index.css` con la animación `progreso-hero`.
- Smoke test de `main` con timeout ampliado para el suite completo.
- Auditoría T27: skip link, `aria-live` del precio, aviso de WhatsApp faltante, `aria-busy` del catálogo, `break-words`/`min-w-0` y alturas 55/45 del hero chico.
- Ajustes C20 de revisión visual: frase del hero centrada, segmentos de progreso vacíos hasta su turno, sin pausa por hover, intro más compacta y categorías con acentos de la paleta.
- `specs/001-catalogo/verificacion.md` con matriz RF/AC, evidencia y auditoría.
- Tests de texto, precio, WhatsApp, servicio, hooks, UI compartida, layout, footer, navbar, menú móvil, heroes, intro, servicios, categorías, novedades, SEO, Home, controles de catálogo, tarjeta, grilla, estados, catálogo, rutas, galería, opciones, precio, notas, CTA y detalle agregados; `npm test` 208/208.
- `npm run lint` y `npm run build` pasan con T27–T28.

Cierre:

- T27–T28 completadas; F2 cerrada y aprobada.
- Commit de cierre.

Pendiente:

- Probar F4 en el deploy: login, medios, productos y RLS.
- Preparar F6: QA, deploy final, informe y defensa.
- Cerrar F4 con pruebas, deploy, RLS y verificación.
- F6 queda para la etapa final.

---

## 5.1. F3 en curso

Completado:

- T01: `src/utils/carrito.js` con clave de fusión, normalización de notas y cantidades, límites, totales, lectura/escritura segura de `localStorage` y tests.
- T02: `CarritoProvider` y `useCarrito` con agregado, fusión, cantidades, quitar, vaciar y persistencia.
- T03: revalidación de productos/opciones contra el servicio al recuperar el carrito.
- T04: “Agregar al encargo” activo en el detalle, con confirmación accesible.
- T05: contador por unidades en navbar y menú móvil.
- T06: página `/carrito` con lista de ítems, opciones, notas, cantidades y acciones.
- T07: resumen con total estimado, precio pendiente, estado vacío y confirmación de vaciado.
- T08: mensaje de WhatsApp del carrito con ítems, cantidades, opciones, notas, URL y total.
- T09: botón “Enviar encargo por WhatsApp” con manejo de número faltante.
- T10: integración de ruta, SEO y accesibilidad del carrito.
- T11: flujo agregar desde detalle → contador → carrito verificado.
- T12: `specs/002-carrito-whatsapp/verificacion.md` con matriz RF/AC.
- Tests globales: `npm test` 246/246.
- `npm run lint` y `npm run build` pasan con T01–T12.

Cierre:

- F3 completada y aprobada.
- Commit de cierre de F3.

## 5.2. Base de datos creada

Migraciones ejecutadas en Supabase:

- `db/001_esquema.sql`
- `db/002_policies.sql`
- `db/003_storage.sql`
- `db/004_seed.sql`
- `scripts/crear-admin.mjs`
- Instrucciones en `db/README.md`

Incluyen:

- categoría “Para colorear”;
- precios minorista, mayorista y “desde”;
- seed de 6 productos reales;
- RLS y bucket `media`;
- usuario admin `Facundo` verificado.

Pendiente:

- Verificar RLS con la `anon key` desde el cliente.

---

## 5.3. F4 en curso — Bloque B

Completado:

- `@supabase/supabase-js` 2.58.0 instalado.
- `src/lib/supabase.js` con cliente público.
- Servicio de catálogo híbrido: Supabase en producción y mock como fallback.
- Functions `admin-login`, `admin-session` y `admin-logout`.
- Helpers de sesión JWT, scrypt, cookies y Supabase admin.
- Login propio en `/estudio/login`.
- Ruta `/estudio` protegida.
- Layout administrativo con sidebar y dashboard básico.
- `X-Robots-Tag: noindex` para `/estudio/*`.
- Bloque C: `MediaPage` con subida, recorte, WebP y edición de alt.
- Bloque C: `ProductosPage` y `ProductoFormPage` con imágenes, precios, características, SEO y opciones simples.
- Functions `admin-media-url`, `admin-media` y `admin-productos`.
- `react-easy-crop` instalado.
- `specs/003-panel-admin/verificacion.md` creado.
- Tests globales: `npm test` 257/257.
- `npm run lint` y `npm run build` pasan.

Pendiente:

- Probar login, medios, productos y RLS en Netlify.
- Cerrar F4 y pasar a F6.

---

## 6. Alcance de F1

Alcance:

- Crear `package.json` y fijar versiones.
- Instalar React, Vite, React Router, Tailwind, DaisyUI y dependencias aprobadas.
- Configurar tokens de marca, fuentes, logo y favicon.
- Crear layout, router, 404, Vitest, ESLint y Prettier.
- Crear `netlify.toml` y `.env.example`.
- Verificar `npm test`, `npm run lint` y `npm run build`.

---

## 7. Datos pendientes para fases futuras

- Precios reales por producto.
- Fotos y descripciones reales.
- Contraseña inicial del admin: se define localmente, no en el chat.
- Proyecto Supabase y sitio Netlify.
- Herramientas de IA disponibles para F5.
- Enlaces de YouTube del video promocional y demo.

---

## 8. Orden de lectura para retomar en otro chat

1. `AGENTS.md`
2. `docs/CONSTITUCION.md`
3. `docs/REGLAS-IA.md`
4. `docs/ROADMAP.md`
5. `docs/PROGRESO.md` (este archivo)
6. `memory.md`
7. La spec activa en `specs/`

---

## 9. Historial

| Fecha | Fase | Cambio |
| :--- | :--- | :--- |
| 2026-10-28 | F0 | Constitución, roadmap, reglas, comandos, skills y documentación base. |
| 2026-10-28 | F1 | Dependencias, configuración base, fuentes y favicon. |
| 2026-10-29 | F1 | `opencode.json` reducido a contexto esencial para bajar consumo; `REGLAS-IA.md` y `ROADMAP.md` se leen bajo demanda desde `AGENTS.md`. Se quitó el `theme-color` con hex suelto de `index.html`; los originales de `marca/` se conservan según `IDENTIDAD-MARCA.md`. |
| 2026-10-29 | F1 | Navbar sticky con opacidad/blur, borde verde y ocultado al bajar; logo circular crema con texto blanco y tamaños unificados. Token `blanco` agregado. |
| 2026-10-29 | F1 | Navbar rediseñada: azul sólido con degradado sutil al pie, borde dorado, sombra y logo con PNG más grande; `Pedacito` más grande y alineado con `de ARTE`. |
| 2026-10-30 | F1 | Cierre de F1: router, 404, tests smoke, `netlify.toml`, `.env.example` y deploy verificado en Netlify. |
| 2026-10-30 | F2 | Spec 001 creada y aprobada; clarificación QA con hallazgos pendientes. |
| 2026-10-30 | F2 | Clarificación aprobada; spec y docs actualizados; plan/tareas en curso. |
| 2026-10-30 | F2 | Plan técnico y tareas creados; pendiente aprobación para implementar. |
| 2026-10-30 | F2 | T01 completada: `react-helmet-async` 3.0.0, `HelmetProvider` y smoke test. |
| 2026-10-30 | F2 | T02 completada: variables de entorno y helper de configuración con tests. |
| 2026-10-30 | F2 | T03 completada: datos mock del catálogo con tests de forma y cobertura. |
| 2026-10-30 | F2 | T04 completada: capa de servicio del catálogo con búsqueda, filtros y tests. |
| 2026-10-30 | F2 | T05 completada: normalización de texto compartida y tests. |
| 2026-10-30 | F2 | T06 completada: utilidades de precio y WhatsApp con tests. |
| 2026-10-30 | F2 | T07 completada: hooks de debounce, catálogo y detalle con tests. |
| 2026-10-30 | F2 | T08 completada: hooks de movimiento reducido y scroll a anclas con tests. |
| 2026-11-01 | F2 | T09 completada: hook de carrusel con avance, pausas, reanudación y tests con fake timers. |
| 2026-11-01 | F2 | T10 completada: UI compartida con placeholder, sección semántica y botón con variantes. |
| 2026-11-01 | F2 | T11 completada: layout sin contenedor global, footer completo y offset para anclas. |
| 2026-11-01 | F2 | T12 completada: navbar con enlaces, menú móvil accesible y scroll a anclas conectado. |
| 2026-11-01 | F2 | T13 completada: hero destacado con carrusel, barra de progreso, controles accesibles y tests. |
| 2026-11-01 | F2 | T14 completada: hero de proceso con rotación, pausa/reanudación y movimiento reducido. |
| 2026-11-01 | F2 | T15 completada: intro de marca y franja de servicios con CTA de WhatsApp. |
| 2026-11-01 | F2 | T16 completada: categorías y novedades del Home con datos del servicio. |
| 2026-11-01 | F2 | T17 completada: Home compuesta con SEO, un solo h1 y todas las secciones. |
| 2026-11-01 | F2 | T18 completada: buscador y filtros del catálogo con sincronización de URL. |
| 2026-11-01 | F2 | T19 completada: tarjeta y grilla responsive de productos. |
| 2026-11-01 | F2 | T20 completada: skeletons, estados vacíos y error con reintento. |
| 2026-11-01 | F2 | T21 completada: página de catálogo con URL, filtros, búsqueda, estados y SEO. |
| 2026-11-01 | F2 | T22 completada: galería del detalle con miniaturas y navegación por teclado. |
| 2026-11-01 | F2 | T23 completada: información del detalle, 404 y enlace de vuelta. |
| 2026-11-01 | F2 | T24 completada: opciones de personalización y precio estimado. |
| 2026-11-01 | F2 | T25 completada: notas y CTA de WhatsApp con carrito deshabilitado. |
| 2026-11-01 | F2 | T26 completada: detalle completo, SEO y ruta `/catalogo/:slug`. |
| 2026-11-02 | F2 | T27 completada: auditoría de accesibilidad y responsive con correcciones. |
| 2026-11-02 | F2 | T28 completada: matriz de verificación, comandos de calidad y evidencia de F2. |
| 2026-11-02 | F2 | Ajustes de revisión visual C20: hero, intro, categorías y WhatsApp local. |
| 2026-11-02 | F2 | F2 aprobada por revisión visual y humana; cierre de fase. |
| 2026-11-02 | F3 | Diseño del panel administrativo documentado; Spec 002 del carrito creada. |
| 2026-11-02 | F3 | Clarificación de F3 propuesta con decisiones C01–C20. |
| 2026-11-02 | F3 | Clarificación aprobada; spec actualizada; plan y tareas creados. |
| 2026-11-02 | F3 | Plan y tareas aprobados; comienza T01. |
| 2026-11-02 | F3 | T01 completada: utilidades del carrito y persistencia con tests. |
| 2026-11-02 | F3 | T02 completada: contexto del carrito y persistencia global. |
| 2026-11-02 | F3 | T03 completada: revalidación de ítems contra el catálogo. |
| 2026-11-02 | F3 | T04 completada: agregar al encargo desde el detalle. |
| 2026-11-02 | F3 | T05 completada: contador del carrito en navbar y menú móvil. |
| 2026-11-02 | F3 | Migraciones de Supabase y seed real preparados para ejecutar. |
| 2026-11-02 | F3 | Migraciones ejecutadas y admin `Facundo` creado y verificado. |
| 2026-11-02 | F3 | T06 completada: página `/carrito` con lista y cantidades. |
| 2026-11-02 | F3 | T07 completada: resumen, totales, vaciado y estados del carrito. |
| 2026-11-02 | F3 | T08 completada: mensaje de WhatsApp del carrito. |
| 2026-11-02 | F3 | T09 completada: botón de envío del encargo. |
| 2026-11-02 | F3 | T10–T11 completadas: integración, SEO y flujo del carrito. |
| 2026-11-02 | F3 | T12 completada: verificación y cierre de F3. |
| 2026-11-02 | F4 | Bloque B completado: Supabase público, auth, login, rutas protegidas y dashboard. |
| 2026-11-02 | F4 | Bloque C completado: medios con recorte/WebP y CRUD de productos. |
| 2026-11-02 | F5 | Se crea `docs/informe/prompts-hero.md` con los prompts del hero y su fundamentación. |
| 2026-11-02 | F5 | Medios admite recorte 16:9; `producto_imagenes.es_hero` separa la imagen del hero de la del catálogo. Tests 267/267; migración `005` ejecutada. |
| 2026-11-02 | F5 | Medios y Productos agregan buscador, filtro por formato, nombre visible y seleccionadas primero. Tests 273/273. |
| 2026-11-02 | F5 | Se documentan los prompts de fondo y composición para las imágenes del catálogo en `docs/informe/prompts-catalogo.md`. |
| 2026-11-02 | F5 | El hero se excluye de las tarjetas y la galería; si el producto solo tiene hero, se muestra placeholder. Tests 276/276. |
