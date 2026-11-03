import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Boton from '../../components/ui/Boton';
import { guardarProductoAdmin, listarMediaAdmin, obtenerProductoAdmin } from '../../services/admin';
import { obtenerCategorias } from '../../services/catalogo';
import {
  etiquetaFormato,
  filtrarMedios,
  nombreDesdePath,
  ordenarMedios,
  priorizarSeleccionados,
} from '../../utils/medios';

const PRODUCTO_VACIO = {
  codigo: '',
  nombre: '',
  slug: '',
  categoria_id: '',
  descripcion: '',
  caracteristicas: '',
  precio_base: '',
  precio_mayorista: '',
  cantidad_minima_mayorista: 10,
  precio_desde: false,
  destacado: false,
  disponible: true,
  meta_titulo: '',
  meta_descripcion: '',
  orden: 0,
};

function normalizarProducto(producto) {
  return {
    ...PRODUCTO_VACIO,
    ...producto,
    caracteristicas: (producto.caracteristicas ?? []).join('\n'),
    precio_base: producto.precio_base ?? '',
    precio_mayorista: producto.precio_mayorista ?? '',
    meta_titulo: producto.meta_titulo ?? '',
    meta_descripcion: producto.meta_descripcion ?? '',
  };
}

export default function ProductoFormPage() {
  const { id } = useParams();
  const navegar = useNavigate();
  const [producto, setProducto] = useState(PRODUCTO_VACIO);
  const [categorias, setCategorias] = useState([]);
  const [medios, setMedios] = useState([]);
  const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]);
  const [imagenHero, setImagenHero] = useState('');
  const [buscarMedios, setBuscarMedios] = useState('');
  const [filtroFormato, setFiltroFormato] = useState('todos');
  const [soloSeleccionadas, setSoloSeleccionadas] = useState(false);
  const [opciones, setOpciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const mediosVisibles = useMemo(
    () =>
      priorizarSeleccionados(
        ordenarMedios(
          filtrarMedios(medios, {
            buscar: buscarMedios,
            formato: filtroFormato,
            soloSeleccionadas,
            seleccionadas: imagenesSeleccionadas,
          }),
          'nombre',
        ),
        imagenesSeleccionadas,
      ),
    [medios, buscarMedios, filtroFormato, soloSeleccionadas, imagenesSeleccionadas],
  );

  useEffect(() => {
    let activo = true;

    Promise.all([
      obtenerCategorias(),
      listarMediaAdmin(),
      id ? obtenerProductoAdmin(id) : Promise.resolve(null),
    ])
      .then(([categoriasDatos, mediosDatos, productoDatos]) => {
        if (!activo) {
          return;
        }

        setCategorias(categoriasDatos);
        setMedios(mediosDatos);

        if (productoDatos) {
          const imagenesProducto = productoDatos.imagenes ?? [];

          setProducto(normalizarProducto(productoDatos));
          setImagenesSeleccionadas(imagenesProducto.map((imagen) => imagen.path));
          setImagenHero(imagenesProducto.find((imagen) => imagen.es_hero)?.path ?? '');
          setOpciones(productoDatos.opciones ?? []);
        }

        setCargando(false);
      })
      .catch(() => {
        if (activo) {
          setError('No se pudo cargar el formulario.');
          setCargando(false);
        }
      });

    return () => {
      activo = false;
    };
  }, [id]);

  const actualizar = (campo, valor) => {
    setProducto((actual) => ({ ...actual, [campo]: valor }));
  };

  const actualizarOpcion = (indice, campo, valor) => {
    setOpciones((actuales) =>
      actuales.map((opcion, posicion) =>
        posicion === indice ? { ...opcion, [campo]: valor } : opcion,
      ),
    );
  };

  const alternarImagen = (path) => {
    const seleccionada = imagenesSeleccionadas.includes(path);

    if (seleccionada && imagenHero === path) {
      setImagenHero('');
    }

    setImagenesSeleccionadas((actuales) =>
      actuales.includes(path) ? actuales.filter((item) => item !== path) : [...actuales, path],
    );
  };

  const guardar = async (evento) => {
    evento.preventDefault();
    setError('');
    setGuardando(true);

    const imagenes = medios
      .filter((medio) => imagenesSeleccionadas.includes(medio.path))
      .map((medio, indice) => ({
        url: medio.url,
        path: medio.path,
        alt: medio.alt,
        orden: indice,
        es_hero: medio.path === imagenHero,
      }));

    try {
      await guardarProductoAdmin({
        ...(id ? { id } : {}),
        ...producto,
        caracteristicas: producto.caracteristicas
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean),
        imagenes,
        opciones,
      });
      navegar('/estudio/productos', { replace: true });
    } catch {
      setError('No se pudo guardar el producto. Revisá los campos y códigos únicos.');
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return (
      <p role="status" className="font-cuerpo text-sm text-contraste">
        Cargando producto…
      </p>
    );
  }

  return (
    <div className="max-w-4xl">
      <Link
        to="/estudio/productos"
        className="font-cuerpo text-sm font-semibold text-principal underline-offset-4 hover:underline"
      >
        ← Volver a productos
      </Link>

      <h2 className="mt-4 font-titulos text-3xl font-semibold text-principal sm:text-4xl">
        {id ? 'Editar producto' : 'Nuevo producto'}
      </h2>

      {error ? (
        <p role="alert" className="mt-5 font-cuerpo text-sm text-secundario">
          {error}
        </p>
      ) : null}

      <form onSubmit={guardar} className="mt-8 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo etiqueta="Nombre" id="producto-nombre">
            <input
              id="producto-nombre"
              value={producto.nombre}
              onChange={(evento) => actualizar('nombre', evento.target.value)}
              required
              className="campo-admin"
            />
          </Campo>

          <Campo etiqueta="Código" id="producto-codigo">
            <input
              id="producto-codigo"
              value={producto.codigo}
              onChange={(evento) => actualizar('codigo', evento.target.value)}
              required
              className="campo-admin"
            />
          </Campo>

          <Campo etiqueta="Slug" id="producto-slug">
            <input
              id="producto-slug"
              value={producto.slug}
              onChange={(evento) => actualizar('slug', evento.target.value)}
              required
              className="campo-admin"
            />
          </Campo>

          <Campo etiqueta="Categoría" id="producto-categoria">
            <select
              id="producto-categoria"
              value={producto.categoria_id}
              onChange={(evento) => actualizar('categoria_id', evento.target.value)}
              required
              className="campo-admin"
            >
              <option value="">Elegir categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </Campo>
        </div>

        <Campo etiqueta="Descripción" id="producto-descripcion">
          <textarea
            id="producto-descripcion"
            value={producto.descripcion}
            onChange={(evento) => actualizar('descripcion', evento.target.value)}
            required
            rows={4}
            className="campo-admin"
          />
        </Campo>

        <Campo etiqueta="Características (una por línea)" id="producto-caracteristicas">
          <textarea
            id="producto-caracteristicas"
            value={producto.caracteristicas}
            onChange={(evento) => actualizar('caracteristicas', evento.target.value)}
            rows={4}
            className="campo-admin"
          />
        </Campo>

        <div className="grid gap-4 sm:grid-cols-3">
          <Campo etiqueta="Precio minorista" id="producto-precio">
            <input
              id="producto-precio"
              type="number"
              min="0"
              step="0.01"
              value={producto.precio_base}
              onChange={(evento) => actualizar('precio_base', evento.target.value)}
              className="campo-admin"
            />
          </Campo>

          <Campo etiqueta="Precio mayorista" id="producto-mayorista">
            <input
              id="producto-mayorista"
              type="number"
              min="0"
              step="0.01"
              value={producto.precio_mayorista}
              onChange={(evento) => actualizar('precio_mayorista', evento.target.value)}
              className="campo-admin"
            />
          </Campo>

          <Campo etiqueta="Mínimo mayorista" id="producto-minimo">
            <input
              id="producto-minimo"
              type="number"
              min="1"
              value={producto.cantidad_minima_mayorista}
              onChange={(evento) => actualizar('cantidad_minima_mayorista', evento.target.value)}
              className="campo-admin"
            />
          </Campo>
        </div>

        <div className="flex flex-wrap gap-5 font-cuerpo text-sm text-contraste">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={producto.precio_desde}
              onChange={(evento) => actualizar('precio_desde', evento.target.checked)}
            />
            Mostrar “Desde”
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={producto.destacado}
              onChange={(evento) => actualizar('destacado', evento.target.checked)}
            />
            Destacado
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={producto.disponible}
              onChange={(evento) => actualizar('disponible', evento.target.checked)}
            />
            Publicado
          </label>
        </div>

        <section>
          <h3 className="font-titulos text-2xl font-semibold text-principal">Imágenes</h3>
          {medios.length === 0 ? (
            <p className="mt-2 font-cuerpo text-sm text-contraste">
              Primero subí imágenes en{' '}
              <Link to="/estudio/media" className="font-semibold underline">
                Medios
              </Link>
              .
            </p>
          ) : (
            <>
              <div className="mt-3 grid gap-3 rounded-2xl border border-contraste/15 bg-blanco p-4 sm:grid-cols-[minmax(0,1fr)_10rem_auto]">
                <div>
                  <label
                    htmlFor="producto-buscar-medios"
                    className="block font-cuerpo text-xs font-semibold uppercase tracking-[0.12em] text-contraste"
                  >
                    Buscar imagen
                  </label>
                  <input
                    id="producto-buscar-medios"
                    type="search"
                    value={buscarMedios}
                    onChange={(evento) => setBuscarMedios(evento.target.value)}
                    placeholder="Anotador A6, hero, catálogo…"
                    className="mt-2 min-h-10 w-full rounded-lg border border-contraste/20 px-3 font-cuerpo text-sm text-principal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario"
                  />
                </div>

                <div>
                  <label
                    htmlFor="producto-filtro-formato"
                    className="block font-cuerpo text-xs font-semibold uppercase tracking-[0.12em] text-contraste"
                  >
                    Formato
                  </label>
                  <select
                    id="producto-filtro-formato"
                    value={filtroFormato}
                    onChange={(evento) => setFiltroFormato(evento.target.value)}
                    className="mt-2 min-h-10 w-full rounded-lg border border-contraste/20 bg-blanco px-3 font-cuerpo text-sm text-principal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario"
                  >
                    <option value="todos">Todos</option>
                    <option value="hero">Hero (16:9)</option>
                    <option value="catalogo">Catálogo (4:3)</option>
                  </select>
                </div>

                <label className="flex items-end gap-2 pb-2 font-cuerpo text-sm text-contraste">
                  <input
                    type="checkbox"
                    checked={soloSeleccionadas}
                    onChange={(evento) => setSoloSeleccionadas(evento.target.checked)}
                  />
                  Solo seleccionadas
                </label>
              </div>

              <p
                role="status"
                aria-live="polite"
                className="mt-3 font-cuerpo text-sm text-contraste"
              >
                Mostrando {mediosVisibles.length} de {medios.length} imágenes. Seleccionadas:{' '}
                {imagenesSeleccionadas.length}.
              </p>

              {mediosVisibles.length === 0 ? (
                <p className="mt-3 font-cuerpo text-sm text-contraste">
                  No hay imágenes que coincidan con la búsqueda.
                </p>
              ) : null}

              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {mediosVisibles.map((medio) => (
                  <label
                    key={medio.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 ${
                      imagenesSeleccionadas.includes(medio.path)
                        ? 'border-complementario-secundario bg-fondo/60'
                        : 'border-contraste/15 bg-blanco'
                    }`}
                  >
                    <input
                      className="mt-1"
                      type="checkbox"
                      checked={imagenesSeleccionadas.includes(medio.path)}
                      onChange={() => alternarImagen(medio.path)}
                    />
                    <img
                      src={medio.url}
                      alt={medio.alt}
                      className="h-14 w-14 rounded-lg object-cover"
                    />
                    <span className="min-w-0">
                      <span className="block break-words font-cuerpo text-xs font-semibold text-principal">
                        {nombreDesdePath(medio.path)}
                      </span>
                      <span className="mt-1 block font-cuerpo text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-contraste">
                        {etiquetaFormato(medio)}
                      </span>
                      <span className="mt-1 line-clamp-2 block break-words font-cuerpo text-xs text-contraste">
                        {medio.alt}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </>
          )}

          {imagenesSeleccionadas.length > 0 ? (
            <div className="mt-5">
              <label
                htmlFor="producto-imagen-hero"
                className="block font-cuerpo text-sm font-semibold text-principal"
              >
                Imagen para el hero
              </label>
              <select
                id="producto-imagen-hero"
                value={imagenHero}
                onChange={(evento) => setImagenHero(evento.target.value)}
                className="mt-2 min-h-11 w-full rounded-xl border border-contraste/20 bg-blanco px-4 font-cuerpo text-base text-principal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario"
              >
                <option value="">Sin imagen de hero</option>
                {medios
                  .filter((medio) => imagenesSeleccionadas.includes(medio.path))
                  .map((medio) => (
                    <option key={medio.id} value={medio.path}>
                      {medio.alt}
                    </option>
                  ))}
              </select>
              <p className="mt-2 font-cuerpo text-xs text-contraste">
                El catálogo usa la primera imagen que no esté marcada como hero. La imagen de hero
                debe ser 16:9.
              </p>
            </div>
          ) : null}
        </section>

        <section>
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-titulos text-2xl font-semibold text-principal">Opciones</h3>
            <button
              type="button"
              onClick={() =>
                setOpciones((actuales) => [
                  ...actuales,
                  { tipo_opcion: '', valor: '', precio_extra: 0, activo: true },
                ])
              }
              className="font-cuerpo text-sm font-semibold text-principal underline-offset-4 hover:underline"
            >
              Agregar opción
            </button>
          </div>

          <div className="mt-3 space-y-3">
            {opciones.map((opcion, indice) => (
              <div
                key={`${indice}-${opcion.id ?? 'nueva'}`}
                className="grid gap-3 rounded-xl border border-contraste/15 bg-blanco p-3 sm:grid-cols-[1fr_1fr_8rem_auto]"
              >
                <input
                  aria-label={`Tipo de opción ${indice + 1}`}
                  placeholder="Tipo"
                  value={opcion.tipo_opcion}
                  onChange={(evento) =>
                    actualizarOpcion(indice, 'tipo_opcion', evento.target.value)
                  }
                  className="campo-admin"
                />
                <input
                  aria-label={`Valor de opción ${indice + 1}`}
                  placeholder="Valor"
                  value={opcion.valor}
                  onChange={(evento) => actualizarOpcion(indice, 'valor', evento.target.value)}
                  className="campo-admin"
                />
                <input
                  aria-label={`Adicional de opción ${indice + 1}`}
                  type="number"
                  min="0"
                  value={opcion.precio_extra ?? 0}
                  onChange={(evento) =>
                    actualizarOpcion(indice, 'precio_extra', evento.target.value)
                  }
                  className="campo-admin"
                />
                <button
                  type="button"
                  onClick={() =>
                    setOpciones((actuales) => actuales.filter((_, posicion) => posicion !== indice))
                  }
                  className="font-cuerpo text-sm font-semibold text-secundario"
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-2">
          <Campo etiqueta="Título SEO" id="producto-meta-titulo">
            <input
              id="producto-meta-titulo"
              value={producto.meta_titulo}
              onChange={(evento) => actualizar('meta_titulo', evento.target.value)}
              className="campo-admin"
            />
          </Campo>
          <Campo etiqueta="Descripción SEO" id="producto-meta-descripcion">
            <input
              id="producto-meta-descripcion"
              value={producto.meta_descripcion}
              onChange={(evento) => actualizar('meta_descripcion', evento.target.value)}
              className="campo-admin"
            />
          </Campo>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-contraste/15 pt-6">
          <Boton type="submit" disabled={guardando}>
            {guardando ? 'Guardando…' : 'Guardar producto'}
          </Boton>
          <Link
            to="/estudio/productos"
            className="font-cuerpo text-sm font-semibold text-contraste underline-offset-4 hover:underline"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

function Campo({ etiqueta, id, children }) {
  return (
    <div>
      <label htmlFor={id} className="font-cuerpo text-sm font-semibold text-principal">
        {etiqueta}
      </label>
      <div className="mt-2 [&_.campo-admin]:min-h-11 [&_.campo-admin]:w-full [&_.campo-admin]:rounded-xl [&_.campo-admin]:border [&_.campo-admin]:border-contraste/20 [&_.campo-admin]:bg-blanco [&_.campo-admin]:px-4 [&_.campo-admin]:py-2 [&_.campo-admin]:font-cuerpo [&_.campo-admin]:text-sm [&_.campo-admin]:text-principal [&_.campo-admin]:focus-visible:outline-none [&_.campo-admin]:focus-visible:ring-2 [&_.campo-admin]:focus-visible:ring-complementario-secundario">
        {children}
      </div>
    </div>
  );
}
