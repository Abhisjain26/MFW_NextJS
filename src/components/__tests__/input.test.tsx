import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Input } from '../input';

describe('Input Component', () => {
  it('rendered input', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');

    expect(input).toBeTruthy();
  });

  it('should render a placeholder input correctly', () => {
    render(<Input placeholder="Test placeholder" />);
    const input = screen.getByPlaceholderText('Test placeholder');

    expect(input).toBeInTheDocument();
  });

  it('has given class names', () => {
    render(<Input className="test-class" />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveClass('test-class');
  });

  it('should render a disabled input correctly', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveAttribute('disabled');
    expect(input).toBeDisabled();
  });

  it('should be focus correctly', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');

    setTimeout(() => expect(input.focus).toHaveBeenCalled(), 250);
  });

  it('should be label', () => {
    const { getByText } = render(<Input label="Example Label" />);
    expect(getByText('Example Label')).toBeTruthy();
  });

  it('should be error message', () => {
    const error = {
      type: '',
      message: 'Error message'
    };
    render(<Input error={error} />);
    const errorMessage = screen.getByText(error.message);
    expect(errorMessage).toBeTruthy();
  });

  it('should change the value without error', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, {
      target: {
        value: 'test'
      }
    });

    expect(input).toHaveValue('test');
  });
});
