import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useLocation } from 'react-router-dom';
import useMovimientoReducido from './useMovimientoReducido';
import useScrollToHash from './useScrollToHash';

vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
}));

vi.mock('./useMovimientoReducido', () => ({
  default: vi.fn(),
}));

const scrollToOriginal = window.scrollTo;
const requestAnimationFrameOriginal = window.requestAnimationFrame;
const cancelAnimationFrameOriginal = window.cancelAnimationFrame;

function crearSeccion(id, top) {
  const seccion = document.createElement('section');
  seccion.id = id;
  seccion.getBoundingClientRect = vi.fn(() => ({ top }));
  document.body.appendChild(seccion);
}

describe('useScrollToHash', () => {
  beforeEach(() => {
    useLocation.mockReturnValue({ hash: '#nosotros' });
    useMovimientoReducido.mockReturnValue(false);
    window.scrollY = 0;
    window.scrollTo = vi.fn();
    window.requestAnimationFrame = vi.fn((callback) => {
      callback();
      return 1;
    });
    window.cancelAnimationFrame = vi.fn();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    window.scrollTo = scrollToOriginal;
    window.requestAnimationFrame = requestAnimationFrameOriginal;
    window.cancelAnimationFrame = cancelAnimationFrameOriginal;
    vi.resetAllMocks();
  });

  it('desplaza a la sección con el offset del navbar', () => {
    crearSeccion('nosotros', 500);

    renderHook(() => useScrollToHash());

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 404,
      behavior: 'smooth',
    });
  });

  it('permite configurar el offset', () => {
    crearSeccion('nosotros', 500);

    renderHook(() => useScrollToHash(120));

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 380,
      behavior: 'smooth',
    });
  });

  it('no desplaza por encima del inicio del documento', () => {
    crearSeccion('nosotros', 40);

    renderHook(() => useScrollToHash());

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('usa scroll instantáneo con movimiento reducido', () => {
    useMovimientoReducido.mockReturnValue(true);
    crearSeccion('nosotros', 500);

    renderHook(() => useScrollToHash());

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 404,
      behavior: 'auto',
    });
  });

  it('no hace scroll cuando no hay hash', () => {
    useLocation.mockReturnValue({ hash: '' });

    renderHook(() => useScrollToHash());

    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('no hace scroll cuando la sección no existe', () => {
    useLocation.mockReturnValue({ hash: '#no-existe' });

    renderHook(() => useScrollToHash());

    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('vuelve a desplazar cuando cambia el hash', () => {
    crearSeccion('nosotros', 500);

    const { rerender } = renderHook(() => useScrollToHash());

    useLocation.mockReturnValue({ hash: '#servicios' });
    crearSeccion('servicios', 800);

    rerender();

    expect(window.scrollTo).toHaveBeenLastCalledWith({
      top: 704,
      behavior: 'smooth',
    });
  });

  it('cancela la animación pendiente al desmontar', () => {
    crearSeccion('nosotros', 500);

    const { unmount } = renderHook(() => useScrollToHash());

    unmount();

    expect(window.cancelAnimationFrame).toHaveBeenCalledWith(1);
  });
});
