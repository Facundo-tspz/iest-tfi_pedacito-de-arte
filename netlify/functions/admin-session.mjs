import { respuestaJson } from './_lib/respuestas.mjs';
import { COOKIE_SESION, leerCookie, verificarSesion } from './_lib/sesion.mjs';
import { obtenerSupabaseAdmin } from './_lib/supabaseAdmin.mjs';

export async function handler(event) {
  if (event.httpMethod !== 'GET') {
    return respuestaJson(405, { error: 'Método no permitido.' });
  }

  const secreto = process.env.ADMIN_SESSION_SECRET;

  if (!secreto) {
    return respuestaJson(500, { error: 'Falta ADMIN_SESSION_SECRET.' });
  }

  const token = leerCookie(event, COOKIE_SESION);
  const payload = verificarSesion(token, secreto);

  if (!payload) {
    return respuestaJson(401, { error: 'Sesión inválida o vencida.' });
  }

  try {
    const supabase = obtenerSupabaseAdmin();
    const { data: admin, error } = await supabase
      .from('usuarios_admin')
      .select('id, usuario, nombre, rol, activo, session_version')
      .eq('id', payload.sub)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!admin || !admin.activo || admin.session_version !== payload.sv) {
      return respuestaJson(401, { error: 'Sesión inválida o vencida.' });
    }

    return respuestaJson(200, {
      usuario: admin.usuario,
      nombre: admin.nombre,
      rol: admin.rol,
    });
  } catch {
    return respuestaJson(500, { error: 'No se pudo verificar la sesión.' });
  }
}
