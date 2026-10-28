# 03 - Elecciones Tecnológicas: Pedacito de Arte

Este documento define el stack oficial y justifica los cambios respecto de la base trabajada en clase.

---

## 1. Stack oficial

### Frontend

| Tecnología | Versión prevista | Función |
| :--- | :--- | :--- |
| React | 18+ | Interfaz por componentes. |
| Vite | 5+ | Bundler y servidor de desarrollo. |
| React Router | 6+ | Navegación SPA. |
| JavaScript / JSX | ES6+ | Lenguaje del proyecto. |
| Tailwind CSS | 3.4 | Estilos utility-first y tokens de marca. |
| DaisyUI | 4+ | Componentes accesibles sobre Tailwind. |

### Datos, backend y despliegue

| Componente | Tecnología | Función |
| :--- | :--- | :--- |
| Base de datos | Supabase Postgres | Catálogo, contenido, usuarios admin y medios. |
| Almacenamiento | Supabase Storage | Imágenes WebP y miniaturas. |
| Backend administrativo | Netlify Functions | Login, sesión, CRUD admin y URLs firmadas. |
| Hosting | Netlify | Deploy continuo, HTTPS y redirects SPA. |
| Control de versiones | Git + GitHub | Historial y repositorio público. |
| Conversión | WhatsApp URL (`wa.me`) | Derivación del encargo al taller. |

### Librerías de apoyo

| Librería | Uso |
| :--- | :--- |
| `@supabase/supabase-js` | Lectura pública y cliente administrativo en Functions. |
| `jose` | Firma y verificación de sesiones JWT. |
| `zod` | Validación de payloads en el servidor. |
| `react-hook-form` | Formularios públicos y administrativos. |
| `react-easy-crop` | Recorte de imágenes en el panel. |
| `browser-image-compression` | Compresión previa y apoyo a la conversión WebP. |
| `lucide-react` | Íconos SVG. |
| `sonner` | Notificaciones toast. |
| `framer-motion` | Transiciones suaves. |
| `react-helmet-async` | Metadatos por ruta. |
| `qrcode.react` | QR para ferias. |
| `vitest` + Testing Library | Tests automatizados. |
| ESLint + Prettier | Calidad y formato. |

> Las versiones exactas se fijan en F1, antes de instalar dependencias.

---

## 2. Justificación del cambio de stack

La base sugerida en clase es React con Next.js, PostgreSQL y Vercel. Para este TFI se adopta **React + Vite + Supabase + Netlify** por estas razones:

1. **Vite** reduce la complejidad del proyecto y acelera el desarrollo de una SPA de catálogo, sin necesidad de renderizado del servidor.
2. **Supabase** ofrece PostgreSQL administrado, Storage y RLS, lo que evita construir un backend propio y mantiene el modelo relacional.
3. **Netlify Functions** permite concentrar las escrituras administrativas y la `service_role` fuera del navegador, con deploy continuo desde GitHub.
4. **Netlify** cumple con hosting estático, HTTPS, redirects SPA y variables de entorno sin costo inicial.
5. El cambio se documenta también en el informe y en la defensa oral, junto con sus tradeoffs.

### Tradeoffs asumidos

- Un SPA tiene SEO más limitado que Next.js. Se mitiga con metadatos por ruta, slugs, sitemap y Open Graph.
- Supabase y Netlify agregan dependencia de servicios gestionados. Se documentan límites y respaldos.
- La autenticación propia exige más cuidado que Supabase Auth. Se compensa con `scrypt`, JWT, `session_version`, rate limiting y RBAC en servidor.

---

## 3. Tecnologías no permitidas

- Angular, Vue.js o Svelte.
- Firebase o MongoDB como base principal.
- Bootstrap o Material UI.
- Pasarelas de pago o checkout.
- Supabase Auth para el panel.
- Cualquier dependencia no aprobada en la fase correspondiente.

---

## 4. Arquitectura de conexión

```text
[ NAVEGADOR PÚBLICO ]
  ├── React + Vite + React Router
  ├── Tailwind + DaisyUI con tokens de marca
  └── @supabase/supabase-js (anon key + RLS de lectura)
                    │
                    ▼
             [ SUPABASE POSTGRES / STORAGE ]

[ PANEL ADMIN ]
  ├── React + Vite
  ├── Login propio → cookie HttpOnly
  └── /api/admin/* → Netlify Functions
                          ├── service_role
                          ├── validación zod
                          └── Supabase Postgres / Storage
                    │
                    ▼
             [ WHATSAPP DEL TALLER ]
```

---

## 5. Variables de entorno

Públicas:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SITE_URL`

Privadas, solo en Netlify Functions:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_SESSION_SECRET`

Nunca se suben al repositorio ni se escriben en el chat.
