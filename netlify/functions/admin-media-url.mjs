import { randomUUID } from 'node:crypto';
import { obtenerAdminAutenticado } from './_lib/autorizacion.mjs';
import { leerBody, respuestaJson } from './_lib/respuestas.mjs';

const MIMES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_BYTES = 5 * 1024 * 1024;

function slugificar(valor) {
  return valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'imagen';
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return respuestaJson(405, { error: 'Método no permitido.' });
  }

  const auth = await obtenerAdminAutenticado(event, ['admin', 'editor']);

  if (auth.error) {
    return auth.error;
  }

  const { filename, mime, size } = leerBody(event);

  if (typeof filename !== 'string' || !filename.trim()) {
    return respuestaJson(400, { error: 'Falta el nombre del archivo.' });
  }

  if (!MIMES.has(mime)) {
    return respuestaJson(400, { error: 'Solo se permiten JPG, PNG o WebP.' });
  }

  if (!Number.isFinite(Number(size)) || Number(size) <= 0 || Number(size) > MAX_BYTES) {
    return respuestaJson(400, { error: 'La imagen supera el tamaño permitido.' });
  }

  const anio = new Date().getFullYear();
  const path = `${anio}/${randomUUID()}-${slugificar(filename)}.webp`;
  const { data, error } = await auth.supabase.storage
    .from('media')
    .createSignedUploadUrl(path);

  if (error) {
    return respuestaJson(500, { error: 'No se pudo preparar la subida.' });
  }

  const { data: publica } = auth.supabase.storage.from('media').getPublicUrl(path);

  return respuestaJson(200, {
    path,
    token: data.token,
    signedUrl: data.signedUrl,
    url: publica.publicUrl,
  });
}
