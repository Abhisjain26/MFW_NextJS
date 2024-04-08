import React from 'react';
import {
  render,
  fireEvent,
  screen,
  getAllByRole
} from '@testing-library/react';
import { Select } from '../select';

const options = [
  { label: 'Austria', value: 'AT' },
  { label: 'Ireland', value: 'IE' },
  { label: 'United States', value: 'US' }
];

describe('Select Component', () => {
  it('should render without throwing an error', () => {
    render(<Select options={options} />);

    const select = screen.getByRole('combobox');

    expect(select).toBeTruthy();
  });

  it('can change the value of the select', () => {
    render(<Select options={options} />);

    const select = screen.getByRole('combobox');

    const display = select.children[0];

    expect(display.textContent).toBe(options[0].label);

    fireEvent.click(select);

    const selectOptions = getAllByRole(select, 'option');

    fireEvent.click(selectOptions[0]);

    expect(display.textContent).toBe(options[0].label);
  });

  it('should render a disabled', () => {
    render(<Select options={options} disabled />);

    const select = screen.getByRole('combobox');

    expect(select).toHaveAttribute('disabled');
    expect(select).toBeDisabled();
  });

  it('has given class names', () => {
    render(<Select options={options} className="accent-primary" />);

    const select = screen.getByRole('combobox');

    expect(select).toHaveClass('accent-primary');
  });

  it('should render a borderless', () => {
    render(<Select options={options} borderless={true} />);

    const select = screen.getByRole('combobox');

    expect(select).not.toHaveClass('border');
  });

  it('should be error message', () => {
    const error = {
      type: '',
      message: 'Error message'
    };
    render(<Select options={options} error={error} />);
    const errorMessage = screen.getByText(error.message);
    expect(errorMessage).toBeTruthy();
  });

  it('should be label', () => {
    const { getByText } = render(
      <Select options={options} label="Example Label" />
    );

    expect(getByText('Example Label')).toBeTruthy();
  });

  it('should be required', () => {
    const { getByText } = render(
      <Select options={options} label="Example Label" required />
    );
    expect(getByText('Example Label')).toBeTruthy();
    expect(getByText('*')).toBeTruthy();
  });

  it('should be icon', () => {
    const { container } = render(<Select options={options} icon="globe" />);

    const svg = container.querySelector('svg');

    expect(svg).toHaveClass(
      'absolute left-0 top-1/2 transform -translate-y-1/2'
    );
  });

  it('should be icon with size', () => {
    const size = 20;

    const { container } = render(
      <Select options={options} icon="globe" size={size} />
    );

    const svg = container.querySelector('svg');

    expect(svg.getAttribute('height')).toBe(size.toString());
  });
});
