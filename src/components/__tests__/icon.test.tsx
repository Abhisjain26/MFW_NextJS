import { render, screen } from '@testing-library/react';
import { Icon } from '../icon';

describe('Icon Component', () => {
  it('Should successfully render icon component', () => {
    render(<Icon name="cart" data-testid="icon" />);

    const icon = screen.getByTestId('icon');

    expect(icon).toHaveAttribute('height', '18');
    expect(icon).toHaveAttribute('viewBox', '0 0 18 18');
    expect(icon.querySelector('use')).toHaveAttribute(
      'xlink:href',
      '/icon-sprite.svg#cart'
    );
  });

  it('Can change the size', () => {
    const size = 33;

    render(<Icon name="cart" size={size} data-testid="icon" />);

    const icon = screen.getByTestId('icon');

    expect(icon).toHaveAttribute('height', String(size));
    expect(icon).toHaveAttribute('viewBox', `0 0 ${size} ${size}`);
  });

  it('Can change the color', async () => {
    render(<Icon name="cart" className="fill-[#ff0000]" data-testid="icon" />);

    const icon = screen.getByTestId('icon');
    const fillColor = getComputedStyle(icon).getPropertyValue('fill');

    setTimeout(() => {
      expect(fillColor).toBe('rgb(255, 0, 0)');
    }, 0);
  });
});
