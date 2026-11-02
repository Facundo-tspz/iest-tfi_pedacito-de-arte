# Progreso del Proyecto: Pedacito de Arte

- **Última actualización:** 2026-11-01
- **Fase actual:** F2 en curso — T22 completada; T23 pendiente de aprobación
- **Repositorio:** https://github.com/Facundo-tspz/iest-tfi_pedacito-de-arte
- **Estado del repositorio:** `main` actualizado en `origin`; T22 sin commit.

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
| Productos | Agendas, Agendas Docentes, Anotadores y Revistas para Colorear. |
| Modelo | Solo encargos por WhatsApp; sin pagos, checkout, stock ni historial. |
| Precios | Precio base + total estimado; el final se confirma por WhatsApp. |
| WhatsApp | +54 9 297 462 371 → `549297462371`. |
| Admin inicial | Usuario `Facundo`; contraseña definida por script local. |
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
- `useCarrusel` expone `reinicio` para reiniciar la barra de progreso al reanudar o cambiar de slide.
- `src/styles/index.css` con la animación `progreso-hero`.
- Smoke test de `main` con timeout ampliado para el suite completo.
- Tests de texto, precio, WhatsApp, servicio, hooks, UI compartida, layout, footer, navbar, menú móvil, heroes, intro, servicios, categorías, novedades, SEO, Home, controles de catálogo, tarjeta, grilla, estados, catálogo, rutas y galería agregados; `npm test` 189/189.
- `npm run lint` y `npm run build` pasan con T22.

Cierre:

- T22 completada; commit pendiente de aprobación.

Pendiente:

- T23–T28: implementación, tests, build y validación de RF01–RF04, RP01–RP06.

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
