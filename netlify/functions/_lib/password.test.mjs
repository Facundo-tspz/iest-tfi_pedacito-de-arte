import { randomBytes, scryptSync } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { verificarPassword } from './password.mjs';

function crearHash(password) {
  const sal = randomBytes(16).toString('hex');
  const hash = scryptSync(password, sal, 64, {
    N: 16384,
    r: 8,
    p: 1,
  }).toString('hex');

  return `scrypt$16384$8$1$${sal}$${hash}`;
}

describe('verificación de contraseña', () => {
  it('acepta la contraseña correcta y rechaza la incorrecta', () => {
    const hash = crearHash('clave-segura');

    expect(verificarPassword('clave-segura', hash)).toBe(true);
    expect(verificarPassword('otra-clave', hash)).toBe(false);
  });

  it('rechaza hashes inválidos', () => {
    expect(verificarPassword('clave', 'texto')).toBe(false);
    expect(verificarPassword('', crearHash('clave'))).toBe(false);
  });
});
