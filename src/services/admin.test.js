import { afterEach, describe, expect, it, vi } from 'vitest';
import { cerrarSesionAdmin, iniciarSesionAdmin, obtenerSesionAdmin } from './admin';

function respuesta({ ok = true, status = 200, body = {} } = {}) {
  return {
    ok,
    status,
    json: vi.fn().mockResolvedValue(body),
  };
}

describe('servicio admin', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('envía usuario y contraseña al login', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(respuesta({ body: { usuario: 'Facundo', rol: 'admin' } }));
    vi.stubGlobal('fetch', fetchMock);

    const datos = await iniciarSesionAdmin('Facundo', 'clave');

    expect(datos).toEqual({ usuario: 'Facundo', rol: 'admin' });
    expect(fetchMock).toHaveBeenCalledWith(
      '/.netlify/functions/admin-login',
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ usuario: 'Facundo', password: 'clave' }),
      }),
    );
  });

  it('devuelve null cuando no hay sesión', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(respuesta({ ok: false, status: 401, body: { error: 'Sin sesión' } })),
    );

    await expect(obtenerSesionAdmin()).resolves.toBeNull();
  });

  it('cierra la sesión', async () => {
    const fetchMock = vi.fn().mockResolvedValue(respuesta({ body: { ok: true } }));
    vi.stubGlobal('fetch', fetchMock);

    await cerrarSesionAdmin();

    expect(fetchMock).toHaveBeenCalledWith(
      '/.netlify/functions/admin-logout',
      expect.objectContaining({ method: 'POST', credentials: 'include' }),
    );
  });
});
