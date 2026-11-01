# Clarificación — Spec 001: Home + Catálogo

- **Fecha:** 2026-10-30
- **Spec revisada:** `specs/001-catalogo/spec.md`
- **Estado:** Aprobada — todas las decisiones resueltas.
- **Aprobación:** el estudiante aprobó C01–C19 el 2026-10-30.
- **Regla:** no se avanza a la implementación sin aprobar el plan y las tareas.

---

## 1. Decisiones ya tomadas en la conversación

Estas decisiones ya están reflejadas en la spec y no requieren nueva confirmación:

| Tema | Decisión |
| :--- | :--- |
| Hero grande | Foto de escena full-bleed, texto superpuesto, 4 destacados. |
| Frase de marca | “Papelería creativa / hecha con amor”, dos renglones, arriba a la derecha. |
| Navegación del hero | Automática cada 8 s + flechas, pausa al interactuar. |
| Barra de progreso | Continua 6 s + dos segmentos cortos en los últimos 2 s. |
| Hero chico | Fotos de proceso full-bleed, rotación automática hacia la izquierda cada 4 s. |
| Datos | Mock en F2; Supabase y SQL en F4. |
| Detalle | “Agregar al encargo” deshabilitado + “Consultar por WhatsApp”. |
| Navbar | Anclas para Nosotros, Servicios y Contacto. |
| Contador de encargos | Oculto hasta F3. |

---

## 2. Hallazgos resueltos

### Severidad alta

| ID | Hallazgo | Decisión | Impacto | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **C01** | Los dos heroes avanzan solos y no tienen un control visible de pausa. WCAG 2.2.2 exige un mecanismo para pausar, detener u ocultar contenido que se mueve automáticamente. | Pausa al interactuar (hover, foco, clic, touch o teclado) y reanudación automática a los **5 s** sin interacción. Se agrega un botón visible de pausa/play en ambos heroes para cumplir WCAG 2.2.2. | RP01.4, RP01.6, RP01.12, RP01.13, RP05.6, AC02, AC04, AC19 | Resuelto y aprobado |

### Severidad media

| ID | Hallazgo | Decisión | Impacto | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **C02** | El detalle debe mostrar “características”, pero `docs/05-DATOS.md` no tiene un campo para eso. | Agregar `caracteristicas text[] NOT NULL DEFAULT '{}'` a `productos` en F4. El mock de F2 usa `caracteristicas: string[]`. Se actualizan `docs/05-DATOS.md` y la spec. | RF04.1, RP03.2, `docs/05-DATOS.md`, F4 | Resuelto y aprobado |
| **C03** | La spec exige `react-helmet-async`, pero no está instalado. | Instalar `react-helmet-async` (ya listado en `docs/03-TECNOLOGIAS.md` y `docs/09-SEO.md`). La justificación queda en `docs/11-CAMBIOS.md`. | RP04.2, `package.json`, `package-lock.json` | Resuelto y aprobado |
| **C04** | No estaba definido si las opciones de un mismo tipo son de selección única o múltiple. | Una sola selección por tipo (radio). La UI muestra “Sin preferencia” por defecto; no se guarda como opción en la base. El precio estimado suma el `precio_extra` de cada tipo elegido. F3 guarda una opción por tipo. | RF04.2, RF04.3, F3 | Resuelto y aprobado |
| **C05** | Una categoría inactiva no se muestra en filtros, pero no estaba claro qué pasa con sus productos disponibles. | Si una categoría está inactiva, sus productos no se muestran en el catálogo ni en “Todas”, y el detalle directo devuelve 404. | RF01, RF02, RP03 | Resuelto y aprobado |
| **C06** | El campo de notas no tenía límite ni regla de sanitización. | Es el campo de **notas del cliente** en el detalle, no la descripción del producto. Máximo 500 caracteres, texto plano, `trim`, sin HTML, codificado con `encodeURIComponent`. La descripción del producto no lleva ese límite; se define en F4 (por ejemplo, 2000). | RF04.4, RF04.5, seguridad | Resuelto y aprobado |
| **C07** | La búsqueda se refleja en la URL, pero no se definió el ritmo de actualización. | Es el **buscador del catálogo** (nombre, código, descripción y categoría). Filtra en tiempo real con debounce de 300 ms y actualiza `?buscar=` con `replace` para no llenar el historial. | RF03.2, RF03.4, UX | Resuelto y aprobado |
| **C08** | La región `aria-live` del carrusel podía anunciar cada cambio automático. | `aria-live="polite"` solo para cambios manuales; el autoavance no anuncia. Los slides inactivos llevan `aria-hidden="true"`. | RP05.4, AC19 | Resuelto y aprobado |
| **C09** | El menú móvil no tenía definido el manejo del foco. | Es el **menú hamburguesa en móvil**. Usa `aria-expanded` y `aria-controls`; al abrir, foco al primer enlace; cierra con Escape y al cambiar de ruta; devuelve el foco al botón; el foco queda atrapado mientras está abierto. | RP02.4, RP05.2 | Resuelto y aprobado |

### Severidad baja

| ID | Hallazgo | Decisión | Impacto | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **C10** | Nombre de la grilla del Home. | Mantener “Novedades”. | RP01.11 | Aprobado |
| **C11** | Alturas de los heroes. | 80/70vh para el grande y 55/45vh para el chico; ajustar en el navegador. | RP06.5 | Aprobado |
| **C12** | Intervalo del hero chico. | 4 segundos. | RP01.12 | Aprobado |
| **C13** | Imagen de Open Graph. | Usar el isotipo del logo como imagen provisional hasta F5. | RP04.4 | Aprobado |
| **C14** | Formato de precio. | Pesos argentinos sin decimales con `Intl.NumberFormat`. | RF01.1 | Aprobado |
| **C15** | Estado vacío del catálogo sin productos publicados. | Mensaje distinto y sin botón “Ver todo” cuando no hay productos publicados. | RF01.6 | Aprobado |
| **C16** | Selección de productos del hero y de Novedades. | Hero: 4 destacados por `orden`; Novedades: los siguientes 4 por `orden`. | RP01.2, RP01.11 | Aprobado |
| **C17** | Botón “Agregar al encargo” deshabilitado. | Mantenerlo visible con el aviso “Disponible en la próxima etapa” hasta F3. | RF04.6 | Aprobado |
| **C18** | Variables de entorno. | Agregar `VITE_WHATSAPP`, `VITE_SITE_URL`, `VITE_INSTAGRAM` y `VITE_EMAIL` a `.env.example`; cargar valores en `.env.local` y Netlify. | RP03.6, configuración | Aprobado |
| **C19** | Migas de pan en el detalle. | Omitirlas en F2. | RF04.9 | Aprobado |

---

## 3. Riesgos detectados

1. **Contenido provisional:** los datos mock no deben confundirse con contenido real. Deben quedar marcados y reemplazarse antes de la entrega.
2. **Modelo de datos:** resuelto con `caracteristicas text[]` en F4; reflejado en `docs/05-DATOS.md`.
3. **Accesibilidad del movimiento:** mitigado con pausa por interacción, reanudación a los 5 s y botón visible de pausa/play.
4. **Contraste sobre fotos:** el degradado debe verificarse con las fotos reales de F5; con placeholders puede verse bien y fallar después.
5. **Configuración de WhatsApp:** si `VITE_WHATSAPP` falta en Netlify, la CTA principal se oculta o se deshabilita.

---

## 4. Criterio para avanzar a la implementación

- Todas las decisiones C01–C19 están aprobadas.
- La spec y `docs/05-DATOS.md` quedaron actualizados.
- El plan y las tareas deben aprobarse antes de escribir código.

---

## 5. Próximo paso

Ejecutar `/plan` para generar `specs/001-catalogo/plan.md` y `specs/001-catalogo/tasks.md`. Luego pedir aprobación antes de implementar.
