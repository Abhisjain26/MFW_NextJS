import { render, screen } from '@testing-library/react';
import { Badge } from '../badge';

describe('Badge Component', () => {
  let badge;

  beforeEach(() => {
    render(<Badge className="text-md rounded-sm">%90 off</Badge>);

    badge = screen.getByText('%90 off');
  });

  it('should render without throwing an error', () => {
    expect(badge).toBeInTheDocument();
  });

  it('should be classname checked', () => {
    expect(badge).toHaveClass('text-md rounded-sm');
  });
});
