import { verificarPassword } from './_lib/password.mjs';
import { leerBody, respuestaJson } from './_lib/respuestas.mjs';
import { crearCookieSesion, firmarSesion } from './_lib/sesion.mjs';
import { obtenerSupabaseAdmin } from './_lib/supabaseAdmin.mjs';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return respuestaJson(405, { error: 'Método no permitido.' });
  }

  const { usuario, password } = leerBody(event);

  if (typeof usuario !== 'string' || typeof password !== 'string' || !usuario.trim() || !password) {
    return respuestaJson(400, { error: 'Usuario y contraseña son obligatorios.' });
  }

  const secreto = process.env.ADMIN_SESSION_SECRET;

  if (!secreto) {
    return respuestaJson(500, { error: 'Falta ADMIN_SESSION_SECRET.' });
  }

  try {
    const supabase = obtenerSupabaseAdmin();
    const { data: admin, error } = await supabase
      .from('usuarios_admin')
      .select('id, usuario, nombre, password_hash, rol, activo, session_version')
      .eq('usuario', usuario.trim())
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!admin || !admin.activo || !verificarPassword(password, admin.password_hash)) {
      return respuestaJson(401, { error: 'Usuario o contraseña incorrectos.' });
    }

    const ahora = Math.floor(Date.now() / 1000);
    const token = firmarSesion(
      {
        sub: admin.id,
        rol: admin.rol,
        sv: admin.session_version,
        iat: ahora,
        exp: ahora + 8 * 60 * 60,
      },
      secreto,
    );

    await supabase
      .from('usuarios_admin')
      .update({ ultimo_acceso: new Date().toISOString() })
      .eq('id', admin.id);

    return respuestaJson(
      200,
      {
        usuario: admin.usuario,
        nombre: admin.nombre,
        rol: admin.rol,
      },
      {
        'Set-Cookie': crearCookieSesion(token),
      },
    );
  } catch {
    return respuestaJson(500, { error: 'No se pudo iniciar sesión.' });
  }
}
