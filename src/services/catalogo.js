import { CATEGORIAS, PRODUCTOS } from '../data/mockCatalogo';
import { supabase } from '../lib/supabase';
import { normalizarTexto } from '../utils/texto';

const SELECT_PRODUCTO = `
  *,
  categoria:categorias(id, nombre, slug, activo),
  imagenes:producto_imagenes(id, url, path, alt, orden, es_hero),
  opciones:opciones_personalizacion(id, tipo_opcion, valor, precio_extra, orden, activo)
`;

function normalizarLimite(limite, porDefecto = 4) {
  return Number.isFinite(limite) ? Math.max(0, Math.floor(limite)) : porDefecto;
}

function ordenarPorOrden(items) {
  return [...items].sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
}

function mapearCategoria(categoria) {
  return {
    id: categoria.id,
    nombre: categoria.nombre,
    slug: categoria.slug,
    descripcion: categoria.descripcion ?? null,
    orden: categoria.orden ?? 0,
    activo: categoria.activo,
  };
}

function mapearProducto(producto) {
  return {
    id: producto.id,
    codigo: producto.codigo,
    nombre: producto.nombre,
    slug: producto.slug,
    categoria_id: producto.categoria_id,
    categoria: {
      id: producto.categoria?.id ?? producto.categoria_id,
      nombre: producto.categoria?.nombre ?? '',
      slug: producto.categoria?.slug ?? '',
    },
    descripcion: producto.descripcion,
    caracteristicas: producto.caracteristicas ?? [],
    precio_base: producto.precio_base,
    precio_mayorista: producto.precio_mayorista ?? null,
    cantidad_minima_mayorista: producto.cantidad_minima_mayorista ?? 10,
    precio_desde: producto.precio_desde ?? false,
    destacado: producto.destacado,
    disponible: producto.disponible,
    meta_titulo: producto.meta_titulo ?? null,
    meta_descripcion: producto.meta_descripcion ?? null,
    orden: producto.orden ?? 0,
    imagenes: ordenarPorOrden(producto.imagenes ?? []).map((imagen) => ({
      id: imagen.id,
      url: imagen.url,
      alt: imagen.alt,
      orden: imagen.orden ?? 0,
      es_hero: Boolean(imagen.es_hero),
    })),
    opciones: ordenarPorOrden(producto.opciones ?? []).map((opcion) => ({
      id: opcion.id,
      tipo_opcion: opcion.tipo_opcion,
      valor: opcion.valor,
      precio_extra: opcion.precio_extra,
      orden: opcion.orden ?? 0,
      activo: opcion.activo,
    })),
  };
}

function obtenerCategoriasActivasMock() {
  return CATEGORIAS.filter((categoria) => categoria.activo).sort((a, b) => a.orden - b.orden);
}

function obtenerProductosDisponiblesMock() {
  const slugsActivos = new Set(obtenerCategoriasActivasMock().map((categoria) => categoria.slug));

  return PRODUCTOS.filter(
    (producto) => producto.disponible && slugsActivos.has(producto.categoria.slug),
  ).sort((a, b) => a.orden - b.orden);
}

function clonarProducto(producto) {
  return {
    ...producto,
    categoria: { ...producto.categoria },
    caracteristicas: [...producto.caracteristicas],
    imagenes: producto.imagenes.map((imagen) => ({ ...imagen })),
    opciones: producto.opciones.map((opcion) => ({ ...opcion })),
  };
}

function obtenerCamposBusqueda(producto) {
  return [producto.nombre, producto.descripcion, producto.codigo, producto.categoria.nombre];
}

async function obtenerCategoriasSupabase() {
  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .eq('activo', true)
    .order('orden', { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapearCategoria);
}

async function obtenerProductosSupabase() {
  const { data, error } = await supabase
    .from('productos')
    .select(SELECT_PRODUCTO)
    .eq('disponible', true)
    .order('orden', { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).filter((producto) => producto.categoria?.activo).map(mapearProducto);
}

export async function obtenerCategorias() {
  if (supabase) {
    return obtenerCategoriasSupabase();
  }

  return obtenerCategoriasActivasMock().map((categoria) => ({ ...categoria }));
}

export async function obtenerProductos(filtros = {}) {
  const { categoria, buscar } = filtros ?? {};
  const productos = supabase
    ? await obtenerProductosSupabase()
    : obtenerProductosDisponiblesMock().map(clonarProducto);
  const slugsActivos = new Set(productos.map((producto) => producto.categoria.slug));
  const categoriaValida =
    typeof categoria === 'string' && slugsActivos.has(categoria) ? categoria : null;
  const termino = normalizarTexto(buscar);

  return productos
    .filter((producto) => !categoriaValida || producto.categoria.slug === categoriaValida)
    .filter(
      (producto) =>
        !termino ||
        obtenerCamposBusqueda(producto).some((campo) => normalizarTexto(campo).includes(termino)),
    );
}

export async function obtenerProductoPorSlug(slug) {
  const slugNormalizado = typeof slug === 'string' ? slug.trim() : '';

  if (!slugNormalizado) {
    return null;
  }

  if (supabase) {
    const { data, error } = await supabase
      .from('productos')
      .select(SELECT_PRODUCTO)
      .eq('slug', slugNormalizado)
      .eq('disponible', true)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data || !data.categoria?.activo) {
      return null;
    }

    return mapearProducto(data);
  }

  const producto = obtenerProductosDisponiblesMock().find((item) => item.slug === slugNormalizado);

  return producto ? clonarProducto(producto) : null;
}

export async function obtenerDestacados(limite = 4) {
  const productos = await obtenerProductos();
  const destacados = productos.filter((producto) => producto.destacado);
  const resto = productos.filter((producto) => !producto.destacado);

  return [...destacados, ...resto].slice(0, normalizarLimite(limite));
}

export async function obtenerNovedades(limite = 4, slugsExcluidos = []) {
  const excluidos = new Set(Array.isArray(slugsExcluidos) ? slugsExcluidos : []);
  const productos = await obtenerProductos();

  return productos
    .filter((producto) => !excluidos.has(producto.slug))
    .slice(0, normalizarLimite(limite));
}
