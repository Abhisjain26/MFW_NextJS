import { render, screen } from '@testing-library/react';
import { Accordion } from '../accordion';

const accordionContent = {
  title: 'test-title',
  subTitle: 'test-subtitle',
  content: 'Test-content',
  className: 'test-class',
  icons: ['globe'],
  iconColor: '#D02B2F'
};

describe('Accordion Component', () => {
  it('should give class names correctly', () => {
    const { container } = render(
      <Accordion className={accordionContent.className}></Accordion>
    );

    expect(container.firstChild).toHaveClass(accordionContent.className);
  });

  it('should be icon and icon color', () => {
    const { container } = render(
      <Accordion
        isCollapse={true}
        icons={accordionContent.icons}
        iconColor={accordionContent.iconColor}
      ></Accordion>
    );
    const svg = container.querySelector('svg');

    expect(svg).toHaveClass(`fill-[${accordionContent.iconColor}]}`);
    expect(svg).toBeInTheDocument();
  });

  it('should render a accordion content correctly', () => {
    render(
      <Accordion isCollapse={true}>
        <div>{accordionContent.content}</div>
      </Accordion>
    );
    const accordion = screen.getByText(accordionContent.content);

    expect(accordion).toBeInTheDocument();
  });

  it('should render a accordion title and title class correctly', () => {
    render(
      <Accordion
        titleClassName={accordionContent.className}
        title={accordionContent.title}
      ></Accordion>
    );
    const accordion = screen.getByText(accordionContent.title);

    expect(accordion).toHaveClass(accordionContent.className);
  });

  it('should render a accordion sub title correctly', () => {
    render(<Accordion subTitle={accordionContent.subTitle}></Accordion>);
    const accordion = screen.getByText(accordionContent.subTitle);

    expect(accordion).toBeTruthy();
  });
});
