# Verificación — Spec 001: Home + Catálogo

- **Fecha:** 2026-11-02
- **Fase:** F2
- **Estado:** Aprobada por revisión visual y humana.
- **Alcance verificado:** RF01–RF04, RP01–RP06, AC01–AC24.

---

## 1. Comandos de calidad

| Comando | Resultado |
| :--- | :--- |
| `npm test` | 208/208 tests, 46 archivos |
| `npm run lint` | Sin errores |
| `npm run build` | Correcto, 99 módulos transformados |

---

## 2. Matriz de requisitos funcionales

| RF | Evidencia | Estado |
| :--- | :--- | :--- |
| RF01 — Catálogo público | `src/components/catalogo/ProductoCard.jsx`, `GrillaProductos.jsx`, `EstadoVacio.jsx`, `MensajeError.jsx`, `src/pages/CatalogoPage.jsx`; tests de tarjeta, grilla, estados y catálogo. | cumple |
| RF02 — Filtrado | `src/components/catalogo/FiltrosCategoria.jsx`, `src/services/catalogo.js`, `src/pages/CatalogoPage.jsx`; tests de filtros, servicio y catálogo. | cumple |
| RF03 — Búsqueda | `src/components/catalogo/BuscadorCatalogo.jsx`, `src/utils/texto.js`, `src/services/catalogo.js`; tests de debounce, URL, servicio y catálogo. | cumple |
| RF04 — Detalle y personalización | `src/pages/ProductoDetallePage.jsx`, `GaleriaProducto.jsx`, `OpcionesPersonalizacion.jsx`, `PrecioEstimado.jsx`, `NotasPersonalizacion.jsx`, `CtaWhatsApp.jsx`; tests de detalle y componentes. | cumple |

---

## 3. Matriz de requisitos de producto

| RP | Evidencia | Estado |
| :--- | :--- | :--- |
| RP01 — Home | `src/pages/HomePage.jsx` y componentes de `src/components/home/`; tests de Home y secciones. | cumple |
| RP02 — Navegación y layout | `Navbar.jsx`, `MenuMovil.jsx`, `AppLayout.jsx`, `useScrollToHash.js`; tests de navbar, menú, layout y anclas. | cumple |
| RP03 — Datos y servicio | `src/data/mockCatalogo.js`, `src/services/catalogo.js`, `PlaceholderImagen.jsx`; tests de mock, servicio y placeholder. | cumple |
| RP04 — SEO | `src/components/seo/SEO.jsx`; metadatos en Home, Catálogo y Detalle; tests de SEO y páginas. | cumple |
| RP05 — Accesibilidad | Tests de menú móvil, galería, filtros, formularios, botones y carruseles; skip link y regiones `aria-live`; revisión estática de foco visible. | cumple |
| RP06 — Responsive | Clases mobile first, grilla 1/2/3–4, menú móvil y alturas 80/70 y 55/45; revisión visual en navegador pendiente. | cumple parcial |

---

## 4. Criterios de aceptación

| AC | Evidencia | Estado |
| :--- | :--- | :--- |
| AC01 | `HomePage.test.jsx` verifica todas las secciones y un solo `h1`. | cumple |
| AC02 | Tests de `HeroDestacados` y `useCarrusel`: 8 s, flechas, pausas y reanudación. | cumple |
| AC03 | Tests de barra de progreso, pausa y movimiento reducido. | cumple |
| AC04 | Tests de `HeroProceso`: 4 s, izquierda, pausas y movimiento reducido. | cumple |
| AC05 | Tests de `Navbar` y `MenuMovil`. | cumple |
| AC06 | Tests de `useScrollToHash` y layout con offset. | cumple |
| AC07 | Tests de `CatalogoPage`, `ProductoCard` y `GrillaProductos`. | cumple |
| AC08 | Tests de filtros, servicio y catálogo. | cumple |
| AC09 | Tests de buscador, normalización y URL. | cumple |
| AC10 | Tests de `EstadoVacio` y catálogo. | cumple |
| AC11 | Tests de `SkeletonCard`, `MensajeError` y fecha de reintento. | cumple |
| AC12 | Tests de `ProductoDetallePage` y `GaleriaProducto`. | cumple |
| AC13 | Tests de opciones y precio estimado. | cumple |
| AC14 | Tests de notas, mensaje y URL de WhatsApp. | cumple |
| AC15 | Test de “Agregar al encargo” deshabilitado con aviso. | cumple |
| AC16 | Tests de detalle con slug inválido y servicio con producto no disponible. | cumple |
| AC17 | Tests de precio nulo sin `$0`. | cumple |
| AC18 | Búsqueda de hex en `src/`: solo aparecen en `src/styles/index.css` como tokens. | cumple |
| AC19 | Tests de teclado y foco del menú, galería, filtros y formularios; skip link. Revisión visual de foco pendiente. | cumple |
| AC20 | Clases responsive y tests de grilla/alturas; revisión visual 360/768/1280 pendiente. | cumple parcial |
| AC21 | Tests de SEO en Home, Catálogo y Detalle. | cumple |
| AC22 | Tests de forma del mock y servicio reemplazable. | cumple |
| AC23 | Sin código de carrito, Supabase, admin ni pagos en `src/`, `package.json` o Functions. | cumple |
| AC24 | `npm test`, `npm run lint` y `npm run build` pasan. | cumple |

---

## 5. Auditoría T27

### Correcciones aplicadas

| Hallazgo | Severidad | Ubicación | Corrección |
| :--- | :--- | :--- | :--- |
| Faltaba un mecanismo para saltear la navegación con teclado. | media | `src/components/layout/AppLayout.jsx` | Se agregó “Saltar al contenido” y `main#contenido-principal` enfocable. |
| El cambio de precio estimado no se anunciaba a lectores de pantalla. | media | `src/components/producto/PrecioEstimado.jsx` | Se agregó `role="status"` y `aria-live="polite"`. |
| La CTA de WhatsApp deshabilitada no explicaba la causa fuera de desarrollo. | media | `src/components/producto/CtaWhatsApp.jsx` | Se agregó explicación visible y `aria-describedby`. |
| Textos largos sin espacios podían desbordar tarjetas y encabezados. | baja | Detalle, tarjetas, hero y footer | Se agregaron `break-words` y `min-w-0` en los contenedores afectados. |
| La altura del hero chico no coincidía con la decisión C11. | baja | `src/components/home/HeroProceso.jsx` | Se ajustó a 55vh móvil / 45vh escritorio. |
| El contenedor de resultados no exponía su estado de carga. | baja | `src/pages/CatalogoPage.jsx` | Se agregó `aria-busy`. |
| La frase del hero quedaba alineada a la izquierda. | baja | `src/components/home/HeroDestacados.jsx` | Se centró el texto de la frase de marca. |
| El hover pausaba ambos carruseles de forma antinatural. | media | `HeroDestacados.jsx`, `HeroProceso.jsx` | Se quitó `onMouseEnter`; se mantiene pausa por foco, clic, touch y teclado. |
| Los segmentos de progreso aparecían llenos antes de su turno. | media | `HeroDestacados.jsx` | Se cambió `animationFillMode` a `both` y se agregaron tests. |
| La intro tenía una descripción separada del cuerpo con un salto grande. | baja | `IntroMarca.jsx` | Se integró la bajada al cuerpo y se redujo la altura de la foto. |
| Las categorías se veían demasiado planas. | baja | `CategoriasHome.jsx`, `FiltrosCategoria.jsx` | Se agregaron acentos, badge, degradado y estados de filtro con la paleta. |

### Revisión estática

- No se encontraron colores hexadecimales sueltos en componentes; los valores están en los tokens de `src/styles/index.css`.
- Se revisó la jerarquía: Home, Catálogo, Detalle y 404 tienen un solo `h1`.
- Los controles principales tienen foco visible global y etiquetas accesibles.
- Se revisaron las clases responsive de grillas, menú, heroes, detalle y footer.

### Revisión manual

El estudiante revisó la Home, el catálogo y el detalle en navegador, reportó ajustes visuales y aprobó la fase después de las correcciones C20. No se generaron capturas automatizadas porque el entorno no tiene navegador headless; Lighthouse queda para F6.

---

## 6. Recorrido manual sugerido

1. Abrir `/` en 360, 768 y 1280 px.
2. Recorrer con teclado: skip link, navbar, menú móvil, hero, categorías, novedades, proceso, servicios y footer.
3. Abrir `/catalogo`, probar buscador, limpieza, filtros, URL y estados vacíos.
4. Abrir `/catalogo/agenda-botanica`, cambiar imágenes con teclado, seleccionar opciones, escribir notas y revisar el enlace de WhatsApp.
5. Abrir `/catalogo/no-existe` y verificar la página 404.
6. Revisar que no haya scroll horizontal ni texto cortado.
