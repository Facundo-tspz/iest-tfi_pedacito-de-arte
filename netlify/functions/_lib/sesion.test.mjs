import { describe, expect, it } from 'vitest';
import {
  crearCookieExpirada,
  crearCookieSesion,
  firmarSesion,
  leerCookie,
  verificarSesion,
} from './sesion.mjs';

describe('sesión administrativa', () => {
  const secreto = 'secreto-de-prueba';

  it('firma y verifica un token válido', () => {
    const token = firmarSesion(
      {
        sub: 'admin-1',
        rol: 'admin',
        sv: 1,
        exp: Math.floor(Date.now() / 1000) + 60,
      },
      secreto,
    );

    expect(verificarSesion(token, secreto)).toMatchObject({
      sub: 'admin-1',
      rol: 'admin',
      sv: 1,
    });
  });

  it('rechaza un token con otra firma o vencido', () => {
    const token = firmarSesion(
      {
        sub: 'admin-1',
        rol: 'admin',
        sv: 1,
        exp: Math.floor(Date.now() / 1000) + 60,
      },
      secreto,
    );
    const vencido = firmarSesion(
      {
        sub: 'admin-1',
        rol: 'admin',
        sv: 1,
        exp: Math.floor(Date.now() / 1000) - 1,
      },
      secreto,
    );

    expect(verificarSesion(token, 'otro-secreto')).toBeNull();
    expect(verificarSesion(vencido, secreto)).toBeNull();
  });

  it('lee la cookie de sesión', () => {
    const event = {
      headers: {
        cookie: 'otra=1; admin_session=token-de-prueba; final=2',
      },
    };

    expect(leerCookie(event, 'admin_session')).toBe('token-de-prueba');
  });

  it('crea la cookie y su versión expirada', () => {
    expect(crearCookieSesion('token', 3600)).toContain('admin_session=token');
    expect(crearCookieSesion('token', 3600)).toContain('HttpOnly');
    expect(crearCookieExpirada()).toContain('Max-Age=0');
  });
});
