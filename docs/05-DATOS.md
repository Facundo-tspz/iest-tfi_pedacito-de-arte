# 05 - Modelo de Datos: Pedacito de Arte

Base de datos relacional en **Supabase Postgres**. Las escrituras públicas están prohibidas: el catálogo se lee con `anon` y el panel escribe mediante Netlify Functions con `service_role`.

> Requiere la extensión `citext` para los nombres de usuario. `gen_random_uuid()` está disponible en Supabase Postgres.

---

## 1. Tablas

### `categorias`

| Campo | Tipo | Restricción |
| :--- | :--- | :--- |
| `id` | `uuid` | PK, `gen_random_uuid()` |
| `nombre` | `text` | NOT NULL |
| `slug` | `text` | NOT NULL, UNIQUE |
| `descripcion` | `text` | NULL |
| `orden` | `integer` | NOT NULL, DEFAULT 0 |
| `activo` | `boolean` | NOT NULL, DEFAULT true |
| `created_at` | `timestamptz` | DEFAULT `now()` |
| `updated_at` | `timestamptz` | DEFAULT `now()` |

Categorías iniciales: Agendas, Agendas Docentes, Anotadores, Revistas para Colorear.

### `productos`

| Campo | Tipo | Restricción |
| :--- | :--- | :--- |
| `id` | `uuid` | PK |
| `codigo` | `text` | UNIQUE |
| `nombre` | `text` | NOT NULL |
| `slug` | `text` | NOT NULL, UNIQUE |
| `categoria_id` | `uuid` | FK `categorias(id)` |
| `descripcion` | `text` | NOT NULL |
| `precio_base` | `numeric(12,2)` | NULL, CHECK ≥ 0 |
| `destacado` | `boolean` | DEFAULT false |
| `disponible` | `boolean` | DEFAULT true |
| `meta_titulo` | `text` | NULL |
| `meta_descripcion` | `text` | NULL |
| `orden` | `integer` | DEFAULT 0 |
| `created_at` | `timestamptz` | DEFAULT `now()` |
| `updated_at` | `timestamptz` | DEFAULT `now()` |
| `creado_por` | `uuid` | FK `usuarios_admin(id)` |
| `actualizado_por` | `uuid` | FK `usuarios_admin(id)` |

`precio_base` puede ser `NULL` mientras el precio no esté cargado. La UI muestra “Precio a confirmar”.

### `producto_imagenes`

| Campo | Tipo | Restricción |
| :--- | :--- | :--- |
| `id` | `uuid` | PK |
| `producto_id` | `uuid` | FK `productos(id)` ON DELETE CASCADE |
| `url` | `text` | NOT NULL |
| `path` | `text` | NOT NULL |
| `alt` | `text` | NOT NULL |
| `orden` | `integer` | DEFAULT 0 |
| `created_at` | `timestamptz` | DEFAULT `now()` |

### `opciones_personalizacion`

| Campo | Tipo | Restricción |
| :--- | :--- | :--- |
| `id` | `uuid` | PK |
| `producto_id` | `uuid` | FK `productos(id)` ON DELETE CASCADE |
| `tipo_opcion` | `text` | NOT NULL |
| `valor` | `text` | NOT NULL |
| `precio_extra` | `numeric(12,2)` | DEFAULT 0, CHECK ≥ 0 |
| `orden` | `integer` | DEFAULT 0 |
| `activo` | `boolean` | DEFAULT true |

Ejemplos de `tipo_opcion`: Interior, Tamaño, Laminado, Encuadernación.

### `secciones_sitio`

| Campo | Tipo | Restricción |
| :--- | :--- | :--- |
| `id` | `uuid` | PK |
| `clave` | `text` | NOT NULL, UNIQUE |
| `nombre` | `text` | NOT NULL |
| `contenido` | `jsonb` | NOT NULL |
| `activo` | `boolean` | DEFAULT true |
| `updated_at` | `timestamptz` | DEFAULT `now()` |
| `updated_by` | `uuid` | FK `usuarios_admin(id)` |

Claves iniciales: `home_hero`, `home_valores`, `sobre_nosotros`, `servicios`, `contacto`, `footer`.

### `configuracion_sitio`

| Campo | Tipo | Restricción |
| :--- | :--- | :--- |
| `clave` | `text` | PK |
| `valor` | `jsonb` | NOT NULL |
| `publico` | `boolean` | DEFAULT true |
| `updated_at` | `timestamptz` | DEFAULT `now()` |
| `updated_by` | `uuid` | FK `usuarios_admin(id)` |

Ejemplos: `whatsapp`, `email`, `instagram`, `direccion`, `horarios`, `texto_legal`.

### `usuarios_admin`

| Campo | Tipo | Restricción |
| :--- | :--- | :--- |
| `id` | `uuid` | PK |
| `usuario` | `citext` | NOT NULL, UNIQUE |
| `nombre` | `text` | NOT NULL |
| `password_hash` | `text` | NOT NULL |
| `rol` | `text` | CHECK `admin` o `editor` |
| `activo` | `boolean` | DEFAULT true |
| `session_version` | `integer` | DEFAULT 1 |
| `ultimo_acceso` | `timestamptz` | NULL |
| `created_at` | `timestamptz` | DEFAULT `now()` |
| `updated_at` | `timestamptz` | DEFAULT `now()` |
| `creado_por` | `uuid` | FK `usuarios_admin(id)` |

### `login_intentos`

| Campo | Tipo | Restricción |
| :--- | :--- | :--- |
| `id` | `bigserial` | PK |
| `usuario` | `citext` | NOT NULL |
| `ip` | `inet` | NULL |
| `exito` | `boolean` | NOT NULL |
| `created_at` | `timestamptz` | DEFAULT `now()` |

Se usa para limitar intentos fallidos. No guarda contraseñas.

### `media`

| Campo | Tipo | Restricción |
| :--- | :--- | :--- |
| `id` | `uuid` | PK |
| `path` | `text` | NOT NULL, UNIQUE |
| `url` | `text` | NOT NULL |
| `alt` | `text` | NOT NULL |
| `mime` | `text` | NOT NULL |
| `width` | `integer` | NULL |
| `height` | `integer` | NULL |
| `size_bytes` | `integer` | NULL |
| `subido_por` | `uuid` | FK `usuarios_admin(id)` |
| `created_at` | `timestamptz` | DEFAULT `now()` |

---

## 2. RLS y permisos

- RLS activa en todas las tablas.
- `anon` puede leer `categorias`, `productos`, `producto_imagenes`, `opciones_personalizacion` y `secciones_sitio` solo cuando estén activos/disponibles.
- `anon` puede leer `configuracion_sitio` solo con `publico = true`.
- `usuarios_admin`, `login_intentos` y `media` no tienen políticas para `anon`.
- `service_role` omite RLS y se usa solo en Functions.
- No se crean políticas de escritura para `anon`.

Ejemplo de política:

```sql
create policy "Lectura pública de productos disponibles"
on productos for select
to anon
using (disponible = true);
```

---

## 3. Storage

Bucket: `media`

- Lectura pública para imágenes.
- Escritura solo mediante URL firmada generada por una Function.
- Formatos: JPG, PNG y WebP.
- Salida final: WebP optimizado + miniatura.
- Estructura:

```text
media/{año}/{uuid}-{slug}.webp
media/{año}/{uuid}-{slug}-thumb.webp
```

---

## 4. Lo que no se persiste en Fase 1

- Encargos o pedidos.
- Datos personales de clientes.
- Stock.
- Pagos.
- Historial de compras.

El carrito vive en `localStorage` y el encargo se envía por WhatsApp.

---

## 5. Archivos SQL previstos

- `db/esquema.sql`: tablas, índices y constraints.
- `db/policies.sql`: RLS y políticas.
- `db/seed.sql`: categorías y contenido inicial aprobado.

No se ejecuta ninguna migración sin aprobación.
