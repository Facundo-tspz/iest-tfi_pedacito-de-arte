import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import GaleriaProducto from './GaleriaProducto';

const PRODUCTO = {
  slug: 'agenda-botanica',
  nombre: 'Agenda Botánica',
  imagenes: [
    {
      id: 'img-1',
      url: null,
      alt: 'Agenda Botánica con tapa floral',
      orden: 1,
    },
    {
      id: 'img-2',
      url: 'https://cdn.test/agenda-interior.webp',
      alt: 'Interior de la Agenda Botánica',
      orden: 2,
    },
  ],
};

describe('GaleriaProducto', () => {
  it('muestra la primera imagen y cambia la principal al elegir una miniatura', async () => {
    const usuario = userEvent.setup();
    render(<GaleriaProducto producto={PRODUCTO} />);

    expect(
      screen.getByRole('img', { name: 'Agenda Botánica con tapa floral' }),
    ).toBeInTheDocument();

    const botones = screen.getAllByRole('button');

    expect(botones).toHaveLength(2);
    expect(botones[0]).toHaveAttribute('aria-pressed', 'true');
    expect(botones[1]).toHaveAttribute('aria-pressed', 'false');

    await usuario.click(botones[1]);

    expect(screen.getByRole('img', { name: 'Interior de la Agenda Botánica' })).toHaveAttribute(
      'src',
      'https://cdn.test/agenda-interior.webp',
    );
    expect(botones[0]).toHaveAttribute('aria-pressed', 'false');
    expect(botones[1]).toHaveAttribute('aria-pressed', 'true');
  });

  it('permite cambiar de imagen con las flechas del teclado', async () => {
    const usuario = userEvent.setup();
    render(<GaleriaProducto producto={PRODUCTO} />);

    const [primero, segundo] = screen.getAllByRole('button');

    primero.focus();
    expect(primero).toHaveFocus();

    await usuario.keyboard('{ArrowRight}');

    expect(segundo).toHaveFocus();
    expect(segundo).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('img', { name: 'Interior de la Agenda Botánica' })).toBeInTheDocument();

    await usuario.keyboard('{ArrowLeft}');

    expect(primero).toHaveFocus();
    expect(primero).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.getByRole('img', { name: 'Agenda Botánica con tapa floral' }),
    ).toBeInTheDocument();
  });

  it('deja la imagen de hero al final y muestra primero la de catálogo', () => {
    render(
      <GaleriaProducto
        producto={{
          slug: 'agenda-con-hero',
          nombre: 'Agenda con hero',
          imagenes: [
            {
              id: 'hero',
              url: 'https://cdn.test/hero.webp',
              alt: 'Agenda sobre mesa de taller',
              orden: 1,
              es_hero: true,
            },
            {
              id: 'catalogo',
              url: 'https://cdn.test/catalogo.webp',
              alt: 'Agenda cerrada para catálogo',
              orden: 2,
              es_hero: false,
            },
          ],
        }}
      />,
    );

    expect(screen.getByRole('img', { name: 'Agenda cerrada para catálogo' })).toBeInTheDocument();

    const botones = screen.getAllByRole('button');

    expect(botones).toHaveLength(2);
    expect(botones[1]).toHaveAttribute(
      'aria-label',
      'Mostrar imagen 2: Agenda sobre mesa de taller',
    );
  });

  it('usa un placeholder y no muestra miniaturas si no hay imágenes', () => {
    render(
      <GaleriaProducto
        producto={{
          slug: 'agenda-sin-fotos',
          nombre: 'Agenda sin fotos',
          imagenes: [],
        }}
      />,
    );

    expect(screen.getByRole('img', { name: 'Imagen de Agenda sin fotos' })).toBeInTheDocument();
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });
});
