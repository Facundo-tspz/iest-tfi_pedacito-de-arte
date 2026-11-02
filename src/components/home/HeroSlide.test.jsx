import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import HeroSlide from './HeroSlide';

const PRODUCTO = {
  id: 'prod-1',
  nombre: 'Agenda Botánica',
  slug: 'agenda-botanica',
  categoria: { nombre: 'Agendas' },
  descripcion: 'Agenda artesanal con tapa ilustrada y hojas para organizar tus días.',
  precio_base: 15000,
  imagenes: [
    {
      url: null,
      alt: 'Agenda Botánica con tapa floral vista desde arriba',
    },
  ],
};

function renderizarSlide({ activo = true, posicion = 0, total = 4 } = {}) {
  return render(
    <MemoryRouter>
      <HeroSlide producto={PRODUCTO} activo={activo} posicion={posicion} total={total} />
    </MemoryRouter>,
  );
}

describe('HeroSlide', () => {
  it('muestra categoría, nombre, descripción, precio y CTA', () => {
    renderizarSlide();

    const slide = screen.getByRole('group', { name: '1 de 4' });

    expect(within(slide).getByText('Agendas')).toBeInTheDocument();
    expect(
      within(slide).getByRole('heading', { level: 2, name: 'Agenda Botánica' }),
    ).toBeInTheDocument();
    expect(
      within(slide).getByText(
        'Agenda artesanal con tapa ilustrada y hojas para organizar tus días.',
      ),
    ).toBeInTheDocument();
    expect(within(slide).getByText(/15\.000/)).toBeInTheDocument();
    expect(within(slide).getByRole('link', { name: 'Ver producto' })).toHaveAttribute(
      'href',
      '/producto/agenda-botanica',
    );
    expect(
      within(slide).getByRole('img', {
        name: 'Agenda Botánica con tapa floral vista desde arriba',
      }),
    ).toBeInTheDocument();
  });

  it('oculta el slide inactivo y saca su CTA del orden de tabulación', () => {
    const { container } = renderizarSlide({ activo: false, posicion: 1 });

    const slide = container.querySelector('article');
    const enlace = container.querySelector('a');

    expect(slide).toHaveAttribute('aria-hidden', 'true');
    expect(enlace).toHaveAttribute('tabindex', '-1');
  });

  it('usa una imagen real cuando el producto tiene URL', () => {
    const productoConImagen = {
      ...PRODUCTO,
      imagenes: [
        {
          url: 'https://cdn.test/agenda.webp',
          alt: 'Agenda Botánica abierta sobre una mesa',
        },
      ],
    };

    render(
      <MemoryRouter>
        <HeroSlide producto={productoConImagen} activo posicion={0} total={4} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('img', { name: 'Agenda Botánica abierta sobre una mesa' }),
    ).toHaveAttribute('src', 'https://cdn.test/agenda.webp');
  });
});
