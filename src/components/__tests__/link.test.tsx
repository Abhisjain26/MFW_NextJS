import { render, screen, fireEvent } from '@testing-library/react';
import { Link } from '../link';

jest.mock('@akinon/next/hooks', () => ({
  useTranslation: () => ({ locale: 'en' })
}));

const linkContent = {
  href: '/test-link',
  className: 'test-class',
  text: 'text'
};

describe('Link Component', () => {
  let wrapper;
  const onClick = jest.fn();

  beforeEach(() => {
    const { container } = render(
      <Link
        className={linkContent.className}
        target="_blank"
        href={linkContent.href}
        onClick={onClick}
      >
        {linkContent.text}
      </Link>
    );

    wrapper = container;
  });

  it('should render without error', () => {
    const link = screen.getByRole('link');

    expect(link).toBeTruthy();
  });

  it('should be text without error', () => {
    const link = screen.getByText(linkContent.text);

    expect(link).toBeTruthy();
  });

  it('has given class names', () => {
    const link = screen.getByRole('link');

    expect(link).toHaveClass(linkContent.className);
  });

  it('should be attribute without error', () => {
    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('href', `${linkContent.href}`);
  });

  it('when clicked it should redirect', () => {
    const link = screen.getByText(linkContent.text);

    fireEvent.click(link);

    expect(onClick).toHaveBeenCalled();
  });
});
