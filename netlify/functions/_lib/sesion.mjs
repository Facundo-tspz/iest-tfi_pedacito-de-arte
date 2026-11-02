import { createHmac, timingSafeEqual } from 'node:crypto';

export const COOKIE_SESION = 'admin_session';

function esProduccion() {
  return process.env.CONTEXT === 'production';
}

export function leerCookie(event, nombre) {
  const encabezado = event?.headers?.cookie ?? event?.headers?.Cookie ?? '';

  if (typeof encabezado !== 'string' || !encabezado) {
    return '';
  }

  const partes = encabezado.split(';').map((parte) => parte.trim());
  const encontrada = partes.find((parte) => parte.startsWith(`${nombre}=`));

  return encontrada ? encontrada.slice(nombre.length + 1) : '';
}

export function crearCookieSesion(valor, maxAge = 28800) {
  const secure = esProduccion() ? '; Secure' : '';

  return `${COOKIE_SESION}=${valor}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${secure}`;
}

export function crearCookieExpirada() {
  return crearCookieSesion('', 0);
}

function codificar(valor) {
  return Buffer.from(JSON.stringify(valor)).toString('base64url');
}

export function firmarSesion(payload, secreto) {
  const header = codificar({ alg: 'HS256', typ: 'JWT' });
  const body = codificar(payload);
  const contenido = `${header}.${body}`;
  const firma = createHmac('sha256', secreto).update(contenido).digest('base64url');

  return `${contenido}.${firma}`;
}

export function verificarSesion(token, secreto) {
  if (typeof token !== 'string' || typeof secreto !== 'string') {
    return null;
  }

  const partes = token.split('.');

  if (partes.length !== 3) {
    return null;
  }

  const [header, body, firma] = partes;
  const contenido = `${header}.${body}`;
  const esperada = createHmac('sha256', secreto).update(contenido).digest('base64url');
  const firmaBuffer = Buffer.from(firma);
  const esperadaBuffer = Buffer.from(esperada);

  if (
    firmaBuffer.length !== esperadaBuffer.length ||
    !timingSafeEqual(firmaBuffer, esperadaBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));

    if (!payload?.sub || !payload?.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
