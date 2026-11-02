import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { iniciarSesionAdmin } from '../../services/admin';
import LoginPage from './LoginPage';

vi.mock('../../services/admin', () => ({
  iniciarSesionAdmin: vi.fn(),
}));

function renderizarLogin() {
  return render(
    <MemoryRouter initialEntries={['/estudio/login']}>
      <Routes>
        <Route path="/estudio/login" element={<LoginPage />} />
        <Route path="/estudio" element={<p>Dashboard de prueba</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('LoginPage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('inicia sesión y navega al panel', async () => {
    const usuario = userEvent.setup();
    iniciarSesionAdmin.mockResolvedValue({ usuario: 'Facundo', rol: 'admin' });

    renderizarLogin();

    await usuario.type(screen.getByLabelText('Usuario'), 'Facundo');
    await usuario.type(screen.getByLabelText('Contraseña'), 'clave');
    await usuario.click(screen.getByRole('button', { name: 'Ingresar' }));

    expect(iniciarSesionAdmin).toHaveBeenCalledWith('Facundo', 'clave');
    expect(await screen.findByText('Dashboard de prueba')).toBeInTheDocument();
  });

  it('muestra un error si las credenciales fallan', async () => {
    const usuario = userEvent.setup();
    iniciarSesionAdmin.mockRejectedValue(new Error('401'));

    renderizarLogin();

    await usuario.type(screen.getByLabelText('Usuario'), 'Facundo');
    await usuario.type(screen.getByLabelText('Contraseña'), 'incorrecta');
    await usuario.click(screen.getByRole('button', { name: 'Ingresar' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Usuario o contraseña incorrectos.');
  });
});
