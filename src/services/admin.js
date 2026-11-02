const BASE = '/.netlify/functions';

async function pedir(ruta, opciones = {}) {
  const respuesta = await fetch(`${BASE}/${ruta}`, {
    credentials: 'include',
    ...opciones,
    headers: {
      'Content-Type': 'application/json',
      ...(opciones.headers ?? {}),
    },
  });
  const datos = await respuesta.json().catch(() => ({}));

  if (!respuesta.ok) {
    const error = new Error(datos.error || 'Error de administración.');
    error.status = respuesta.status;
    throw error;
  }

  return datos;
}

export function iniciarSesionAdmin(usuario, password) {
  return pedir('admin-login', {
    method: 'POST',
    body: JSON.stringify({ usuario, password }),
  });
}

export async function obtenerSesionAdmin() {
  try {
    return await pedir('admin-session');
  } catch (error) {
    if (error.status === 401) {
      return null;
    }

    throw error;
  }
}

export function cerrarSesionAdmin() {
  return pedir('admin-logout', { method: 'POST' });
}
