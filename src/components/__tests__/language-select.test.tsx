import {
  render,
  screen,
  fireEvent,
  getAllByRole
} from '@testing-library/react';
// eslint-disable-next-line @akinon/projectzero/router-import
import { useRouter } from 'next/navigation';
import { LanguageSelect } from '../language-select';

jest.mock('@akinon/next/hooks', () => ({
  useTranslation: () => ({ locale: 'en' })
}));

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '/',
      push: jest.fn()
    };
  }
}));

jest.spyOn(require('next/navigation'), 'useRouter');

const language = [
  { label: 'TR', value: 'tr' },
  { label: 'EN', value: 'en' }
];

describe('Language Select Component', () => {
  let wrapper;
  beforeEach(() => {
    const { container } = render(<LanguageSelect className="test-class" />);
    wrapper = container;
  });

  it('should listen useRouter', () => {
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    fireEvent.click(getAllByRole(select, 'option')[0]);
    expect(useRouter).toHaveBeenCalledTimes(1);
  });

  it('should render without throwing an error', () => {
    const select = screen.getByRole('combobox');

    expect(select).toBeTruthy();
  });

  it('has given class names', () => {
    const select = screen.getByRole('combobox');

    expect(select).toHaveClass('test-class');
  });

  it('should be icon', () => {
    const svg = wrapper.querySelector('svg');

    expect(svg).toBeInTheDocument();
  });

  it('should render a options correctly', () => {
    const select = screen.getByRole('combobox');
    const selectOptions = getAllByRole(select, 'option');

    expect(selectOptions[0].textContent).toBe(language[0].label);
    expect(selectOptions[1].textContent).toBe(language[1].label);
  });

  it('should change the value of the select', () => {
    const select = screen.getByRole('combobox');

    fireEvent.keyDown(select, { target: { value: 'tr' } });

    expect(select).toHaveValue(language[0].value);
  });
});
