# 04 - Arquitectura del Proyecto: Pedacito de Arte

Este documento define la estructura de carpetas, las capas y las responsabilidades de cada módulo.

---

## 1. Árbol del repositorio

```text
iest-tfi_pedacito-de-arte/
├── AGENTS.md
├── CLAUDE.md
├── memory.md
├── README.md
├── opencode.json
├── docs/
│   ├── CONSTITUCION.md
│   ├── ROADMAP.md
│   ├── REGLAS-IA.md
│   ├── PROGRESO.md
│   ├── PROMPTS.md
│   ├── DECLARACION-IA.md
│   ├── IDENTIDAD-MARCA.md
│   └── 01-CONTEXTO.md … 10-SEGURIDAD.md
├── specs/
│   ├── 001-catalogo/
│   ├── 002-carrito-whatsapp/
│   └── 003-panel-admin/
├── .agents/skills/
│   ├── verificar-criterios/
│   └── auditar-marca/
├── .opencode/commands/
│   ├── spec.md
│   ├── clarificar.md
│   ├── plan.md
│   ├── verificar.md
│   └── cambio.md
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── catalog/
│   │   ├── cart/
│   │   ├── admin/
│   │   └── ui/
│   ├── context/
│   ├── hooks/
│   ├── layout/
│   ├── lib/
│   │   └── supabase.js
│   ├── pages/
│   │   ├── admin/
│   │   └── públicas
│   ├── routes/
│   ├── services/
│   ├── styles/
│   └── utils/
├── tests/
├── public/
│   ├── marca/
│   └── media/
├── netlify/functions/
│   ├── _lib/
│   ├── admin-login.js
│   ├── admin-logout.js
│   ├── admin-session.js
│   ├── admin-api.js
│   └── admin-upload-url.js
├── db/
│   ├── esquema.sql
│   ├── policies.sql
│   └── seed.sql
├── multimedia/
│   ├── imagenes/
│   ├── video/
│   ├── graficos/
│   └── FICHAS-IA.md
├── .env.example
├── .gitignore
├── netlify.toml
├── package.json
└── vite.config.js
```

---

## 2. Capas

### Presentación pública
Páginas de Home, Catálogo, Detalle, Servicios, Contacto, Carrito y 404. Consume Supabase con la `anon key` y RLS de lectura.

### Presentación administrativa
Login, dashboard, productos, categorías, contenido, medios, usuarios y configuración. Nunca accede directamente a la `service_role`.

### Servicios de aplicación
`src/services/` encapsula consultas públicas, formateo de WhatsApp y llamadas al API admin. `src/lib/supabase.js` centraliza el cliente público.

### Backend administrativo
`netlify/functions/` valida sesión, rol y payload. Usa `SUPABASE_SERVICE_ROLE_KEY` solo del lado servidor.

### Datos
Supabase Postgres con RLS, Storage para imágenes y migraciones SQL versionadas en `db/`.

---

## 3. Flujo público

```text
Página React → service → Supabase (anon + RLS) → render
Carrito → localStorage → mensaje formateado → wa.me
```

El carrito no persiste en base de datos. Los precios se revalidan al abrir el carrito.

---

## 4. Flujo administrativo

```text
Login → Netlify Function → Supabase usuarios_admin → cookie HttpOnly
Petición admin → Function → valida sesión/rol/payload → service_role → Supabase
Imagen → Function genera URL firmada → upload directo a Storage → registro en media
```

---

## 5. Reglas de dependencia

- Las páginas no importan `service_role`.
- Los componentes no hacen consultas directas a Supabase; usan servicios.
- Las Functions no comparten estado en memoria para sesiones.
- Los tipos de contenido editable se validan con esquemas en el servidor.
- Ningún componente escribe colores hex; usa tokens.

---

## 6. Configuración de Netlify

`netlify.toml` definirá:

- Build: `npm run build`.
- Publish: `dist`.
- Functions: `netlify/functions`.
- Redirect `/api/*` a Functions.
- Fallback SPA `/*` a `index.html`.
- Cabecera `X-Robots-Tag: noindex` para `/admin/*`.
