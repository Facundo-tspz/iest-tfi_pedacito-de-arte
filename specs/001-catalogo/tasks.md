# Tareas — Spec 001: Home + Catálogo

- **Fase:** F2
- **Estado:** Aprobado — T05 completada; T06 pendiente
- **Plan:** `specs/001-catalogo/plan.md`
- **Regla:** una tarea por vez. No se avanza sin marcar la anterior como terminada y verificada.
- **Estimación:** cada tarea debe resolverse en menos de 30 minutos. Si una tarea se agranda, se divide antes de empezar.

---

## 1. Tabla de tareas

| ID | Tarea | RF / AC | Archivos esperados | Listo cuando | Test asociado | Depende de |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **T01** | Instalar `react-helmet-async` y envolver la app. | RP04.2, AC21 | `package.json`, `package-lock.json`, `src/main.jsx` | La dependencia queda con versión exacta, `HelmetProvider` envuelve la app y `npm run build` pasa. | Smoke test de render con `HelmetProvider`; build. | — |
| **T02** | Configurar variables de entorno y helper de configuración. | RP03.6, C18 | `.env.example`, `src/config/configuracion.js`, test | Las variables están documentadas y el helper devuelve valores con fallback seguro para WhatsApp, sitio, Instagram y email. | Unitario de `configuracion.js`. | — |
| **T03** | Crear datos mock. | RP03.2, AC22 | `src/data/mockCatalogo.js`, test | Hay 4 categorías, 10 productos (2–3 por categoría), 4 destacados, 4 fotos de proceso, `caracteristicas` en todos y `precio_base: null` en todos. | Test de forma y cobertura del mock. | T02 |
| **T04** | Implementar la capa de servicio. | RF01, RF02, RF03, RF04.7, RP03.1–03.3, AC22 | `src/services/catalogo.js`, test | Filtra por categoría, busca sin acentos, excluye categorías inactivas, devuelve `null` para detalle inválido y separa destacados de novedades. | Tests del servicio. | T03 |
| **T05** | Implementar normalización de texto. | RF03.2, AC09 | `src/utils/texto.js`, test | `normalizarTexto` quita acentos, ignora mayúsculas y recorta espacios. | Unitario de `texto.js`. | — |
| **T06** | Implementar utilidades de precio y WhatsApp. | RF01.1, RF01.3, RF04.3, RF04.5, AC13, AC14, AC17 | `src/utils/precio.js`, `src/utils/whatsapp.js`, tests | El precio se formatea en ARS sin decimales, la base nula no produce `$0`, el estimado suma adicionales y el mensaje codifica producto, opciones y notas. | Unitarios de `precio.js` y `whatsapp.js`. | — |
| **T07** | Crear hooks de debounce y datos del catálogo. | RF01.5, RF01.7, RF03.2, AC11 | `src/hooks/useDebouncedValue.js`, `src/hooks/useCatalogo.js`, `src/hooks/useProducto.js`, tests | El debounce espera 300 ms; los hooks manejan loading, éxito, error y reintento. | Tests de hooks con fake timers. | T04 |
| **T08** | Crear hooks de movimiento reducido y scroll a anclas. | RP02.3, RP05.6, AC06 | `src/hooks/useMovimientoReducido.js`, `src/hooks/useScrollToHash.js`, tests | El hook detecta `prefers-reduced-motion` y el scroll lleva a la sección con offset del navbar. | Tests de hooks con `matchMedia` mockeado. | — |
| **T09** | Crear el hook de carrusel. | RP01.4–RP01.8, RP01.12–RP01.13, RP05.4, RP05.6, AC02, AC04, C01, C08 | `src/hooks/useCarrusel.js`, test | Avanza, pausa por interacción, reanuda a los 5 s, permite pausa manual, reinicia con flechas y respeta movimiento reducido. | Tests con fake timers. | T08 |
| **T10** | Crear UI compartida. | RP03.5, RP05.3, RNF03, AC18 | `src/components/ui/PlaceholderImagen.jsx`, `src/components/ui/Seccion.jsx`, `src/components/ui/Boton.jsx`, tests | Placeholder con tokens y `alt`, sección con título semántico y botón con variantes accesibles. | Tests de componentes. | — |
| **T11** | Actualizar layout, footer y full-bleed. | RP01.15, RP02.3, RP06, AC01, AC06 | `src/components/layout/AppLayout.jsx`, `src/components/layout/Footer.jsx`, `src/styles/index.css`, test | El layout no impone contenedor global, renderiza Navbar/Footer/Outlet y las anclas no quedan tapadas. | Test de layout y footer. | T10 |
| **T12** | Implementar navbar y menú móvil accesible. | RP02.1, RP02.2, RP02.4, RP05.2, AC05, AC06, C09 | `src/components/layout/Navbar.jsx`, `src/components/layout/MenuMovil.jsx`, tests | Los enlaces funcionan; el menú usa `aria-expanded`/`aria-controls`, foco al abrir, Escape, cierre por ruta y retorno de foco. | Tests de navbar y menú. | T11 |
| **T13** | Implementar hero destacado. | RP01.1–RP01.8, AC01–AC03, C01 | `src/components/home/HeroDestacados.jsx`, `src/components/home/HeroSlide.jsx`, tests | Muestra hasta 4 destacados, frase de marca, flechas, pausa/play, barra de progreso y `aria` correctos. | Tests de hero. | T09, T10 |
| **T14** | Implementar hero de proceso. | RP01.12–RP01.13, AC04 | `src/components/home/HeroProceso.jsx`, test | Rota cada 4 s, pausa/reanuda, tiene botón de pausa/play y respeta movimiento reducido. | Tests de hero de proceso. | T09, T10 |
| **T15** | Implementar intro de marca y franja de servicios. | RP01.9, RP01.14, AC01 | `src/components/home/IntroMarca.jsx`, `src/components/home/ServiciosCTA.jsx`, tests | Ambas secciones renderizan contenido, CTA de WhatsApp y usan tokens. | Tests de secciones. | T10 |
| **T16** | Implementar categorías y novedades del Home. | RP01.10, RP01.11, AC01, C16 | `src/components/home/CategoriasHome.jsx`, `src/components/home/Novedades.jsx`, tests | Hay 4 tarjetas de categoría con enlace filtrado y 4 novedades sin repetir el hero. | Tests de secciones con datos mock. | T04, T10 |
| **T17** | Componer la Home y aplicar SEO. | RP01.16, RP04.1–RP04.5, AC01, AC21 | `src/pages/HomePage.jsx`, `src/components/seo/SEO.jsx`, tests | La Home tiene todas las secciones, un solo `h1`, título, descripción y Open Graph. | Test de Home + SEO. | T01, T13–T16 |
| **T18** | Implementar buscador y filtros del catálogo. | RF02, RF03, AC08, AC09 | `src/components/catalogo/BuscadorCatalogo.jsx`, `src/components/catalogo/FiltrosCategoria.jsx`, tests | Controles etiquetados, `aria-pressed`, URL sincronizada, debounce y limpieza funcionan. | Tests de controles. | T07 |
| **T19** | Implementar tarjeta y grilla de productos. | RF01.1–RF01.4, AC07, AC17 | `src/components/catalogo/ProductoCard.jsx`, `src/components/catalogo/GrillaProductos.jsx`, tests | La tarjeta muestra imagen/placeholder, nombre, categoría, descripción breve y precio; la grilla responde 1/2/3–4 columnas. | Tests de tarjeta y grilla. | T10 |
| **T20** | Implementar skeletons, estado vacío y error. | RF01.5–RF01.7, RF03.5, AC10, AC11 | `src/components/catalogo/SkeletonCard.jsx`, `src/components/catalogo/EstadoVacio.jsx`, `src/components/catalogo/MensajeError.jsx`, tests | Hay skeletons durante la carga, dos variantes de vacío y error con reintento. | Tests de estados. | T10 |
| **T21** | Componer la página de catálogo y su SEO. | RF02.4–RF02.6, RF03.3–RF03.7, RP04, AC08–AC10, AC21 | `src/pages/CatalogoPage.jsx`, tests | Lee la URL, aplica filtros y búsqueda, muestra aviso de categoría inválida, contador `aria-live` y metadatos. | Test de catálogo + SEO. | T01, T18–T20 |
| **T22** | Implementar galería del detalle. | RF04.1, RF04.8, AC12 | `src/components/producto/GaleriaProducto.jsx`, test | Cambia la imagen principal con miniaturas, funciona con teclado, usa placeholder y `alt`. | Test de galería. | T10 |
| **T23** | Implementar información del detalle, 404 y volver. | RF04.1, RF04.7, RF04.9, AC12, AC16 | `src/pages/ProductoDetallePage.jsx` (primera parte), tests | Muestra nombre, categoría, descripción, características y precio; slug inválido muestra 404; hay enlace de vuelta. | Test de detalle y 404. | T04, T22 |
| **T24** | Implementar opciones y precio estimado. | RF04.2–RF04.3, AC13, C04 | `src/components/producto/OpcionesPersonalizacion.jsx`, `src/components/producto/PrecioEstimado.jsx`, tests | Cada tipo es un grupo de radios con “Sin preferencia”; el estimado suma adicionales o muestra “Precio a confirmar”. | Tests de opciones y precio. | T06, T23 |
| **T25** | Implementar notas y CTA de WhatsApp. | RF04.4–RF04.6, AC14, AC15, C06, C17 | `src/components/producto/NotasPersonalizacion.jsx`, `src/components/producto/CtaWhatsApp.jsx`, tests | Notas limitadas a 500, texto plano, mensaje codificado con opciones/notas, número faltante manejado y carrito deshabilitado visible. | Tests de notas y CTA. | T06, T24 |
| **T26** | Integrar el detalle completo y su SEO. | RF04, RP04, AC12–AC16, AC21 | `src/pages/ProductoDetallePage.jsx`, `src/routes/AppRouter.jsx`, tests | La ruta `/catalogo/:slug` renderiza todo el detalle, 404 y metadatos con fallback. | Test de detalle completo + router. | T01, T23–T25 |
| **T27** | Auditar accesibilidad y responsive. | RP05, RP06, AC19, AC20 | Componentes afectados, `src/styles/index.css`, notas de auditoría | Recorrido por teclado sin bloqueos, foco visible, `aria` correctos y sin overflow en 360/768/1280 px. | Tests de accesibilidad + revisión manual. | T17, T21, T26 |
| **T28** | Cerrar calidad y evidencia. | RNF06, AC24 | `specs/001-catalogo/verificacion.md`, `docs/PROGRESO.md`, `memory.md` | `npm test`, `npm run lint` y `npm run build` pasan; la matriz RF → evidencia queda actualizada. | Comandos de calidad + revisión de evidencia. | T27 |

---

## 2. Orden de ejecución

1. T01–T02: configuración y dependencia.
2. T03–T06: datos, servicio y utilidades.
3. T07–T09: hooks.
4. T10–T12: UI compartida, layout y navegación.
5. T13–T17: Home.
6. T18–T21: catálogo.
7. T22–T26: detalle.
8. T27–T28: accesibilidad, responsive y cierre.

---

## 3. Reglas de avance

- Marcar una tarea como terminada solo cuando su “Listo cuando” se cumple y su test pasa.
- No empezar una tarea si la dependencia no está terminada.
- No mezclar tareas de F3 o F4.
- Si una tarea necesita un cambio de alcance, detenerse y usar `/cambio`.
- Al terminar cada tarea, ejecutar el test asociado y, si corresponde, `npm run lint`.
- Al cerrar F2, ejecutar `npm test`, `npm run lint` y `npm run build`, y completar `verificacion.md`.
- La implementación comienza solo con la palabra **“aprobado”**.
