import { respuestaJson } from './_lib/respuestas.mjs';
import { crearCookieExpirada } from './_lib/sesion.mjs';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return respuestaJson(405, { error: 'Método no permitido.' });
  }

  return respuestaJson(
    200,
    { ok: true },
    {
      'Set-Cookie': crearCookieExpirada(),
    },
  );
}
