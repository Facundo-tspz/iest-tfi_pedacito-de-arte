import { normalizarTexto } from './texto';

const PREFIJO_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}-/i;

const ETIQUETAS_FORMATO = {
  hero: 'Hero (16:9)',
  catalogo: 'Catálogo (4:3)',
  otro: 'Otro formato',
};

export function nombreDesdePath(path) {
  if (typeof path !== 'string') {
    return '';
  }

  const archivo = path.split('/').pop() ?? '';
  const sinUuid = archivo.replace(PREFIJO_UUID, '');
  const sinExtension = sinUuid.replace(/\.[^.]+$/, '');

  return sinExtension.replace(/[-_]+/g, ' ').trim();
}

export function formatoMedio(medio) {
  const ancho = Number(medio?.width);
  const alto = Number(medio?.height);

  if (!Number.isFinite(ancho) || !Number.isFinite(alto) || alto <= 0) {
    return 'otro';
  }

  const relacion = ancho / alto;

  if (relacion > 1.6) {
    return 'hero';
  }

  if (relacion > 1.2 && relacion < 1.45) {
    return 'catalogo';
  }

  return 'otro';
}

export function etiquetaFormato(medio) {
  return ETIQUETAS_FORMATO[formatoMedio(medio)] ?? ETIQUETAS_FORMATO.otro;
}

export function filtrarMedios(
  medios,
  { buscar = '', formato = 'todos', soloSeleccionadas = false, seleccionadas = [] } = {},
) {
  const termino = normalizarTexto(buscar);
  const seleccionadasSet = new Set(seleccionadas);

  return (Array.isArray(medios) ? medios : []).filter((medio) => {
    const formatoActual = formatoMedio(medio);
    const coincideFormato = formato === 'todos' || formatoActual === formato;
    const coincideSeleccion = !soloSeleccionadas || seleccionadasSet.has(medio.path);
    const contenido = [
      medio.alt,
      medio.path,
      nombreDesdePath(medio.path),
      ETIQUETAS_FORMATO[formatoActual],
    ]
      .map(normalizarTexto)
      .join(' ');

    return coincideFormato && coincideSeleccion && (!termino || contenido.includes(termino));
  });
}

export function ordenarMedios(medios, orden = 'recientes') {
  const copia = Array.isArray(medios) ? [...medios] : [];

  if (orden === 'nombre') {
    return copia.sort((a, b) =>
      nombreDesdePath(a.path).localeCompare(nombreDesdePath(b.path), 'es', {
        sensitivity: 'base',
      }),
    );
  }

  return copia.sort(
    (a, b) => new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime(),
  );
}

export function priorizarSeleccionados(medios, seleccionadas = []) {
  const seleccionadasSet = new Set(seleccionadas);

  return [...medios].sort(
    (a, b) => Number(!seleccionadasSet.has(a.path)) - Number(!seleccionadasSet.has(b.path)),
  );
}
