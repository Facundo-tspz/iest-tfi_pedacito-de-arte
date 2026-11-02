insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists media_lectura_publica on storage.objects;
create policy media_lectura_publica
on storage.objects
for select
to anon
using (bucket_id = 'media');
