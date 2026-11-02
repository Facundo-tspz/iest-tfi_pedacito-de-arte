import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listarProductosAdmin } from '../../services/admin';
import { formatearPrecio } from '../../utils/precio';

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let activo = true;

    listarProductosAdmin()
      .then((datos) => {
        if (activo) {
          setProductos(datos);
          setCargando(false);
        }
      })
      .catch(() => {
        if (activo) {
          setError('No se pudieron cargar los productos.');
          setCargando(false);
        }
      });

    return () => {
      activo = false;
    };
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="font-cuerpo text-sm font-semibold uppercase tracking-[0.16em] text-contraste">
            Catálogo
          </p>
          <h2 className="mt-2 font-titulos text-3xl font-semibold text-principal sm:text-4xl">
            Productos
          </h2>
        </div>

        <Link
          to="/estudio/productos/nuevo"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-principal px-5 font-cuerpo text-sm font-semibold text-blanco transition-colors hover:bg-principal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario"
        >
          Nuevo producto
        </Link>
      </div>

      {error ? (
        <p role="alert" className="mt-6 font-cuerpo text-sm text-secundario">
          {error}
        </p>
      ) : null}

      {cargando ? (
        <p role="status" className="mt-6 font-cuerpo text-sm text-contraste">
          Cargando productos…
        </p>
      ) : null}

      {!cargando && !error && productos.length === 0 ? (
        <p className="mt-6 font-cuerpo text-sm text-contraste">Todavía no hay productos.</p>
      ) : null}

      {productos.length > 0 ? (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-contraste/15 bg-blanco">
          <table className="w-full min-w-[640px] text-left">
            <thead className="bg-fondo/70 font-cuerpo text-xs uppercase tracking-[0.12em] text-contraste">
              <tr>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3">Código</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-contraste/10 font-cuerpo text-sm text-contraste">
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td className="px-4 py-3 font-semibold text-principal">{producto.nombre}</td>
                  <td className="px-4 py-3">{producto.codigo}</td>
                  <td className="px-4 py-3">
                    {producto.precio_desde ? 'Desde ' : ''}
                    {formatearPrecio(producto.precio_base)}
                  </td>
                  <td className="px-4 py-3">{producto.disponible ? 'Publicado' : 'Oculto'}</td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/estudio/productos/${producto.id}`}
                      className="font-semibold text-principal underline-offset-4 hover:underline"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
