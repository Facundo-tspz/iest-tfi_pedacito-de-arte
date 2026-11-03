function ordenarPorOrden(imagenes) {
  return [...imagenes].sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
}

function obtenerImagenes(producto) {
  return Array.isArray(producto?.imagenes) ? ordenarPorOrden(producto.imagenes) : [];
}

export function obtenerImagenHero(producto) {
  const imagenes = obtenerImagenes(producto);

  return imagenes.find((imagen) => imagen.es_hero) ?? imagenes[0] ?? null;
}

export function obtenerImagenPrincipal(producto) {
  const imagenes = obtenerImagenes(producto);

  return imagenes.find((imagen) => !imagen.es_hero) ?? imagenes[0] ?? null;
}

export function obtenerImagenesGaleria(producto) {
  return obtenerImagenes(producto).sort((a, b) => {
    const heroA = a.es_hero ? 1 : 0;
    const heroB = b.es_hero ? 1 : 0;

    if (heroA !== heroB) {
      return heroA - heroB;
    }

    return (a.orden ?? 0) - (b.orden ?? 0);
  });
}
