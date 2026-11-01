import { CATEGORIAS, PRODUCTOS } from '../data/mockCatalogo';
import { normalizarTexto } from '../utils/texto';

function normalizarLimite(limite, porDefecto = 4) {
  return Number.isFinite(limite) ? Math.max(0, Math.floor(limite)) : porDefecto;
}

function obtenerCategoriasActivas() {
  return CATEGORIAS.filter((categoria) => categoria.activo).sort(
    (a, b) => a.orden - b.orden,
  );
}

function obtenerProductosDisponibles() {
  const slugsActivos = new Set(
    obtenerCategoriasActivas().map((categoria) => categoria.slug),
  );

  return PRODUCTOS.filter(
    (producto) =>
      producto.disponible && slugsActivos.has(producto.categoria.slug),
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
  return [
    producto.nombre,
    producto.descripcion,
    producto.codigo,
    producto.categoria.nombre,
  ];
}

export async function obtenerCategorias() {
  return obtenerCategoriasActivas().map((categoria) => ({ ...categoria }));
}

export async function obtenerProductos(filtros = {}) {
  const { categoria, buscar } = filtros ?? {};
  const slugsActivos = new Set(
    obtenerCategoriasActivas().map((item) => item.slug),
  );
  const categoriaValida =
    typeof categoria === 'string' && slugsActivos.has(categoria)
      ? categoria
      : null;
  const termino = normalizarTexto(buscar);

  return obtenerProductosDisponibles()
    .filter(
      (producto) =>
        !categoriaValida || producto.categoria.slug === categoriaValida,
    )
    .filter(
      (producto) =>
        !termino ||
        obtenerCamposBusqueda(producto).some((campo) =>
          normalizarTexto(campo).includes(termino),
        ),
    )
    .map(clonarProducto);
}

export async function obtenerProductoPorSlug(slug) {
  const slugNormalizado = typeof slug === 'string' ? slug.trim() : '';

  if (!slugNormalizado) {
    return null;
  }

  const producto = obtenerProductosDisponibles().find(
    (item) => item.slug === slugNormalizado,
  );

  return producto ? clonarProducto(producto) : null;
}

export async function obtenerDestacados(limite = 4) {
  const productos = await obtenerProductos();
  const destacados = productos.filter((producto) => producto.destacado);
  const resto = productos.filter((producto) => !producto.destacado);

  return [...destacados, ...resto].slice(0, normalizarLimite(limite));
}

export async function obtenerNovedades(limite = 4, slugsExcluidos = []) {
  const excluidos = new Set(
    Array.isArray(slugsExcluidos) ? slugsExcluidos : [],
  );
  const productos = await obtenerProductos();

  return productos
    .filter((producto) => !excluidos.has(producto.slug))
    .slice(0, normalizarLimite(limite));
}
