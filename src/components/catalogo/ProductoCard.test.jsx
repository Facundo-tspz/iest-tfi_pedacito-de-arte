import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ProductoCard from './ProductoCard';

const PRODUCTO = {
  id: 'prod-agenda-botanica',
  nombre: 'Agenda Botánica',
  slug: 'agenda-botanica',
  categoria: { nombre: 'Agendas' },
  descripcion: 'Agenda artesanal con tapa ilustrada y hojas para organizar tus días.',
  precio_base: null,
  imagenes: [
    {
      url: null,
      alt: 'Agenda Botánica con tapa floral vista desde arriba',
    },
  ],
};

function renderizarCard(producto = PRODUCTO) {
  return render(
    <MemoryRouter>
      <ProductoCard producto={producto} />
    </MemoryRouter>,
  );
}

describe('ProductoCard', () => {
  it('muestra imagen, categoría, nombre, descripción y precio a confirmar', () => {
    renderizarCard();

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByText('Agendas')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Agenda Botánica' })).toBeInTheDocument();
    expect(
      screen.getByText('Agenda artesanal con tapa ilustrada y hojas para organizar tus días.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Precio a confirmar')).toBeInTheDocument();
    expect(screen.queryByText(/\$\s?0/)).not.toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/catalogo/agenda-botanica');
    expect(
      screen.getByRole('img', {
        name: 'Agenda Botánica con tapa floral vista desde arriba',
      }),
    ).toBeInTheDocument();
  });

  it('formatea el precio y usa la imagen real cuando existe', () => {
    renderizarCard({
      ...PRODUCTO,
      precio_base: 15000,
      imagenes: [
        {
          url: 'https://cdn.test/agenda-botanica.webp',
          alt: 'Agenda Botánica abierta sobre una mesa',
        },
      ],
    });

    expect(screen.getByText(/15\.000/)).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Agenda Botánica abierta sobre una mesa' }),
    ).toHaveAttribute('src', 'https://cdn.test/agenda-botanica.webp');
  });

  it('no usa la imagen del hero en la tarjeta del catálogo', () => {
    renderizarCard({
      ...PRODUCTO,
      imagenes: [
        {
          url: 'https://cdn.test/hero.webp',
          alt: 'Agenda Botánica sobre mesa de taller',
          orden: 1,
          es_hero: true,
        },
        {
          url: 'https://cdn.test/catalogo.webp',
          alt: 'Agenda Botánica cerrada para catálogo',
          orden: 2,
          es_hero: false,
        },
      ],
    });

    expect(
      screen.getByRole('img', { name: 'Agenda Botánica cerrada para catálogo' }),
    ).toHaveAttribute('src', 'https://cdn.test/catalogo.webp');
  });

  it('muestra el placeholder si el producto solo tiene imagen de hero', () => {
    renderizarCard({
      ...PRODUCTO,
      imagenes: [
        {
          url: 'https://cdn.test/hero.webp',
          alt: 'Agenda Botánica sobre mesa de taller',
          orden: 1,
          es_hero: true,
        },
      ],
    });

    expect(screen.getByText('Foto próximamente')).toBeInTheDocument();
    expect(
      screen.queryByRole('img', { name: 'Agenda Botánica sobre mesa de taller' }),
    ).not.toBeInTheDocument();
  });
});
