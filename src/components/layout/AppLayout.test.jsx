import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import AppLayout from './AppLayout';

function renderizarLayout() {
  return render(
    <MemoryRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<p>Contenido de prueba</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe('AppLayout', () => {
  it('renderiza navbar, contenido y footer', () => {
    renderizarLayout();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveTextContent('Contenido de prueba');
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('no impone el contenedor global sobre el contenido', () => {
    renderizarLayout();

    const main = screen.getByRole('main');

    expect(main).not.toHaveClass('contenedor');
    expect(main).not.toHaveClass('py-16');
  });
});
