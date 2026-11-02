import { useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import 'react-easy-crop/react-easy-crop.css';
import Boton from '../../components/ui/Boton';
import {
  actualizarAltMediaAdmin,
  listarMediaAdmin,
  prepararSubidaMedia,
  registrarMediaAdmin,
  subirArchivoMedia,
} from '../../services/admin';
import { recortarImagenWebp } from '../../utils/imagen';

function nombreArchivo(nombre) {
  return nombre.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]+/g, '-');
}

export default function MediaPage() {
  const [medios, setMedios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [preview, setPreview] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState(null);
  const [alt, setAlt] = useState('');
  const [subiendo, setSubiendo] = useState(false);
  const [altEdicion, setAltEdicion] = useState({});

  useEffect(() => {
    let activo = true;

    listarMediaAdmin()
      .then((datos) => {
        if (activo) {
          setMedios(datos);
          setError('');
        }
      })
      .catch(() => {
        if (activo) {
          setError('No se pudieron cargar los medios.');
        }
      })
      .finally(() => {
        if (activo) {
          setCargando(false);
        }
      });

    return () => {
      activo = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const seleccionarArchivo = (evento) => {
    const seleccionado = evento.target.files?.[0];

    if (!seleccionado) {
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(seleccionado.type)) {
      setError('Solo se permiten imágenes JPG, PNG o WebP.');
      return;
    }

    if (seleccionado.size > 5 * 1024 * 1024) {
      setError('La imagen no puede superar los 5 MB.');
      return;
    }

    setArchivo(seleccionado);
    setPreview(URL.createObjectURL(seleccionado));
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setArea(null);
    setAlt('');
    setError('');
  };

  const subirImagen = async (evento) => {
    evento.preventDefault();

    if (!archivo || !area || !alt.trim()) {
      setError('Elegí una imagen, recortala y completá el texto alternativo.');
      return;
    }

    setSubiendo(true);
    setError('');

    try {
      const blob = await recortarImagenWebp(archivo, area);
      const webp = new File([blob], `${nombreArchivo(archivo.name)}.webp`, {
        type: 'image/webp',
      });
      const preparacion = await prepararSubidaMedia({
        filename: webp.name,
        mime: webp.type,
        size: webp.size,
      });

      await subirArchivoMedia({
        file: webp,
        path: preparacion.path,
        token: preparacion.token,
      });

      await registrarMediaAdmin({
        path: preparacion.path,
        url: preparacion.url,
        alt: alt.trim(),
        mime: 'image/webp',
        width: 1200,
        height: 900,
        size_bytes: webp.size,
      });

      setArchivo(null);
      setPreview('');
      setArea(null);
      setAlt('');
      setMedios(await listarMediaAdmin());
    } catch {
      setError('No se pudo subir la imagen.');
    } finally {
      setSubiendo(false);
    }
  };

  const guardarAlt = async (medio) => {
    const nuevoAlt = (altEdicion[medio.id] ?? medio.alt).trim();

    if (!nuevoAlt) {
      setError('El texto alternativo no puede quedar vacío.');
      return;
    }

    try {
      const actualizado = await actualizarAltMediaAdmin(medio.id, nuevoAlt);
      setMedios((actuales) => actuales.map((item) => (item.id === medio.id ? actualizado : item)));
      setError('');
    } catch {
      setError('No se pudo actualizar el texto alternativo.');
    }
  };

  return (
    <div>
      <div className="max-w-2xl">
        <p className="font-cuerpo text-sm font-semibold uppercase tracking-[0.16em] text-contraste">
          Biblioteca
        </p>
        <h2 className="mt-2 font-titulos text-3xl font-semibold text-principal sm:text-4xl">
          Medios
        </h2>
        <p className="mt-3 font-cuerpo text-base leading-relaxed text-contraste">
          Subí imágenes, recortalas y reutilizalas en los productos.
        </p>
      </div>

      {error ? (
        <p role="alert" className="mt-5 font-cuerpo text-sm text-secundario">
          {error}
        </p>
      ) : null}

      <form
        onSubmit={subirImagen}
        className="mt-8 rounded-2xl border border-contraste/15 bg-blanco p-5"
      >
        <h3 className="font-titulos text-2xl font-semibold text-principal">Subir imagen</h3>

        <label
          htmlFor="media-archivo"
          className="mt-4 block font-cuerpo text-sm font-semibold text-principal"
        >
          Archivo
        </label>
        <input
          id="media-archivo"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={seleccionarArchivo}
          className="mt-2 block w-full font-cuerpo text-sm text-contraste file:mr-4 file:rounded-lg file:border-0 file:bg-principal file:px-4 file:py-2 file:font-cuerpo file:text-sm file:font-semibold file:text-blanco"
        />

        {preview ? (
          <div className="mt-5">
            <div className="relative h-64 overflow-hidden rounded-xl bg-fondo">
              <Cropper
                image={preview}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, areaRecortada) => setArea(areaRecortada)}
              />
            </div>

            <label
              htmlFor="media-zoom"
              className="mt-4 block font-cuerpo text-sm font-semibold text-principal"
            >
              Zoom
            </label>
            <input
              id="media-zoom"
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(evento) => setZoom(Number(evento.target.value))}
              className="mt-2 w-full accent-principal"
            />
          </div>
        ) : null}

        <label
          htmlFor="media-alt"
          className="mt-5 block font-cuerpo text-sm font-semibold text-principal"
        >
          Texto alternativo
        </label>
        <input
          id="media-alt"
          type="text"
          value={alt}
          onChange={(evento) => setAlt(evento.target.value)}
          placeholder="Describí la imagen"
          className="mt-2 min-h-11 w-full rounded-xl border border-contraste/20 bg-blanco px-4 font-cuerpo text-base text-principal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario"
        />

        <Boton type="submit" disabled={subiendo} className="mt-5">
          {subiendo ? 'Subiendo…' : 'Subir imagen'}
        </Boton>
      </form>

      <section className="mt-10">
        <h3 className="font-titulos text-2xl font-semibold text-principal">Imágenes cargadas</h3>

        {cargando ? (
          <p role="status" className="mt-4 font-cuerpo text-sm text-contraste">
            Cargando medios…
          </p>
        ) : null}

        {!cargando && medios.length === 0 ? (
          <p className="mt-4 font-cuerpo text-sm text-contraste">
            Todavía no hay imágenes cargadas.
          </p>
        ) : null}

        <ul className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {medios.map((medio) => (
            <li key={medio.id} className="rounded-2xl border border-contraste/15 bg-blanco p-4">
              <img
                src={medio.url}
                alt={medio.alt}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-xl object-cover"
              />
              <label
                htmlFor={`alt-${medio.id}`}
                className="mt-3 block font-cuerpo text-xs font-semibold uppercase tracking-[0.12em] text-contraste"
              >
                Texto alternativo
              </label>
              <input
                id={`alt-${medio.id}`}
                type="text"
                value={altEdicion[medio.id] ?? medio.alt}
                onChange={(evento) =>
                  setAltEdicion((actual) => ({
                    ...actual,
                    [medio.id]: evento.target.value,
                  }))
                }
                className="mt-2 min-h-10 w-full rounded-lg border border-contraste/20 px-3 font-cuerpo text-sm text-principal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario"
              />
              <button
                type="button"
                onClick={() => guardarAlt(medio)}
                className="mt-3 font-cuerpo text-sm font-semibold text-principal underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario"
              >
                Guardar alt
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
