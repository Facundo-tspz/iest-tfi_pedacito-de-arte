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

Categorías iniciales: Agendas, Agendas Docentes, Anotadores, Para colorear.

### `productos`

| Campo | Tipo | Restricción |
| :--- | :--- | :--- |
| `id` | `uuid` | PK |
| `codigo` | `text` | UNIQUE |
| `nombre` | `text` | NOT NULL |
| `slug` | `text` | NOT NULL, UNIQUE |
| `categoria_id` | `uuid` | FK `categorias(id)` |
| `descripcion` | `text` | NOT NULL |
| `caracteristicas` | `text[]` | NOT NULL, DEFAULT '{}' |
| `precio_base` | `numeric(12,2)` | NULL, CHECK ≥ 0; precio minorista |
| `precio_mayorista` | `numeric(12,2)` | NULL, CHECK ≥ 0 |
| `cantidad_minima_mayorista` | `integer` | NOT NULL, DEFAULT 10, CHECK > 0 |
| `precio_desde` | `boolean` | NOT NULL, DEFAULT false |
| `destacado` | `boolean` | DEFAULT false |
| `disponible` | `boolean` | DEFAULT true |
| `meta_titulo` | `text` | NULL |
| `meta_descripcion` | `text` | NULL |
| `orden` | `integer` | DEFAULT 0 |
| `created_at` | `timestamptz` | DEFAULT `now()` |
| `updated_at` | `timestamptz` | DEFAULT `now()` |
| `creado_por` | `uuid` | FK `usuarios_admin(id)` |
| `actualizado_por` | `uuid` | FK `usuarios_admin(id)` |

`precio_base` es el precio minorista y puede ser `NULL` mientras no esté cargado. La UI muestra “Precio a confirmar” cuando falta.

`precio_mayorista` se guarda para consulta interna. Si existe, la web puede mostrarlo; si no, muestra “Consultar precio mayorista”. El mínimo mayorista por defecto es 10 unidades.

`precio_desde` permite mostrar “Desde $13.000” en productos cuyo precio final depende del contenido, como la Agenda Personalizada.

`caracteristicas` guarda una lista de características breves (máximo 8, hasta 80 caracteres cada una). El admin de F4 valida la cantidad y la longitud.

### Seed inicial del MVP

| Producto | Categoría | Minorista | Mayorista |
| :--- | :--- | ---: | ---: |
| Anotador A6 x 50 hojas | Anotadores | $3.500 | $2.200 |
| Libro de Recetas A5 x 40 hojas | Anotadores | $8.000 | $5.500 |
| Revista para Colorear | Para colorear | $2.000 | $1.200 |
| Agenda Docente A5 | Agendas Docentes | $12.000 base | NULL |
| Agenda Personalizada | Agendas | Desde $13.000 | NULL |
| Libro A5 para Colorear | Para colorear | $8.000 | NULL |

Las imágenes se cargan después desde el panel. El seed no incluye archivos de imagen.

### `producto_imagenes`

| Campo | Tipo | Restricción |
| :--- | :--- | :--- |
| `id` | `uuid` | PK |
| `producto_id` | `uuid` | FK `productos(id)` ON DELETE CASCADE |
| `url` | `text` | NOT NULL |
| `path` | `text` | NOT NULL |
| `alt` | `text` | NOT NULL |
| `orden` | `integer` | DEFAULT 0 |
| `es_hero` | `boolean` | NOT NULL, DEFAULT false; máximo una por producto |
| `created_at` | `timestamptz` | DEFAULT `now()` |

`es_hero` separa la imagen horizontal del hero de la imagen principal del catálogo. El hero usa la imagen marcada; las tarjetas y la galería excluyen las imágenes de hero. La biblioteca de medios permite recortar en 4:3 para catálogo y 16:9 para hero.

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
