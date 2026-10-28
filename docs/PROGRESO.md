# Progreso del Proyecto: Pedacito de Arte

**Última actualización:** 2026-10-28  
**Fase actual:** F0 completada, pendiente de aprobación  
**Repositorio:** https://github.com/Facundo-tspz/iest-tfi_pedacito-de-arte  
**Estado del repositorio:** inicializado localmente, remoto configurado, sin commit ni push todavía.

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

## 3. Verificaciones realizadas

- `opencode.json` validado como JSON.
- Repositorio remoto comprobado: público y vacío.
- Búsqueda de contradicciones: no quedan referencias a Neon, Vercel como stack, `DATABASE_URL` ni `lib/db.js`, salvo la justificación del cambio en `03-TECNOLOGIAS.md`.
- No se creó `package.json`.
- No se ejecutó `npm install`.
- No se creó código de aplicación.
- No se tocó Supabase ni Netlify.
- No se hizo commit ni push.

---

## 4. Pendiente inmediato

1. Revisar los archivos de F0.
2. Aprobar el mensaje de commit propuesto.
3. Ejecutar el commit de F0.
4. Aprobar el push a `main`.
5. Iniciar F1 — Base técnica.

---

## 5. Próxima fase: F1

Alcance:

- Crear `package.json` y fijar versiones.
- Instalar React, Vite, React Router, Tailwind, DaisyUI y dependencias aprobadas.
- Configurar tokens de marca, fuentes, logo y favicon.
- Crear layout, router, 404, Vitest, ESLint y Prettier.
- Crear `netlify.toml` y `.env.example`.
- Verificar `npm test`, `npm run lint` y `npm run build`.

F1 no comienza hasta recibir **“aprobado F0”** y resolver el commit.

---

## 6. Datos pendientes para fases futuras

- Precios reales por producto.
- Fotos y descripciones reales.
- Contraseña inicial del admin: se define localmente, no en el chat.
- Proyecto Supabase y sitio Netlify.
- Herramientas de IA disponibles para F5.
- Enlaces de YouTube del video promocional y demo.

---

## 7. Orden de lectura para retomar en otro chat

1. `AGENTS.md`
2. `docs/CONSTITUCION.md`
3. `docs/REGLAS-IA.md`
4. `docs/ROADMAP.md`
5. `docs/PROGRESO.md` (este archivo)
6. `memory.md`
7. La spec activa en `specs/`

---

## 8. Historial

| Fecha | Fase | Cambio |
| :--- | :--- | :--- |
| 2026-10-28 | F0 | Constitución, roadmap, reglas, comandos, skills y documentación base. |
