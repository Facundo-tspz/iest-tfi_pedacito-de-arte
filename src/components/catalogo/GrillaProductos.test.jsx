import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import GrillaProductos from './GrillaProductos';

const PRODUCTOS = [
  {
    id: 'prod-1',
    nombre: 'Agenda Botánica',
    slug: 'agenda-botanica',
    categoria: { nombre: 'Agendas' },
    descripcion: 'Agenda artesanal con tapa ilustrada.',
    precio_base: null,
    imagenes: [{ url: null, alt: 'Agenda Botánica' }],
  },
  {
    id: 'prod-2',
    nombre: 'Anotador de Cocina',
    slug: 'anotador-de-cocina',
    categoria: { nombre: 'Anotadores' },
    descripcion: 'Anotador para recetas y listas.',
    precio_base: 9000,
    imagenes: [{ url: null, alt: 'Anotador de Cocina' }],
  },
];

function renderizarGrilla(productos = PRODUCTOS) {
  return render(
    <MemoryRouter>
      <GrillaProductos productos={productos} />
    </MemoryRouter>,
  );
}

describe('GrillaProductos', () => {
  it('renderiza una tarjeta por producto con enlaces al detalle', () => {
    renderizarGrilla();

    expect(screen.getAllByRole('article')).toHaveLength(2);
    expect(screen.getByRole('link', { name: /Agenda Botánica/ })).toHaveAttribute(
      'href',
      '/catalogo/agenda-botanica',
    );
    expect(screen.getByRole('link', { name: /Anotador de Cocina/ })).toHaveAttribute(
      'href',
      '/catalogo/anotador-de-cocina',
    );
  });

  it('usa una grilla de 1, 2, 3 y 4 columnas según el ancho', () => {
    const { container } = renderizarGrilla();
    const grilla = container.querySelector('ul');

    expect(grilla).toHaveClass('grid-cols-1');
    expect(grilla).toHaveClass('sm:grid-cols-2');
    expect(grilla).toHaveClass('lg:grid-cols-3');
    expect(grilla).toHaveClass('xl:grid-cols-4');
  });

  it('no renderiza tarjetas si no hay productos', () => {
    renderizarGrilla([]);

    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });
});
