import { respuestaJson } from './respuestas.mjs';
import {
  COOKIE_SESION,
  leerCookie,
  verificarSesion,
} from './sesion.mjs';
import { obtenerSupabaseAdmin } from './supabaseAdmin.mjs';

export async function obtenerAdminAutenticado(event, roles = ['admin', 'editor']) {
  const secreto = process.env.ADMIN_SESSION_SECRET;

  if (!secreto) {
    return { error: respuestaJson(500, { error: 'Falta ADMIN_SESSION_SECRET.' }) };
  }

  const token = leerCookie(event, COOKIE_SESION);
  const payload = verificarSesion(token, secreto);

  if (!payload) {
    return { error: respuestaJson(401, { error: 'Sesión inválida o vencida.' }) };
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

    if (
      !admin ||
      !admin.activo ||
      admin.session_version !== payload.sv ||
      !roles.includes(admin.rol)
    ) {
      return { error: respuestaJson(401, { error: 'Sesión inválida o sin permisos.' }) };
    }

    return { admin, supabase };
  } catch {
    return { error: respuestaJson(500, { error: 'No se pudo validar la sesión.' }) };
  }
}
