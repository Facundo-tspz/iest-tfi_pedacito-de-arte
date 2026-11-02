# Pedacito de Arte — TFI

Sitio web de catálogo y encargos de papelería artesanal. No es una tienda con pagos: los productos se muestran, se personalizan y el encargo se deriva al WhatsApp del taller.

## Estado

**Fase actual:** F2 — Home + Catálogo completada y aprobada.

El sitio ya incluye Home, catálogo, búsqueda, filtros, detalle de producto, personalización y SEO. El carrito y el panel administrativo corresponden a F3 y F4.

## Stack

- React 18 + Vite
- React Router
- Tailwind CSS 3 + DaisyUI 4
- Supabase Postgres + Storage
- Netlify + Netlify Functions
- WhatsApp mediante enlace `wa.me`

## Productos

- Agendas
- Agendas Docentes
- Anotadores
- Para colorear

## Enlaces

- Repositorio: https://github.com/Facundo-tspz/iest-tfi_pedacito-de-arte
- Sitio publicado: https://pedacito-de-arte.netlify.app
- Video promocional: pendiente
- Video demo: pendiente

## Documentación

La lectura obligatoria y el orden de trabajo están en `AGENTS.md` y `docs/REGLAS-IA.md`.

- `docs/CONSTITUCION.md`
- `docs/ROADMAP.md`
- `docs/REGLAS-IA.md`
- `docs/PROGRESO.md`
- `docs/PROMPTS.md`
- `docs/DECLARACION-IA.md`
- `docs/01-CONTEXTO.md` a `docs/10-SEGURIDAD.md`

## Ejecución

```bash
npm install
npm run dev
npm test
npm run lint
npm run build
```
