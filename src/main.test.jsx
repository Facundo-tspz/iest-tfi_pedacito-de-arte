import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('punto de entrada', () => {
  it('monta la aplicación dentro de HelmetProvider', async () => {
    document.body.innerHTML = '<div id="root"></div>';

    await import('./main');

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: 'Papelería creativa hecha con amor',
      }),
    ).toBeInTheDocument();
  }, 15000);
});
