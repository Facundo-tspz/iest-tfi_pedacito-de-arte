import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SkeletonCard from './SkeletonCard';

describe('SkeletonCard', () => {
  it('es decorativa y usa la animación de carga con movimiento reducido', () => {
    render(<SkeletonCard />);

    const skeleton = screen.getByTestId('skeleton-card');

    expect(skeleton).toHaveAttribute('aria-hidden', 'true');
    expect(skeleton).toHaveClass('animate-pulse');
    expect(skeleton).toHaveClass('motion-reduce:animate-none');
  });
});
