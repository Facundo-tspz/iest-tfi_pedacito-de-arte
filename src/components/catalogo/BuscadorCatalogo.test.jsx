import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import BuscadorCatalogo from './BuscadorCatalogo';

function MostrarRuta() {
  const ubicacion = useLocation();

  return <span data-testid="ruta">{`${ubicacion.pathname}${ubicacion.search}`}</span>;
}

function renderizarBuscador(ruta = '/catalogo', cantidadResultados = 3) {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <BuscadorCatalogo cantidadResultados={cantidadResultados} />
      <MostrarRuta />
    </MemoryRouter>,
  );
}

describe('BuscadorCatalogo', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('tiene etiqueta, valor inicial y contador de resultados', () => {
    renderizarBuscador('/catalogo?buscar=agenda');

    expect(screen.getByLabelText('Buscar en el catálogo')).toHaveValue('agenda');
    expect(screen.getByRole('status')).toHaveTextContent('3 resultados');
  });

  it('actualiza la URL después de 300 ms y conserva la categoría', () => {
    renderizarBuscador('/catalogo?categoria=agendas');

    fireEvent.change(screen.getByLabelText('Buscar en el catálogo'), {
      target: { value: 'botanica' },
    });

    act(() => {
      vi.advanceTimersByTime(299);
    });

    expect(screen.getByTestId('ruta')).toHaveTextContent('/catalogo?categoria=agendas');

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(screen.getByTestId('ruta')).toHaveTextContent(
      '/catalogo?categoria=agendas&buscar=botanica',
    );
  });

  it('limpia el texto y la búsqueda de la URL después del debounce', () => {
    renderizarBuscador('/catalogo?categoria=agendas&buscar=agenda');

    fireEvent.click(screen.getByRole('button', { name: 'Limpiar búsqueda' }));

    expect(screen.getByLabelText('Buscar en el catálogo')).toHaveValue('');

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByTestId('ruta')).toHaveTextContent('/catalogo?categoria=agendas');
  });

  it('singulariza el contador cuando hay un solo resultado', () => {
    renderizarBuscador('/catalogo', 1);

    expect(screen.getByRole('status')).toHaveTextContent('1 resultado');
  });
});
