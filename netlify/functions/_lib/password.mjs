import { scryptSync, timingSafeEqual } from 'node:crypto';

export function verificarPassword(password, hashGuardado) {
  if (typeof password !== 'string' || typeof hashGuardado !== 'string') {
    return false;
  }

  const partes = hashGuardado.split('$');

  if (partes.length !== 6 || partes[0] !== 'scrypt') {
    return false;
  }

  const [, n, r, p, sal, hash] = partes;
  const parametros = {
    N: Number(n),
    r: Number(r),
    p: Number(p),
  };

  if (
    !Number.isInteger(parametros.N) ||
    !Number.isInteger(parametros.r) ||
    !Number.isInteger(parametros.p)
  ) {
    return false;
  }

  try {
    const esperado = Buffer.from(hash, 'hex');
    const calculado = scryptSync(password, sal, esperado.length, parametros);

    return esperado.length === calculado.length && timingSafeEqual(esperado, calculado);
  } catch {
    return false;
  }
}
