import { render, screen, fireEvent } from '@testing-library/react';
import { Radio } from '../radio';

function RadioGroup() {
  return (
    <form>
      <Radio name="radio">Radio 1</Radio>
      <Radio name="radio">Radio 2</Radio>
    </form>
  );
}

describe('Radio Component', () => {
  let radio, wrapper;

  beforeEach(() => {
    wrapper = render(<Radio className="text-primary">Project Zero</Radio>);
    radio = screen.getByRole('radio', {
      name: /project zero/i
    });
  });

  it('should render without throwing an error', () => {
    expect(radio).toBeInTheDocument();
  });

  it('should be label classname checked', () => {
    const { container } = wrapper;
    const label = container.querySelector('label');
    expect(label).toHaveClass('text-primary');
  });

  it('should render a disabled radio button', () => {
    radio.setAttribute('disabled', true);

    expect(radio).toHaveAttribute('disabled');
    expect(radio).toBeDisabled();
  });

  it('should change checked option', () => {
    render(<RadioGroup />);

    const secondRadio = screen.getByLabelText('Radio 1');
    fireEvent.click(secondRadio);
    expect(secondRadio).toBeChecked();

    const firstRadio = screen.getByLabelText('Radio 2');
    fireEvent.click(firstRadio);
    expect(firstRadio).toBeChecked();
    expect(secondRadio).not.toBeChecked();
  });
});
