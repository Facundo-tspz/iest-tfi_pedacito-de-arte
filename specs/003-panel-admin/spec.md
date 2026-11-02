# Spec 003 — Panel admin + CMS

- **Fase:** F4
- **Estado:** En curso — Bloque B implementado; Bloque C pendiente
- **Depende de:** F3 aprobada y base Supabase creada
- **MVP:** login propio, dashboard, medios y productos
- **Futuro:** CMS de secciones, usuarios y configuración

---

## 1. Objetivo

Administrar el catálogo real desde un panel privado con login propio, sin Supabase Auth, usando Supabase Postgres/Storage y Netlify Functions.

---

## 2. Alcance MVP

### Incluye

- Ruta `/estudio`.
- Login con usuario y contraseña.
- Sesión con cookie HttpOnly y `session_version`.
- Un admin inicial `Facundo`.
- Dashboard básico.
- Medios: subir, recortar, WebP, alt, reutilizar y reemplazar.
- Productos: crear, editar, publicar/despublicar, precio, categoría fija, imágenes, características y SEO.
- Opciones simples de personalización.
- Catálogo público leyendo desde Supabase.

### Fuera del MVP

- CMS de Hero, Nosotros, Servicios, Contacto y Footer.
- Gestión de usuarios desde el panel.
- Configuración del sitio desde el panel.
- CRUD de categorías.
- Gráficos y analíticas.

---

## 3. Requisitos

- **RF09** Login propio con usuario y contraseña, sin Supabase Auth.
- **RF10** Gestión mínima de productos y opciones.
- **RF11** Biblioteca de medios mínima con recorte y WebP.
- **RF12** CMS de secciones: futuro, no MVP.
- **RF13** Gestión de usuarios: futuro, no MVP.

---

## 4. Criterios de aceptación MVP

- **AC01** `/estudio/login` permite iniciar sesión con el admin creado.
- **AC02** Las rutas `/estudio` están protegidas.
- **AC03** El dashboard muestra un resumen básico.
- **AC04** El catálogo público lee datos de Supabase en producción.
- **AC05** El admin puede subir y editar imágenes.
- **AC06** El admin puede crear y editar productos.
- **AC07** Los cambios se reflejan en el catálogo público.
- **AC08** Sin CMS, usuarios ni configuración en el MVP.
- **AC09** Tests, lint y build pasan.

---

## 5. Seguridad mínima

- `service_role` solo en Netlify Functions.
- `anon`/publishable solo para lectura pública.
- Cookie HttpOnly, SameSite=Strict y Secure en producción.
- Contraseñas `scrypt`.
- Validación de sesión y `session_version` en cada petición.
- RLS activa en Supabase.
