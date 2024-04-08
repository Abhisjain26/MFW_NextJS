import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '../checkbox';

describe('Checkbox input', () => {
  it('should render without throwing an error', () => {
    render(<Checkbox />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeTruthy();
  });

  it('should be checked when clicked', () => {
    render(<Checkbox />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('should be label checked', () => {
    render(<Checkbox>Checkbox</Checkbox>);

    const checkbox = screen.getByRole('checkbox', {
      name: /checkbox/i
    });

    expect(checkbox).toBeTruthy();
  });

  it('should be label classname checked', () => {
    const { container } = render(
      <Checkbox className="accent-primary">Checkbox</Checkbox>
    );

    const label = container.querySelector('label');

    expect(label).toHaveClass('accent-primary');
  });

  it('should be error message checked', () => {
    const error = {
      type: '',
      message: 'Error message'
    };

    render(<Checkbox error={error} />);

    const errorMessage = screen.getByText(error.message);

    expect(errorMessage).toBeTruthy();
  });
});
