import { obtenerAdminAutenticado } from './_lib/autorizacion.mjs';
import { leerBody, respuestaJson } from './_lib/respuestas.mjs';

const SELECT_ADMIN = `
  *,
  categoria:categorias(id, nombre, slug, activo),
  imagenes:producto_imagenes(id, url, path, alt, orden, es_hero),
  opciones:opciones_personalizacion(id, tipo_opcion, valor, precio_extra, orden, activo)
`;

function texto(valor, max = 2000) {
  return typeof valor === 'string' ? valor.trim().slice(0, max) : '';
}

function precio(valor) {
  if (valor === '' || valor === null || valor === undefined) {
    return null;
  }

  const numero = Number(valor);
  return Number.isFinite(numero) && numero >= 0 ? numero : null;
}

function normalizarProducto(body, admin) {
  const caracteristicas = Array.isArray(body.caracteristicas)
    ? body.caracteristicas
        .map((item) => texto(item, 80))
        .filter(Boolean)
        .slice(0, 8)
    : [];

  return {
    codigo: texto(body.codigo, 40),
    nombre: texto(body.nombre, 160),
    slug: texto(body.slug, 160),
    categoria_id: texto(body.categoria_id, 80),
    descripcion: texto(body.descripcion, 4000),
    caracteristicas,
    precio_base: precio(body.precio_base),
    precio_mayorista: precio(body.precio_mayorista),
    cantidad_minima_mayorista: Math.max(1, Number(body.cantidad_minima_mayorista) || 10),
    precio_desde: Boolean(body.precio_desde),
    destacado: Boolean(body.destacado),
    disponible: Boolean(body.disponible),
    meta_titulo: texto(body.meta_titulo, 160) || null,
    meta_descripcion: texto(body.meta_descripcion, 300) || null,
    orden: Number.isFinite(Number(body.orden)) ? Number(body.orden) : 0,
    actualizado_por: admin.id,
  };
}

function normalizarImagenes(imagenes = []) {
  let heroAsignado = false;

  return (Array.isArray(imagenes) ? imagenes : [])
    .map((imagen, indice) => {
      const esHero = Boolean(imagen?.es_hero) && !heroAsignado;

      if (esHero) {
        heroAsignado = true;
      }

      return {
        url: texto(imagen?.url, 1000),
        path: texto(imagen?.path, 300),
        alt: texto(imagen?.alt, 300),
        orden: Number.isFinite(Number(imagen?.orden)) ? Number(imagen.orden) : indice,
        es_hero: esHero,
      };
    })
    .filter((imagen) => imagen.url && imagen.path && imagen.alt);
}

function normalizarOpciones(opciones = []) {
  return (Array.isArray(opciones) ? opciones : [])
    .map((opcion, indice) => ({
      tipo_opcion: texto(opcion?.tipo_opcion, 80),
      valor: texto(opcion?.valor, 120),
      precio_extra: precio(opcion?.precio_extra) ?? 0,
      orden: Number.isFinite(Number(opcion?.orden)) ? Number(opcion.orden) : indice,
      activo: opcion?.activo !== false,
    }))
    .filter((opcion) => opcion.tipo_opcion && opcion.valor);
}

async function reemplazarRelaciones(supabase, productoId, imagenes, opciones) {
  await supabase.from('producto_imagenes').delete().eq('producto_id', productoId);
  await supabase.from('opciones_personalizacion').delete().eq('producto_id', productoId);

  if (imagenes.length > 0) {
    const { error } = await supabase
      .from('producto_imagenes')
      .insert(imagenes.map((imagen) => ({ ...imagen, producto_id: productoId })));

    if (error) {
      throw error;
    }
  }

  if (opciones.length > 0) {
    const { error } = await supabase
      .from('opciones_personalizacion')
      .insert(opciones.map((opcion) => ({ ...opcion, producto_id: productoId })));

    if (error) {
      throw error;
    }
  }
}

export async function handler(event) {
  const auth = await obtenerAdminAutenticado(event, ['admin', 'editor']);

  if (auth.error) {
    return auth.error;
  }

  const { supabase, admin } = auth;

  if (event.httpMethod === 'GET') {
    const id = event.queryStringParameters?.id;
    let consulta = supabase.from('productos').select(SELECT_ADMIN).order('orden', {
      ascending: true,
    });

    if (id) {
      consulta = consulta.eq('id', id);
    }

    const { data, error } = id ? await consulta.maybeSingle() : await consulta;

    if (error) {
      return respuestaJson(500, { error: 'No se pudieron cargar los productos.' });
    }

    return respuestaJson(200, id ? data : (data ?? []));
  }

  if (event.httpMethod === 'POST' || event.httpMethod === 'PUT') {
    const body = leerBody(event);
    const producto = normalizarProducto(body, admin);

    if (
      !producto.codigo ||
      !producto.nombre ||
      !producto.slug ||
      !producto.categoria_id ||
      !producto.descripcion
    ) {
      return respuestaJson(400, {
        error: 'Código, nombre, slug, categoría y descripción son obligatorios.',
      });
    }

    const imagenes = normalizarImagenes(body.imagenes);
    const opciones = normalizarOpciones(body.opciones);
    let id = body.id;

    if (event.httpMethod === 'POST') {
      const { data, error } = await supabase
        .from('productos')
        .insert({ ...producto, creado_por: admin.id })
        .select('id')
        .single();

      if (error) {
        return respuestaJson(500, { error: 'No se pudo crear el producto.' });
      }

      id = data.id;
    } else {
      if (!id) {
        return respuestaJson(400, { error: 'Falta el id del producto.' });
      }

      const { error } = await supabase.from('productos').update(producto).eq('id', id);

      if (error) {
        return respuestaJson(500, { error: 'No se pudo actualizar el producto.' });
      }
    }

    try {
      await reemplazarRelaciones(supabase, id, imagenes, opciones);
    } catch {
      return respuestaJson(500, {
        error: 'El producto se guardó, pero fallaron sus imágenes u opciones.',
      });
    }

    return respuestaJson(event.httpMethod === 'POST' ? 201 : 200, { id });
  }

  return respuestaJson(405, { error: 'Método no permitido.' });
}
