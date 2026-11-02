import { useRef, useState } from 'react';
import PlaceholderImagen from '../ui/PlaceholderImagen';

function obtenerImagenes(producto) {
  return Array.isArray(producto?.imagenes)
    ? [...producto.imagenes].sort((a, b) => a.orden - b.orden)
    : [];
}

function ImagenPrincipal({ producto, imagen }) {
  const alt = imagen?.alt || `Imagen de ${producto.nombre}`;

  if (imagen?.url) {
    return (
      <img
        src={imagen.url}
        alt={alt}
        loading="eager"
        decoding="async"
        className="aspect-square w-full object-cover"
      />
    );
  }

  return (
    <PlaceholderImagen
      alt={alt}
      aspecto="cuadrado"
      texto="Foto próximamente"
      className="rounded-none border-0"
    />
  );
}

function Miniatura({ producto, imagen, indice, activa, onSeleccionar, onTeclado, botonRef }) {
  const alt = imagen?.alt || `Imagen de ${producto.nombre}`;

  return (
    <button
      ref={botonRef}
      type="button"
      aria-label={`Mostrar imagen ${indice + 1}: ${alt}`}
      aria-pressed={activa}
      onClick={() => onSeleccionar(indice)}
      onKeyDown={(evento) => onTeclado(evento, indice)}
      className={`h-20 w-20 overflow-hidden rounded-xl border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-fondo ${
        activa
          ? 'border-complementario-secundario'
          : 'border-contraste/15 hover:border-complementario-secundario'
      }`}
    >
      {imagen?.url ? (
        <img
          src={imagen.url}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      ) : (
        <PlaceholderImagen
          alt=""
          aspecto="cuadrado"
          texto=""
          className="h-full w-full rounded-none border-0"
        />
      )}
    </button>
  );
}

export default function GaleriaProducto({ producto }) {
  const imagenes = obtenerImagenes(producto);
  const [indiceActivo, setIndiceActivo] = useState(0);
  const botonesRef = useRef([]);
  const indiceSeguro = imagenes.length > 0 ? Math.min(indiceActivo, imagenes.length - 1) : 0;
  const imagenActiva = imagenes[indiceSeguro];

  const seleccionar = (indice, enfocar = false) => {
    setIndiceActivo(indice);

    if (enfocar) {
      botonesRef.current[indice]?.focus();
    }
  };

  const manejarTeclado = (evento, indice) => {
    if (imagenes.length <= 1) {
      return;
    }

    let destino = null;

    if (evento.key === 'ArrowRight' || evento.key === 'ArrowDown') {
      destino = (indice + 1) % imagenes.length;
    }

    if (evento.key === 'ArrowLeft' || evento.key === 'ArrowUp') {
      destino = (indice - 1 + imagenes.length) % imagenes.length;
    }

    if (evento.key === 'Home') {
      destino = 0;
    }

    if (evento.key === 'End') {
      destino = imagenes.length - 1;
    }

    if (destino === null) {
      return;
    }

    evento.preventDefault();
    seleccionar(destino, true);
  };

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-contraste/15 bg-blanco/60">
        <ImagenPrincipal producto={producto} imagen={imagenActiva} />
      </div>

      {imagenes.length > 1 ? (
        <div
          role="group"
          aria-label="Miniaturas de imágenes del producto"
          className="mt-4 flex flex-wrap gap-3"
        >
          {imagenes.map((imagen, indice) => (
            <Miniatura
              key={imagen.id ?? `${producto.slug}-${indice}`}
              producto={producto}
              imagen={imagen}
              indice={indice}
              activa={indice === indiceSeguro}
              onSeleccionar={seleccionar}
              onTeclado={manejarTeclado}
              botonRef={(elemento) => {
                botonesRef.current[indice] = elemento;
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
