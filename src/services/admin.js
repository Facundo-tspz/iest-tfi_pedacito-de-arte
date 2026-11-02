import { supabase } from '../lib/supabase';

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

export function listarMediaAdmin() {
  return pedir('admin-media');
}

export function prepararSubidaMedia({ filename, mime, size }) {
  return pedir('admin-media-url', {
    method: 'POST',
    body: JSON.stringify({ filename, mime, size }),
  });
}

export async function subirArchivoMedia({ file, path, token }) {
  if (!supabase) {
    throw new Error('Supabase Storage no está configurado.');
  }

  const { error } = await supabase.storage.from('media').uploadToSignedUrl(path, token, file, {
    contentType: file.type || 'image/webp',
  });

  if (error) {
    throw error;
  }
}

export function registrarMediaAdmin(datos) {
  return pedir('admin-media', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
}

export function actualizarAltMediaAdmin(id, alt) {
  return pedir('admin-media', {
    method: 'PATCH',
    body: JSON.stringify({ id, alt }),
  });
}

export function listarProductosAdmin() {
  return pedir('admin-productos');
}

export function obtenerProductoAdmin(id) {
  return pedir(`admin-productos?id=${encodeURIComponent(id)}`);
}

export function guardarProductoAdmin(producto) {
  return pedir('admin-productos', {
    method: producto.id ? 'PUT' : 'POST',
    body: JSON.stringify(producto),
  });
}
