alter table public.producto_imagenes
  add column if not exists es_hero boolean not null default false;

create unique index if not exists idx_producto_imagenes_hero_unico
  on public.producto_imagenes (producto_id)
  where es_hero;
