export const FORMATOS_IMAGEN = {
  '4:3': {
    etiqueta: 'Catálogo (4:3)',
    aspecto: 4 / 3,
    ancho: 1200,
    alto: 900,
  },
  '16:9': {
    etiqueta: 'Hero (16:9)',
    aspecto: 16 / 9,
    ancho: 1920,
    alto: 1080,
  },
};

export async function recortarImagenWebp(
  archivo,
  area,
  { ancho = 1200, alto = 900, calidad = 0.85 } = {},
) {
  if (!(archivo instanceof Blob)) {
    throw new Error('Archivo de imagen inválido.');
  }

  if (!area) {
    throw new Error('Falta el área de recorte.');
  }

  const bitmap = await createImageBitmap(archivo);
  const canvas = document.createElement('canvas');
  canvas.width = ancho;
  canvas.height = alto;
  const contexto = canvas.getContext('2d');

  if (!contexto) {
    bitmap.close?.();
    throw new Error('No se pudo preparar el recorte.');
  }

  contexto.drawImage(bitmap, area.x, area.y, area.width, area.height, 0, 0, ancho, alto);
  bitmap.close?.();

  const blob = await new Promise((resolver) => canvas.toBlob(resolver, 'image/webp', calidad));

  if (!blob) {
    throw new Error('No se pudo convertir la imagen a WebP.');
  }

  return blob;
}
