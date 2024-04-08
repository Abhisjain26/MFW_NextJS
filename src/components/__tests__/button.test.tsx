import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '../button';

describe('Button Component', () => {
  it('should render without throwing an error', () => {
    render(<Button>Button</Button>);

    const button = screen.getByRole('button', {
      name: /button/i
    });

    expect(button).toBeTruthy();
  });

  it('should work outlined appearance without error', () => {
    render(<Button appearance="outlined">Outlined Button</Button>);

    const button = screen.getByRole('button', {
      name: /outlined/i
    });

    expect(button).toHaveAttribute('appearance', 'outlined');
    expect(button).toHaveClass(
      'bg-transparent text-primary hover:bg-primary hover:text-primary-foreground'
    );
  });

  it('should render a disabled button', () => {
    render(<Button disabled />);

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('disabled');
    expect(button).toBeDisabled();
  });

  it('should invoke an onClick handler when passed', () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click Me</Button>);

    fireEvent.click(screen.getByText(/click me/i));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should work ghost appearance without error', () => {
    render(<Button appearance="ghost">Ghost Button</Button>);

    const button = screen.getByRole('button', {
      name: /ghost button/i
    });

    expect(button).toHaveAttribute('appearance', 'ghost');
    expect(button).toHaveClass(
      'bg-transparent border-transparent text-primary hover:bg-primary hover:text-primary-foreground'
    );
  });
});
