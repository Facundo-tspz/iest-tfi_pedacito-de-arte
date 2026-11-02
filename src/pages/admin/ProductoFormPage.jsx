import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Boton from '../../components/ui/Boton';
import { guardarProductoAdmin, listarMediaAdmin, obtenerProductoAdmin } from '../../services/admin';
import { obtenerCategorias } from '../../services/catalogo';

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
  const [opciones, setOpciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

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
          setProducto(normalizarProducto(productoDatos));
          setImagenesSeleccionadas((productoDatos.imagenes ?? []).map((imagen) => imagen.path));
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
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {medios.map((medio) => (
                <label
                  key={medio.id}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-contraste/15 bg-blanco p-3"
                >
                  <input
                    type="checkbox"
                    checked={imagenesSeleccionadas.includes(medio.path)}
                    onChange={() => alternarImagen(medio.path)}
                  />
                  <img
                    src={medio.url}
                    alt={medio.alt}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <span className="min-w-0 break-words font-cuerpo text-xs text-contraste">
                    {medio.alt}
                  </span>
                </label>
              ))}
            </div>
          )}
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
