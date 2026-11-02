import { Helmet } from 'react-helmet-async';
import configuracion from '../../config/configuracion';

const IMAGEN_POR_DEFECTO = '/marca/logo-icono.png';

function construirUrl(valor, base) {
  try {
    return new URL(valor || '/', base).href;
  } catch {
    return base;
  }
}

export default function SEO({
  titulo = 'Pedacito de Arte',
  descripcion = '',
  imagen = IMAGEN_POR_DEFECTO,
  url = '/',
  tipo = 'website',
}) {
  const urlCanonica = construirUrl(url, configuracion.urlSitio);
  const urlImagen = construirUrl(imagen, configuracion.urlSitio);

  return (
    <Helmet>
      <title>{titulo}</title>
      <meta name="description" content={descripcion} />
      <link rel="canonical" href={urlCanonica} />

      <meta property="og:type" content={tipo} />
      <meta property="og:title" content={titulo} />
      <meta property="og:description" content={descripcion} />
      <meta property="og:image" content={urlImagen} />
      <meta property="og:url" content={urlCanonica} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={titulo} />
      <meta name="twitter:description" content={descripcion} />
      <meta name="twitter:image" content={urlImagen} />
    </Helmet>
  );
}
