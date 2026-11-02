create extension if not exists citext;
create extension if not exists pgcrypto;

create or replace function public.actualizar_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.usuarios_admin (
  id uuid primary key default gen_random_uuid(),
  usuario citext not null unique,
  nombre text not null,
  password_hash text not null,
  rol text not null check (rol in ('admin', 'editor')),
  activo boolean not null default true,
  session_version integer not null default 1,
  ultimo_acceso timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  creado_por uuid references public.usuarios_admin(id) on delete set null
);

create table if not exists public.login_intentos (
  id bigserial primary key,
  usuario citext not null,
  ip inet,
  exito boolean not null,
  created_at timestamptz not null default now()
);

create table if not exists public.categorias (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  slug text not null unique,
  descripcion text,
  orden integer not null default 0,
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.productos (
  id uuid primary key default gen_random_uuid(),
  codigo text not null unique,
  nombre text not null,
  slug text not null unique,
  categoria_id uuid not null references public.categorias(id) on delete restrict,
  descripcion text not null,
  caracteristicas text[] not null default '{}',
  precio_base numeric(12, 2) check (precio_base is null or precio_base >= 0),
  precio_mayorista numeric(12, 2) check (precio_mayorista is null or precio_mayorista >= 0),
  cantidad_minima_mayorista integer not null default 10 check (cantidad_minima_mayorista > 0),
  precio_desde boolean not null default false,
  destacado boolean not null default false,
  disponible boolean not null default true,
  meta_titulo text,
  meta_descripcion text,
  orden integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  creado_por uuid references public.usuarios_admin(id) on delete set null,
  actualizado_por uuid references public.usuarios_admin(id) on delete set null,
  check (cardinality(caracteristicas) <= 8)
);

create table if not exists public.producto_imagenes (
  id uuid primary key default gen_random_uuid(),
  producto_id uuid not null references public.productos(id) on delete cascade,
  url text not null,
  path text not null,
  alt text not null,
  orden integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.opciones_personalizacion (
  id uuid primary key default gen_random_uuid(),
  producto_id uuid not null references public.productos(id) on delete cascade,
  tipo_opcion text not null,
  valor text not null,
  precio_extra numeric(12, 2) not null default 0 check (precio_extra >= 0),
  orden integer not null default 0,
  activo boolean not null default true,
  unique (producto_id, tipo_opcion, valor)
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  path text not null unique,
  url text not null,
  alt text not null,
  mime text not null check (mime in ('image/jpeg', 'image/png', 'image/webp')),
  width integer check (width is null or width > 0),
  height integer check (height is null or height > 0),
  size_bytes integer check (size_bytes is null or size_bytes > 0),
  subido_por uuid references public.usuarios_admin(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.secciones_sitio (
  id uuid primary key default gen_random_uuid(),
  clave text not null unique,
  nombre text not null,
  contenido jsonb not null default '{}',
  activo boolean not null default true,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.usuarios_admin(id) on delete set null
);

create table if not exists public.configuracion_sitio (
  clave text primary key,
  valor jsonb not null,
  publico boolean not null default true,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.usuarios_admin(id) on delete set null
);

create index if not exists idx_login_intentos_usuario_fecha
  on public.login_intentos (usuario, created_at desc);

create index if not exists idx_categorias_orden_activo
  on public.categorias (orden, activo);

create index if not exists idx_productos_categoria_orden
  on public.productos (categoria_id, orden);

create index if not exists idx_productos_disponibles
  on public.productos (disponible, destacado, orden);

create index if not exists idx_producto_imagenes_producto
  on public.producto_imagenes (producto_id, orden);

create index if not exists idx_opciones_producto
  on public.opciones_personalizacion (producto_id, tipo_opcion, orden);

create index if not exists idx_media_created_at
  on public.media (created_at desc);

drop trigger if exists trg_usuarios_admin_updated_at on public.usuarios_admin;
create trigger trg_usuarios_admin_updated_at
before update on public.usuarios_admin
for each row execute function public.actualizar_updated_at();

drop trigger if exists trg_categorias_updated_at on public.categorias;
create trigger trg_categorias_updated_at
before update on public.categorias
for each row execute function public.actualizar_updated_at();

drop trigger if exists trg_productos_updated_at on public.productos;
create trigger trg_productos_updated_at
before update on public.productos
for each row execute function public.actualizar_updated_at();

drop trigger if exists trg_secciones_sitio_updated_at on public.secciones_sitio;
create trigger trg_secciones_sitio_updated_at
before update on public.secciones_sitio
for each row execute function public.actualizar_updated_at();

drop trigger if exists trg_configuracion_sitio_updated_at on public.configuracion_sitio;
create trigger trg_configuracion_sitio_updated_at
before update on public.configuracion_sitio
for each row execute function public.actualizar_updated_at();
