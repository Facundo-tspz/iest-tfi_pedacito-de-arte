import { describe, expect, it } from 'vitest';
import { FORMATOS_IMAGEN } from './imagen';

describe('formatos de imagen', () => {
  it('define catálogo en 4:3 y 1200 x 900', () => {
    expect(FORMATOS_IMAGEN['4:3']).toMatchObject({
      aspecto: 4 / 3,
      ancho: 1200,
      alto: 900,
    });
  });

  it('define hero en 16:9 y 1920 x 1080', () => {
    expect(FORMATOS_IMAGEN['16:9']).toMatchObject({
      aspecto: 16 / 9,
      ancho: 1920,
      alto: 1080,
    });
  });
});
