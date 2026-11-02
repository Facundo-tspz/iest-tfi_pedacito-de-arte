alter table public.usuarios_admin enable row level security;
alter table public.login_intentos enable row level security;
alter table public.categorias enable row level security;
alter table public.productos enable row level security;
alter table public.producto_imagenes enable row level security;
alter table public.opciones_personalizacion enable row level security;
alter table public.media enable row level security;
alter table public.secciones_sitio enable row level security;
alter table public.configuracion_sitio enable row level security;

drop policy if exists categorias_lectura_publica on public.categorias;
create policy categorias_lectura_publica
on public.categorias
for select
to anon
using (activo = true);

drop policy if exists productos_lectura_publica on public.productos;
create policy productos_lectura_publica
on public.productos
for select
to anon
using (
  disponible = true
  and exists (
    select 1
    from public.categorias
    where categorias.id = productos.categoria_id
      and categorias.activo = true
  )
);

drop policy if exists producto_imagenes_lectura_publica on public.producto_imagenes;
create policy producto_imagenes_lectura_publica
on public.producto_imagenes
for select
to anon
using (
  exists (
    select 1
    from public.productos
    join public.categorias on categorias.id = productos.categoria_id
    where productos.id = producto_imagenes.producto_id
      and productos.disponible = true
      and categorias.activo = true
  )
);

drop policy if exists opciones_lectura_publica on public.opciones_personalizacion;
create policy opciones_lectura_publica
on public.opciones_personalizacion
for select
to anon
using (
  activo = true
  and exists (
    select 1
    from public.productos
    join public.categorias on categorias.id = productos.categoria_id
    where productos.id = opciones_personalizacion.producto_id
      and productos.disponible = true
      and categorias.activo = true
  )
);

drop policy if exists secciones_lectura_publica on public.secciones_sitio;
create policy secciones_lectura_publica
on public.secciones_sitio
for select
to anon
using (activo = true);

drop policy if exists configuracion_lectura_publica on public.configuracion_sitio;
create policy configuracion_lectura_publica
on public.configuracion_sitio
for select
to anon
using (publico = true);
