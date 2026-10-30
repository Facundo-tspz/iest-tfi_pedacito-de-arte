# Roadmap del Proyecto: Pedacito de Arte

## Checklist de fases

- [x] **F0** — Constitución, arnés y documentación
- [x] **F1** — Base técnica del proyecto
- [ ] **F2** — Spec 001: Home + Catálogo
- [ ] **F3** — Spec 002: Carrito de encargos + WhatsApp
- [ ] **F4** — Spec 003: Panel admin + CMS
- [ ] **F5** — Producción multimedia con IA
- [ ] **F6** — QA, deploy, informe y defensa

## Regla estricta e inamovible

1. Se trabaja **una sola fase a la vez**.
2. Está prohibido adelantar tareas, archivos o código de una fase futura.
3. Al terminar una fase, el agente se detiene, informa el resultado y espera la palabra **“aprobado”**.
4. No se hace commit sin proponer antes el mensaje y recibir aprobación.
5. No se hace push sin aprobación explícita.
6. Si aparece un requisito nuevo, se detiene la implementación, se actualiza la spec y se vuelve al punto correspondiente del ciclo SDD.
7. El estado oficial vive en `docs/PROGRESO.md`. Si hay contradicción entre el chat y ese archivo, manda el archivo actualizado y aprobado.

---

## Estado de fases

| Fase | Nombre | Estado |
| :--- | :--- | :--- |
| **F0** | Constitución, arnés y documentación | Completada y publicada (`76dee25`); esperando “aprobado F0” |
| **F1** | Base técnica del proyecto | Completada y publicada (`26ce078`); aprobada |
| **F2** | Spec 001: Home + Catálogo | Pendiente |
| **F3** | Spec 002: Carrito de encargos + WhatsApp | Pendiente |
| **F4** | Spec 003: Panel admin + CMS | Pendiente |
| **F5** | Producción multimedia con IA | Pendiente |
| **F6** | QA, deploy, informe y defensa | Pendiente |

---

## F0 — Constitución, arnés y documentación

**Objetivo:** dejar el repositorio preparado para trabajar con agentes de IA bajo reglas claras, sin código de aplicación ni dependencias instaladas.

**Entregables:**
- `docs/CONSTITUCION.md`
- `docs/ROADMAP.md`
- `docs/REGLAS-IA.md`
- `docs/PROGRESO.md`
- `docs/PROMPTS.md`
- `docs/DECLARACION-IA.md`
- `memory.md`, `CLAUDE.md`, `README.md`, `.gitignore`, `opencode.json`
- Comandos `/spec`, `/clarificar`, `/verificar`, `/cambio`
- Skills `verificar-criterios` y `auditar-marca`
- Documentación 01 a 10 corregida y alineada al stack definitivo
- Repositorio Git inicializado y remoto configurado

**Criterio de salida:** documentación sin contradicciones, comandos y skills legibles, configuración de opencode válida, Git inicializado, sin código de app, sin `npm install`, sin Supabase y sin Netlify. Requiere aprobación humana.

---

## F1 — Base técnica del proyecto

**Objetivo:** crear el esqueleto funcional de React + Vite + Tailwind + DaisyUI sin implementar todavía funcionalidades de negocio.

**Entregables:**
- `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`
- Tokens de marca, fuentes, logo y favicon en `public/marca/`
- Estructura `src/`, `tests/`, `public/`, `netlify/functions/`, `db/`
- Layout base, router, página 404 y configuración de Vitest
- `netlify.toml` con redirects SPA y Functions
- `.env.example`

**Criterio de salida:** `npm install` aprobado, `npm run build`, `npm run lint` y `npm test` iniciales funcionando. Requiere aprobación humana.

---

## F2 — Spec 001: Home + Catálogo

**Objetivo:** implementar la vidriera pública del emprendimiento.

**Alcance:** Home, catálogo, 4 líneas de producto, filtros, búsqueda, detalle, galería, características y opciones de personalización.

**Ciclo SDD obligatorio:**

| Subfase | Evidencia |
| :--- | :--- |
| 1. Spec | `specs/001-catalogo/spec.md` |
| 2. Clarificación | `specs/001-catalogo/clarificacion.md` |
| 3. Plan | `specs/001-catalogo/plan.md` |
| 4. Tareas | `specs/001-catalogo/tasks.md` |
| 5. Implementación | Código, tests y commits por tarea |
| 6. Validación | `specs/001-catalogo/verificacion.md` |
| 7. Cambio | Solo si aparece un requisito nuevo |

**Criterio de salida:** RF01 a RF04 validados, tests y build en verde. Requiere aprobación humana.

---

## F3 — Spec 002: Carrito de encargos + WhatsApp

**Objetivo:** permitir armar un encargo y derivarlo al WhatsApp del taller sin pagos ni cuentas de cliente.

**Alcance:** carrito de encargos, cantidades, opciones, notas de personalización, precio estimado, persistencia local y mensaje de WhatsApp.

**Ciclo SDD obligatorio:** mismo esquema de cinco archivos en `specs/002-carrito-whatsapp/`.

**Criterio de salida:** RF05 y RF06 validados; no existe checkout, pasarela de pago, stock ni historial de pedidos. Requiere aprobación humana.

---

## F4 — Spec 003: Panel admin + CMS

**Objetivo:** administrar el sitio, los productos y el contenido sin tocar Supabase Auth.

**Bloques secuenciales, uno por vez:**

| Bloque | Alcance | Aprobación |
| :--- | :--- | :--- |
| 4.1 | Login propio, sesión, roles `admin`/`editor` y usuarios | Obligatoria |
| 4.2 | Biblioteca de medios, recorte y WebP | Obligatoria |
| 4.3 | Productos, categorías, opciones y precios | Obligatoria |
| 4.4 | CMS de secciones y configuración del sitio | Obligatoria |

**Corte mínimo para el MVP del viernes:** hasta 4.3.  
**Cierre previo a la evaluación:** 4.4 completo.

**Criterio de salida:** RF09 a RF13 validados, RLS comprobada y permisos rechazados en servidor. Requiere aprobación humana.

---

## F5 — Producción multimedia con IA

**Objetivo:** crear e integrar las piezas visuales y audiovisuales del TFI.

**Entregables:**
- 8 imágenes fotorrealistas integradas al sitio
- Video promocional de 45 a 90 segundos
- Video demo de 2 a 3 minutos
- Infografía del ciclo SDD
- 3 gráficos estadísticos con datos reales del repositorio
- `multimedia/FICHAS-IA.md` completo
- Declaración de IA y revisión ética

**Criterio de salida:** piezas integradas, fichas completas, licencias verificadas y etiquetas de transparencia. Requiere aprobación humana.

---

## F6 — QA, deploy, informe y defensa

**Objetivo:** publicar y defender el producto.

**Entregables:**
- Sitio en Netlify con URL pública
- Repositorio público con historial de commits
- Lighthouse ≥80 en las cuatro categorías
- Tests y build en verde
- Informe PDF con estructura solicitada
- Guion de defensa, guion de demo y plan B
- `ENLACES.md` en la Bitácora Digital

**Criterio de salida:** producto publicado, informe entregado y defensa ensayada. Requiere aprobación humana.

---

## Regla de commit

Antes de cada commit el agente debe proponer:

1. Los archivos que se van a incluir.
2. El mensaje con formato Conventional Commits.
3. El alcance de la fase o tarea.

El commit se ejecuta únicamente después de la aprobación. El push también requiere aprobación explícita.
