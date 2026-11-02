import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import configuracion from '../../config/configuracion';
import CtaWhatsApp from './CtaWhatsApp';

const PRODUCTO = {
  nombre: 'Agenda Botánica',
  codigo: 'AG-001',
  slug: 'agenda-botanica',
};

const OPCIONES = [
  { tipo_opcion: 'Interior', valor: 'Rayado' },
  { tipo_opcion: 'Tamaño', valor: 'A4' },
];

const URL_ORIGINAL = configuracion.urlSitio;

describe('CtaWhatsApp', () => {
  beforeEach(() => {
    configuracion.whatsapp = '549297462371';
    configuracion.urlSitio = 'https://pedacito.test';
  });

  afterEach(() => {
    configuracion.whatsapp = '';
    configuracion.urlSitio = URL_ORIGINAL;
  });

  it('genera el enlace con producto, opciones, notas y URL', () => {
    render(<CtaWhatsApp producto={PRODUCTO} opciones={OPCIONES} notas="Para regalo" />);

    const enlace = screen.getByRole('link', {
      name: 'Consultar por WhatsApp',
    });
    const url = new URL(enlace.getAttribute('href'));
    const texto = url.searchParams.get('text');

    expect(url.origin).toBe('https://wa.me');
    expect(url.pathname).toBe('/549297462371');
    expect(texto).toContain('Producto: Agenda Botánica (AG-001)');
    expect(texto).toContain('Opciones: Interior: Rayado | Tamaño: A4');
    expect(texto).toContain('Notas: Para regalo');
    expect(texto).toContain('URL: https://pedacito.test/catalogo/agenda-botanica');
    expect(enlace).toHaveAttribute('target', '_blank');
    expect(enlace).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('usa Sin preferencia y Sin notas cuando faltan datos', () => {
    render(<CtaWhatsApp producto={PRODUCTO} />);

    const enlace = screen.getByRole('link', {
      name: 'Consultar por WhatsApp',
    });
    const texto = new URL(enlace.getAttribute('href')).searchParams.get('text');

    expect(texto).toContain('Opciones: Sin preferencia');
    expect(texto).toContain('Notas: Sin notas');
  });

  it('mantiene Agregar al encargo deshabilitado con su aviso', () => {
    render(<CtaWhatsApp producto={PRODUCTO} />);

    expect(screen.getByRole('button', { name: 'Agregar al encargo' })).toBeDisabled();
    expect(screen.getByText('Disponible en la próxima etapa.')).toBeInTheDocument();
  });

  it('deshabilita la consulta si falta el número de WhatsApp', () => {
    configuracion.whatsapp = '';
    render(<CtaWhatsApp producto={PRODUCTO} />);

    expect(screen.getByRole('button', { name: 'Consultar por WhatsApp' })).toBeDisabled();
    expect(screen.queryByRole('link', { name: 'Consultar por WhatsApp' })).not.toBeInTheDocument();
  });
});
