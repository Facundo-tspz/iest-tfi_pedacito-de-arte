# Spec 001 — Home + Catálogo

- **Fase:** F2
- **Estado:** Aprobada — clarificación resuelta (2026-10-30)
- **Depende de:** F1 (base técnica) y documentación `docs/01` a `docs/11`
- **Habilita:** F3 (carrito de encargos + WhatsApp) y F4 (panel admin + CMS)

---

## 1. Contexto y problema

Pedacito de Arte comercializa papelería artesanal en ferias, Instagram y WhatsApp. Hoy el catálogo está disperso y cada consulta se responde de forma individual. El sitio debe ordenar la vidriera pública, permitir explorar las cuatro líneas de producto y mostrar el detalle con sus opciones de personalización.

Esta spec cubre la **vidriera pública**: Home, catálogo y detalle de producto. El carrito, el envío del encargo por WhatsApp y el panel administrativo pertenecen a fases posteriores.

---

## 2. Objetivo

Implementar la Home y el catálogo público de las cuatro líneas de producto, con búsqueda, filtros, detalle y opciones de personalización, usando datos mock y una capa de servicio reemplazable por Supabase en F4.

---

## 3. Historias de usuario

### HU-01 — Explorar el catálogo

> **Como** cliente interesado en papelería artesanal,
> **quiero** ver los productos organizados por categoría, buscar y abrir el detalle,
> **para** conocer las opciones antes de consultar por WhatsApp.

**Criterios de aceptación asociados:** AC05 a AC15.

### HU-02 — Conocer la marca desde la Home

> **Como** visitante que llega desde Instagram o una feria,
> **quiero** entender qué hace Pedacito de Arte y ver productos destacados,
> **para** decidir si me interesa el catálogo.

**Criterios de aceptación asociados:** AC01 a AC04.

### HU-03 — Consultar un producto

> **Como** cliente interesado en un producto,
> **quiero** elegir opciones, dejar una nota y consultar por WhatsApp,
> **para** resolver dudas antes de encargar.

**Criterios de aceptación asociados:** AC10 a AC13.

### HU-04 — Navegar desde el celular

> **Como** cliente que entra desde el celular,
> **quiero** navegar con menú hamburguesa, filtros y tarjetas legibles,
> **para** usar el sitio cómodamente desde 360 px.

**Criterios de aceptación asociados:** AC16 y AC17.

---

## 4. Alcance

### Incluye

- Home con hero destacado, intro de marca, categorías, novedades, sección de proceso, servicios, CTA de WhatsApp y footer.
- Catálogo con búsqueda, filtros por categoría, grilla responsive, contador de resultados, estado vacío y skeletons.
- Detalle de producto con galería, características, precio, opciones de personalización, notas y consulta por WhatsApp.
- Datos mock alineados a `docs/05-DATOS.md` y capa de servicio `src/services/catalogo.js`.
- Navbar con anclas y menú móvil.
- SEO por ruta, accesibilidad, responsive y tests.

### No incluye

- Carrito, cantidades, subtotal, persistencia local ni mensaje de encargo múltiple (F3).
- Supabase, SQL, RLS, Storage ni migraciones (F4).
- Panel administrativo, CMS, usuarios y medios (F4).
- Fotos, descripciones y precios definitivos (F5).
- Páginas completas de Servicios y Contacto, formulario de consulta y contenido editable (RF07/RF08, fase posterior).
- Pagos, checkout, cuentas de cliente, stock, historial de pedidos y envíos.
- Paginación, ordenamiento avanzado, sitemap y robots (se evaluarán más adelante).
- Multiidioma y reseñas de productos.

---

## 5. Requisitos funcionales (EARS)

### RF01 — Catálogo público

- **RF01.1** El sistema deberá mostrar los productos disponibles con imagen, nombre, descripción breve, categoría y precio base o “Precio a confirmar”, con formato de pesos argentinos sin decimales.
- **RF01.2** Cuando el usuario acceda a `/catalogo`, el sistema deberá mostrar la grilla de productos disponibles.
- **RF01.3** Donde un producto no tenga `precio_base`, el sistema deberá mostrar “Precio a confirmar” y nunca `$0`.
- **RF01.4** Cuando el usuario seleccione “Ver detalle” en una tarjeta, el sistema deberá navegar a `/catalogo/:slug`.
- **RF01.5** Mientras los productos se estén cargando, el sistema deberá mostrar tarjetas skeleton.
- **RF01.6** Si no hay productos publicados, entonces el sistema deberá mostrar un estado vacío sin el botón “Ver todo el catálogo”; si hay productos pero los filtros o la búsqueda no devuelven resultados, deberá mostrar el estado vacío con la acción “Ver todo el catálogo”.
- **RF01.7** Si el servicio devuelve un error, entonces el sistema deberá mostrar un mensaje claro con una acción para reintentar.

### RF02 — Filtrado por categoría

- **RF02.1** El sistema deberá ofrecer los filtros “Todas”, “Agendas”, “Agendas Docentes”, “Anotadores” y “Revistas para Colorear”.
- **RF02.2** Cuando el usuario seleccione una categoría, el sistema deberá mostrar solo los productos de esa categoría.
- **RF02.3** Cuando el usuario seleccione “Todas”, el sistema deberá mostrar todos los productos disponibles.
- **RF02.4** El sistema deberá reflejar la categoría activa en la URL mediante `?categoria=slug`.
- **RF02.5** Cuando el usuario abra una URL con `?categoria=slug`, el sistema deberá aplicar ese filtro.
- **RF02.6** Si la categoría de la URL no existe o está inactiva, entonces el sistema deberá mostrar todos los productos disponibles y un aviso discreto.
- **RF02.7** El filtro activo deberá ser accesible por teclado y anunciar su estado mediante `aria-pressed`.
- **RF02.8** El sistema no deberá mostrar productos cuya categoría esté inactiva, ni siquiera en “Todas”; el detalle directo de esos productos deberá responder 404.

### RF03 — Búsqueda

- **RF03.1** El sistema deberá ofrecer un buscador en el catálogo.
- **RF03.2** Cuando el usuario escriba en el buscador, el sistema deberá filtrar por nombre, descripción, código y nombre de categoría, sin distinguir mayúsculas, minúsculas ni acentos, con un retardo de 300 ms desde la última tecla.
- **RF03.3** El sistema deberá combinar la búsqueda con el filtro de categoría activo.
- **RF03.4** El sistema deberá reflejar la búsqueda en la URL mediante `?buscar=...`, usando `replace` para no agregar entradas al historial.
- **RF03.5** Cuando la búsqueda no devuelva resultados, el sistema deberá mostrar el estado vacío con la acción “Ver todo el catálogo”.
- **RF03.6** Cuando el usuario limpie la búsqueda, el sistema deberá mostrar nuevamente todos los productos de la categoría activa.
- **RF03.7** El sistema deberá anunciar la cantidad de resultados mediante una región `aria-live="polite"`.

### RF04 — Detalle y personalización

- **RF04.1** Cuando el usuario acceda a `/catalogo/:slug`, el sistema deberá mostrar la galería, el nombre, la categoría, la descripción, las características y el precio base o “Precio a confirmar”.
- **RF04.2** El sistema deberá mostrar las opciones de personalización agrupadas por tipo, con su precio adicional cuando corresponda; cada tipo permitirá una sola selección mediante radios y ofrecerá “Sin preferencia” por defecto.
- **RF04.3** Cuando el usuario seleccione opciones, el sistema deberá mostrar el precio estimado (base + adicionales) o “Precio a confirmar” si la base es nula.
- **RF04.4** El sistema deberá permitir escribir notas de personalización en texto plano, con un máximo de 500 caracteres y sin aceptar HTML.
- **RF04.5** Cuando el usuario seleccione “Consultar por WhatsApp”, el sistema deberá abrir WhatsApp con un mensaje codificado con `encodeURIComponent` que incluya el producto, las opciones elegidas o “Sin preferencia” y las notas.
- **RF04.6** El sistema deberá mostrar “Agregar al encargo” deshabilitado con un aviso de que estará disponible en la próxima etapa.
- **RF04.7** Si el slug no existe, el producto no está disponible o su categoría está inactiva, entonces el sistema deberá mostrar la página 404.
- **RF04.8** La galería deberá permitir cambiar la imagen principal y ser accesible por teclado.
- **RF04.9** El sistema deberá mostrar un enlace para volver al catálogo; no se incluyen migas de pan en F2.

### RP01 — Home

- **RP01.1** El sistema deberá mostrar un hero full-bleed con una foto de escena y texto superpuesto.
- **RP01.2** El hero deberá mostrar hasta 4 productos con `destacado=true`, ordenados por `orden` y completados con los primeros disponibles si hay menos de 4, con nombre, descripción breve, categoría, precio y llamada a la acción.
- **RP01.3** El hero deberá mostrar la frase fija “Papelería creativa / hecha con amor” en dos renglones, arriba a la derecha, con las líneas alineadas a la izquierda.
- **RP01.4** El hero deberá avanzar automáticamente cada 8 segundos y permitir navegación manual con flechas.
- **RP01.5** Mientras el hero esté en reproducción automática, la barra de progreso deberá llenarse de forma continua durante 6 segundos y mostrar dos segmentos cortos en los últimos 2 segundos; la barra se detiene con la pausa y se oculta con movimiento reducido.
- **RP01.6** Cuando el usuario pase el mouse, enfoque, haga clic, toque o use el teclado sobre el hero, el sistema deberá pausar el avance automático y reanudarlo a los 5 segundos sin interacción; además, deberá ofrecer un botón visible de pausa/play.
- **RP01.7** Cuando el usuario use las flechas, el sistema deberá reiniciar el temporizador.
- **RP01.8** Donde el usuario prefiera movimiento reducido, el sistema deberá detener el avance automático.
- **RP01.9** El sistema deberá mostrar una sección de intro de marca con bajada, llamadas a la acción y foto.
- **RP01.10** El sistema deberá mostrar 4 tarjetas de categoría que enlacen al catálogo filtrado.
- **RP01.11** El sistema deberá mostrar una sección “Novedades” con las siguientes 4 tarjetas de producto por `orden` que no estén en el hero, completando con las disponibles si faltan.
- **RP01.12** El sistema deberá mostrar un hero chico full-bleed con fotos de proceso que roten automáticamente hacia la izquierda cada 4 segundos.
- **RP01.13** El hero chico deberá pausarse al pasar el mouse, enfocar, hacer clic o tocar, reanudarse a los 5 segundos sin interacción, ofrecer un botón visible de pausa/play y detenerse con movimiento reducido.
- **RP01.14** El sistema deberá mostrar una franja de servicios y una llamada a la acción de WhatsApp.
- **RP01.15** El sistema deberá mostrar un footer con logo, navegación, contacto, redes y textos legales.
- **RP01.16** La Home deberá tener un solo `h1` y una jerarquía de encabezados correcta.

### RP02 — Navegación y layout

- **RP02.1** El sistema deberá mostrar en la navbar los enlaces Inicio, Catálogo, Nosotros, Servicios y Contacto.
- **RP02.2** Los enlaces Nosotros, Servicios y Contacto deberán llevar a las anclas del Home.
- **RP02.3** Cuando el usuario navegue a una ancla, el sistema deberá hacer scroll a la sección sin que el navbar sticky tape el título.
- **RP02.4** El sistema deberá ofrecer un menú hamburguesa accesible en móvil, con `aria-expanded` y `aria-controls`, foco al primer enlace al abrir, cierre con Escape y al cambiar de ruta, foco atrapado mientras está abierto y retorno del foco al botón al cerrar.
- **RP02.5** El sistema deberá mantener el logo y la identidad visual definidos en F1.
- **RP02.6** El contador de encargos no se mostrará en F2.

### RP03 — Datos mock y capa de servicio

- **RP03.1** El sistema deberá obtener categorías, productos y detalle desde `src/services/catalogo.js`.
- **RP03.2** Los datos mock deberán respetar la forma de `docs/05-DATOS.md`, incluyendo `caracteristicas` como arreglo de strings; F4 agregará `caracteristicas text[]` a `productos`.
- **RP03.3** El servicio deberá ser asíncrono y reemplazable por Supabase sin cambiar las páginas.
- **RP03.4** Los textos, nombres y precios mock deberán estar marcados como provisionales.
- **RP03.5** Las imágenes faltantes deberán mostrarse con un placeholder de marca y `alt` descriptivo.
- **RP03.6** El número de WhatsApp, el dominio y las redes se leerán de configuración (`VITE_WHATSAPP`, `VITE_SITE_URL`, `VITE_INSTAGRAM`, `VITE_EMAIL`), no de los componentes.

### RP04 — SEO

- **RP04.1** El sistema deberá definir título y descripción por ruta según `docs/09-SEO.md`.
- **RP04.2** El sistema deberá usar `react-helmet-async` para los metadatos por ruta; la dependencia se instala en F2 y se justifica en `docs/11-CAMBIOS.md`.
- **RP04.3** El detalle deberá usar `meta_titulo` y `meta_descripcion` del producto, con fallback a su nombre y descripción.
- **RP04.4** El sistema deberá incluir Open Graph en Home, Catálogo y Detalle, con el isotipo del logo como imagen provisional hasta F5.
- **RP04.5** Las URLs absolutas de Open Graph deberán construirse con `VITE_SITE_URL`.

### RP05 — Accesibilidad

- **RP05.1** El sistema deberá tener un solo `h1` por página.
- **RP05.2** Todos los controles deberán ser accesibles por teclado y tener foco visible.
- **RP05.3** Las imágenes deberán tener `alt` descriptivo; las decorativas deberán usar `alt=""`.
- **RP05.4** El carrusel deberá tener etiquetas accesibles, pausa visible y `aria-live="polite"` solo para los cambios manuales; los slides inactivos llevarán `aria-hidden="true"`.
- **RP05.5** Los filtros deberán usar `aria-pressed` y el buscador deberá tener etiqueta.
- **RP05.6** El sistema deberá respetar `prefers-reduced-motion`.
- **RP05.7** El contraste del texto sobre las fotos deberá ser suficiente mediante el degradado de la interfaz.

### RP06 — Responsive

- **RP06.1** El sistema deberá ser mobile first desde 360 px.
- **RP06.2** La grilla del catálogo deberá ser de 1 columna en móvil, 2 en tablet y 3 o 4 en escritorio.
- **RP06.3** El navbar deberá colapsar en menú hamburguesa en móvil.
- **RP06.4** Los heroes deberán adaptar altura y posición del texto en móvil.
- **RP06.5** Las alturas de los heroes serán 80/70vh para el grande y 55/45vh para el chico; se ajustarán al revisar el resultado en el navegador.

---

## 6. Requisitos no funcionales aplicables

- **RNF01 — Responsive:** mobile first desde 360 px, tablet y escritorio.
- **RNF02 — Rendimiento:** imágenes optimizadas, placeholders livianos, sin dependencias innecesarias y sin layout shift.
- **RNF03 — Identidad visual:** solo tokens de marca; prohibido escribir colores hex en componentes.
- **RNF04 — Accesibilidad:** contraste, foco visible, teclado, jerarquía de encabezados y `alt` descriptivo.
- **RNF06 — Calidad:** tests automáticos, `npm run lint` y `npm run build` sin errores.
- **RNF08 — SEO:** títulos y descripciones por página, Open Graph y URLs absolutas desde configuración.
- **RNF10 — Mantenibilidad:** componentes modulares, nombres en español y capa de servicio separada de las páginas.

---

## 7. Casos límite

1. Producto sin `precio_base`: mostrar “Precio a confirmar”, nunca `$0`.
2. Producto sin imágenes: mostrar placeholder de marca con `alt` descriptivo.
3. Categoría sin productos: mostrar estado vacío.
4. Búsqueda sin resultados: mostrar estado vacío y acción “Ver todo el catálogo”.
5. Categoría inexistente o inactiva en la URL: mostrar todos los productos disponibles (excluyendo los de categorías inactivas) y un aviso discreto.
6. Slug inexistente, producto no disponible o categoría inactiva: mostrar 404.
7. Menos de 4 productos destacados: el hero muestra los disponibles y adapta la barra.
8. Sin productos destacados: el hero usa hasta los primeros 4 productos disponibles; si tampoco hay, muestra un hero de marca con CTA al catálogo.
9. Producto sin opciones de personalización: ocultar la sección de opciones; la consulta de WhatsApp incluye solo producto y notas.
10. Producto con precio base nulo y opciones con adicionales: mostrar “Precio a confirmar”, sin total numérico.
11. Nombres o descripciones largas: truncar en tarjetas y mostrar el texto completo en el detalle.
12. Servicio lento: mostrar skeletons mientras carga.
13. Servicio con error: mostrar mensaje con acción para reintentar.
14. `VITE_WHATSAPP` vacío: ocultar o deshabilitar la CTA de WhatsApp y registrar un aviso en desarrollo.
15. Movimiento reducido: detener autoavances y transiciones.
16. Cambio manual de URL con filtros o búsqueda: aplicar el estado de la URL.
17. Menú móvil abierto: cerrar con Escape y al navegar, devolver el foco al botón y mantener el foco atrapado mientras está abierto.
18. Imagen sin `alt` en los datos: usar el nombre del producto como texto alternativo.
19. Categoría inactiva: no mostrarla en los filtros ni en las tarjetas de categoría; sus productos tampoco se muestran y el detalle directo responde 404.
20. Notas de personalización con más de 500 caracteres: limitar la entrada a 500 y recortar el texto pegado.
21. Búsqueda con acentos o mayúsculas: normalizar el texto antes de comparar.

---

## 8. Fuera de alcance

- Carrito, cantidades, subtotal, persistencia en `localStorage` y mensaje de encargo múltiple.
- Envío del encargo completo por WhatsApp (F3).
- Supabase, SQL, RLS, Storage y migraciones (F4).
- Panel administrativo, CMS, usuarios, medios y configuración (F4).
- Fotos, descripciones y precios definitivos (F5).
- Páginas completas de Servicios y Contacto, formulario de consulta y contenido editable.
- Pagos, checkout, cuentas de cliente, stock, historial de pedidos y envíos.
- Paginación, ordenamiento avanzado, sitemap y robots.
- Multiidioma y reseñas.

---

## 9. Dependencias

- **F1:** layout base, router, tokens, fuentes, logo, tests y deploy.
- **F3:** reutilizará el detalle, las opciones y el precio estimado para el carrito.
- **F4:** reemplazará los datos mock por Supabase y agregará `caracteristicas text[]` a `productos`; el esquema definitivo se documenta en `docs/05-DATOS.md`.
- **F5:** aportará las fotos de escena, producto y proceso.
- **Dependencia nueva:** `react-helmet-async` para metadatos por ruta, aprobada en F2 y justificada en `docs/11-CAMBIOS.md`.
- **Configuración:** `VITE_WHATSAPP`, `VITE_SITE_URL`, `VITE_INSTAGRAM` y `VITE_EMAIL` en `.env.local` y Netlify; el cambio se registra en `docs/11-CAMBIOS.md`.

---

## 10. Criterios de aceptación

- **AC01** La Home renderiza el hero destacado, la frase de marca, 4 productos destacados, la intro, las categorías, las novedades, la sección de proceso, los servicios, la CTA de WhatsApp y el footer.
- **AC02** El hero avanza automáticamente cada 8 segundos, permite navegar con flechas, pausa al interactuar, se reanuda a los 5 s sin interacción, ofrece un botón de pausa/play y respeta movimiento reducido.
- **AC03** La barra del hero se llena de forma continua durante 6 segundos y muestra dos segmentos cortos en los últimos 2 segundos; se detiene con la pausa y se oculta con movimiento reducido.
- **AC04** El hero chico rota las fotos de proceso automáticamente hacia la izquierda cada 4 segundos, pausa al interactuar, se reanuda a los 5 s, ofrece botón de pausa/play y respeta movimiento reducido.
- **AC05** La navbar muestra Inicio, Catálogo, Nosotros, Servicios y Contacto; en móvil usa menú hamburguesa accesible con manejo de foco.
- **AC06** Las anclas del Home llevan a la sección correcta sin que el navbar tape el título.
- **AC07** `/catalogo` muestra los productos disponibles con imagen, nombre, descripción breve, categoría y precio o “Precio a confirmar”.
- **AC08** Los filtros por categoría funcionan, se reflejan en la URL, se combinan con la búsqueda y ocultan los productos de categorías inactivas.
- **AC09** La búsqueda filtra por nombre, descripción, código y categoría, sin distinguir mayúsculas ni acentos, con debounce de 300 ms, y se refleja en la URL con `replace`.
- **AC10** El estado vacío aparece cuando no hay resultados y permite volver a todo el catálogo; cuando no hay productos publicados, muestra un mensaje distinto sin ese botón.
- **AC11** Los skeletons se muestran durante la carga y el error del servicio ofrece reintentar.
- **AC12** El detalle muestra galería, nombre, categoría, descripción, características y precio o “Precio a confirmar”.
- **AC13** Las opciones de personalización muestran su adicional, permiten una sola selección por tipo con “Sin preferencia” por defecto y actualizan el precio estimado; si la base es nula, se muestra “Precio a confirmar”.
- **AC14** El campo de notas (máximo 500 caracteres, texto plano) y la CTA “Consultar por WhatsApp” generan un mensaje codificado con producto, opciones o “Sin preferencia” y notas.
- **AC15** “Agregar al encargo” se muestra deshabilitado con el aviso de próxima etapa.
- **AC16** Un slug inexistente, un producto no disponible o una categoría inactiva muestra la página 404.
- **AC17** Ningún producto sin precio muestra `$0`.
- **AC18** La interfaz usa solo tokens de marca y no contiene colores hex en componentes.
- **AC19** La navegación por teclado, el foco visible, los `alt`, el `aria-live` solo manual del carrusel, los `aria` de filtros y el manejo de foco del menú móvil funcionan.
- **AC20** La interfaz es usable desde 360 px, con grilla 1/2/3–4 y menú móvil.
- **AC21** Los títulos, descripciones y Open Graph de Home, Catálogo y Detalle se aplican por ruta, con imagen provisional del isotipo.
- **AC22** Los datos mock respetan la forma de `docs/05-DATOS.md`, incluyen `caracteristicas`, y el servicio es reemplazable por Supabase.
- **AC23** No existe código de carrito, Supabase, admin ni pagos en F2.
- **AC24** `npm test`, `npm run lint` y `npm run build` pasan sin errores.

---

## 11. Matriz de trazabilidad

| Requisito | Criterios de aceptación |
| :--- | :--- |
| RF01 — Catálogo público | AC07, AC10, AC11, AC17, AC22 |
| RF02 — Filtrado por categoría | AC08, AC10 |
| RF03 — Búsqueda | AC09, AC10 |
| RF04 — Detalle y personalización | AC12, AC13, AC14, AC15, AC16 |
| RP01 — Home | AC01, AC02, AC03, AC04 |
| RP02 — Navegación y layout | AC05, AC06 |
| RP03 — Datos mock y servicios | AC22 |
| RP04 — SEO | AC21 |
| RP05 — Accesibilidad | AC19 |
| RP06 — Responsive | AC20 |
| RNF03 — Identidad visual | AC18 |
| RNF06 — Calidad | AC24 |
| RNF09 — Modelo de encargos | AC23 |

---

## 12. Decisiones de clarificación resueltas

Todas las preguntas abiertas quedaron resueltas el 2026-10-30. El detalle completo está en `specs/001-catalogo/clarificacion.md`.

- **Nombre de la grilla del Home:** “Novedades”.
- **Alturas de los heroes:** 80/70vh para el grande y 55/45vh para el chico; ajustar en el navegador.
- **Campo `caracteristicas`:** `text[]` en F4; el mock de F2 usa `string[]`.
- **Contenido real:** nombres, descripciones, precios y fotos definitivas llegan en F5.
- **`react-helmet-async`:** se instala en F2; justificado en `docs/11-CAMBIOS.md`.
- **`VITE_WHATSAPP`:** se carga en `.env.local` y Netlify, nunca en componentes.
- **Intervalo del hero chico:** 4 segundos.
- **Paginación:** fuera de F2; se evaluará cuando el catálogo supere los 12 productos.
- **Migas de pan:** no se incluyen en F2.
- **“Agregar al encargo”:** visible y deshabilitado con aviso de próxima etapa hasta F3.
