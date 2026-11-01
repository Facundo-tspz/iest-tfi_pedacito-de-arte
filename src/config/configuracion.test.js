import { describe, expect, it } from 'vitest';
import { crearConfiguracion, normalizarWhatsApp } from './configuracion';

const UBICACION = { origin: 'https://dev.pedacito.test' };

describe('configuracion', () => {
  it('normaliza el WhatsApp a solo dígitos', () => {
    const configuracion = crearConfiguracion(
      { VITE_WHATSAPP: ' +54 9 297-462-371 ' },
      UBICACION,
    );

    expect(configuracion.whatsapp).toBe('549297462371');
  });

  it('deja el WhatsApp vacío cuando falta', () => {
    const configuracion = crearConfiguracion({}, UBICACION);

    expect(configuracion.whatsapp).toBe('');
  });

  it('quita la barra final de la URL del sitio', () => {
    const configuracion = crearConfiguracion(
      { VITE_SITE_URL: 'https://pedacito.test/' },
      UBICACION,
    );

    expect(configuracion.urlSitio).toBe('https://pedacito.test');
  });

  it('usa el origen actual cuando falta la URL del sitio', () => {
    const configuracion = crearConfiguracion({}, UBICACION);

    expect(configuracion.urlSitio).toBe(UBICACION.origin);
  });

  it('usa un fallback local cuando no hay URL ni origen', () => {
    const configuracion = crearConfiguracion({}, null);

    expect(configuracion.urlSitio).toBe('http://localhost:5173');
  });

  it('usa el origen actual cuando la URL del sitio no es válida', () => {
    const configuracion = crearConfiguracion(
      { VITE_SITE_URL: 'no-es-una-url' },
      UBICACION,
    );

    expect(configuracion.urlSitio).toBe(UBICACION.origin);
  });

  it('limpia Instagram y email', () => {
    const configuracion = crearConfiguracion(
      {
        VITE_INSTAGRAM: '  @pedacito  ',
        VITE_EMAIL: '  hola@pedacito.test  ',
      },
      UBICACION,
    );

    expect(configuracion.instagram).toBe('@pedacito');
    expect(configuracion.email).toBe('hola@pedacito.test');
  });

  it('deja Instagram y email vacíos cuando faltan', () => {
    const configuracion = crearConfiguracion({}, UBICACION);

    expect(configuracion.instagram).toBe('');
    expect(configuracion.email).toBe('');
  });

  it('expone la normalización de WhatsApp por separado', () => {
    expect(normalizarWhatsApp('+54 (9) 297 462 371')).toBe('549297462371');
  });
});
