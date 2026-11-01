import { describe, expect, it } from 'vitest';
import { construirMensajeWhatsApp, crearUrlWhatsApp } from './whatsapp';

const PRODUCTO = { nombre: 'Agenda Botánica', codigo: 'AG-001' };
const OPCIONES = [
  { tipo_opcion: 'Interior', valor: 'Punteado' },
  { tipo_opcion: 'Tamaño', valor: 'A4' },
];

describe('construirMensajeWhatsApp', () => {
  it('incluye producto, opciones, notas y URL', () => {
    const mensaje = construirMensajeWhatsApp({
      producto: PRODUCTO,
      opciones: OPCIONES,
      notas: '  Quiero tapa floral  ',
      url: 'https://pedacito.test/catalogo/agenda-botanica',
    });

    expect(mensaje).toContain('Producto: Agenda Botánica (AG-001)');
    expect(mensaje).toContain('Opciones: Interior: Punteado | Tamaño: A4');
    expect(mensaje).toContain('Notas: Quiero tapa floral');
    expect(mensaje).toContain('URL: https://pedacito.test/catalogo/agenda-botanica');
  });

  it('usa Sin preferencia cuando no hay opciones', () => {
    const mensaje = construirMensajeWhatsApp({ producto: PRODUCTO });

    expect(mensaje).toContain('Opciones: Sin preferencia');
  });

  it('usa Sin notas cuando el campo está vacío', () => {
    const mensaje = construirMensajeWhatsApp({ producto: PRODUCTO, notas: '   ' });

    expect(mensaje).toContain('Notas: Sin notas');
  });

  it('limita las notas a 500 caracteres', () => {
    const mensaje = construirMensajeWhatsApp({
      producto: PRODUCTO,
      notas: 'x'.repeat(600),
    });

    expect(mensaje).toContain(`Notas: ${'x'.repeat(500)}`);
    expect(mensaje).not.toContain('x'.repeat(501));
  });

  it('omite la URL cuando no se recibe', () => {
    const mensaje = construirMensajeWhatsApp({ producto: PRODUCTO });

    expect(mensaje).not.toContain('URL:');
  });
});

describe('crearUrlWhatsApp', () => {
  it('normaliza el número y codifica el mensaje', () => {
    const mensaje = 'Hola & <b>mundo</b> #1';
    const url = crearUrlWhatsApp('+54 9 297 462 371', mensaje);

    expect(url).toMatch(/^https:\/\/wa\.me\/549297462371\?text=/);
    expect(decodeURIComponent(url.split('?text=')[1])).toBe(mensaje);
  });

  it('devuelve una URL vacía cuando falta el número', () => {
    expect(crearUrlWhatsApp('', 'Hola')).toBe('');
  });

  it('devuelve una URL vacía cuando falta el mensaje', () => {
    expect(crearUrlWhatsApp('549297462371', '')).toBe('');
  });
});
