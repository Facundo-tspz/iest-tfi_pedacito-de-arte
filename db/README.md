# Base de datos — Supabase

## 1. Crear el proyecto

1. Crear un proyecto nuevo en Supabase.
2. Guardar:
   - `Project URL` → `SUPABASE_URL` y `VITE_SUPABASE_URL`.
   - `anon public key` → `VITE_SUPABASE_ANON_KEY`.
   - `service_role key` → `SUPABASE_SERVICE_ROLE_KEY`. No debe ir al frontend ni al repositorio.
3. Definir `ADMIN_SESSION_SECRET` con una cadena larga y aleatoria.

## 2. Ejecutar migraciones

Abrir **SQL Editor** en Supabase y ejecutar, en este orden:

1. `db/001_esquema.sql`
2. `db/002_policies.sql`
3. `db/003_storage.sql`
4. `db/004_seed.sql`
5. `db/005_hero_imagen.sql`

Cada archivo debe ejecutarse completo. No ejecutar en otro orden.

## 3. Crear el admin inicial

Definir las variables en la terminal local, sin escribir la contraseña en el chat ni en el repositorio:

```bash
SUPABASE_URL=https://TU-PROYECTO.supabase.co
SUPABASE_SERVICE_ROLE_KEY=TU_SERVICE_ROLE
ADMIN_USUARIO=Facundo
ADMIN_NOMBRE=Facundo
ADMIN_PASSWORD=TU_CONTRASEÑA_LOCAL
node scripts/crear-admin.mjs
```

El script guarda la contraseña con `scrypt` y no la imprime.

## 4. Variables en Netlify

Cargar en el sitio de Netlify:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
ADMIN_SESSION_SECRET
```

Las variables `VITE_*` son públicas. `SUPABASE_SERVICE_ROLE_KEY` y `ADMIN_SESSION_SECRET` quedan solo en Functions.

## 5. Verificación de RLS

Con la `anon key`, comprobar que no se puede escribir:

- Insertar en `productos`.
- Actualizar `categorias`.
- Borrar una fila de `opciones_personalizacion`.

Las tres operaciones deben fallar por RLS.

## 6. Comprobaciones posteriores

- `anon` puede leer categorías activas, productos disponibles, imágenes, opciones activas y secciones públicas.
- `usuarios_admin`, `login_intentos` y `media` no son visibles con `anon`.
- El bucket `media` es de lectura pública y escritura solo con URL firmada.
- El admin puede iniciar sesión con el usuario creado por el script.
