import { obtenerAdminAutenticado } from './_lib/autorizacion.mjs';
import { leerBody, respuestaJson } from './_lib/respuestas.mjs';

const MIMES = new Set(['image/jpeg', 'image/png', 'image/webp']);

function texto(valor, max = 500) {
  return typeof valor === 'string' ? valor.trim().slice(0, max) : '';
}

export async function handler(event) {
  const auth = await obtenerAdminAutenticado(event, ['admin', 'editor']);

  if (auth.error) {
    return auth.error;
  }

  const { supabase, admin } = auth;

  if (event.httpMethod === 'GET') {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return respuestaJson(500, { error: 'No se pudieron cargar los medios.' });
    }

    return respuestaJson(200, data ?? []);
  }

  if (event.httpMethod === 'POST') {
    const body = leerBody(event);
    const alt = texto(body.alt);

    if (!alt) {
      return respuestaJson(400, { error: 'El texto alt es obligatorio.' });
    }

    if (!MIMES.has(body.mime)) {
      return respuestaJson(400, { error: 'Formato de imagen no permitido.' });
    }

    const { data, error } = await supabase
      .from('media')
      .insert({
        path: texto(body.path, 300),
        url: texto(body.url, 1000),
        alt,
        mime: body.mime,
        width: Number.isFinite(Number(body.width)) ? Number(body.width) : null,
        height: Number.isFinite(Number(body.height)) ? Number(body.height) : null,
        size_bytes: Number.isFinite(Number(body.size_bytes))
          ? Number(body.size_bytes)
          : null,
        subido_por: admin.id,
      })
      .select()
      .single();

    if (error) {
      return respuestaJson(500, { error: 'No se pudo registrar la imagen.' });
    }

    return respuestaJson(201, data);
  }

  if (event.httpMethod === 'PATCH') {
    const body = leerBody(event);
    const alt = texto(body.alt);

    if (!body.id || !alt) {
      return respuestaJson(400, { error: 'Faltan id o alt.' });
    }

    const { data, error } = await supabase
      .from('media')
      .update({ alt })
      .eq('id', body.id)
      .select()
      .single();

    if (error) {
      return respuestaJson(500, { error: 'No se pudo actualizar la imagen.' });
    }

    return respuestaJson(200, data);
  }

  return respuestaJson(405, { error: 'Método no permitido.' });
}
