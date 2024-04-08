import React from 'react';
import { render, screen } from '@testing-library/react';
import { Modal } from '../modal';

describe('Modal Component', () => {
  it('should render as expected when modal is true', () => {
    const closeFn = jest.fn();

    const { getByText } = render(
      <Modal portalId="example-modal" open={true} setOpen={closeFn}>
        This modal is so cool!
      </Modal>
    );

    expect(getByText('This modal is so cool!')).toBeTruthy();
  });

  it('should render as expected when modal is false', () => {
    const closeFn = jest.fn();

    render(
      <Modal portalId="example-modal" open={false} setOpen={closeFn}>
        This modal is so cool!
      </Modal>
    );

    const text = screen.queryByText('This modal is so cool!');
    expect(text).not.toBeInTheDocument();
  });

  it('should have portalId', () => {
    const portalId = 'example-modal';

    const closeFn = jest.fn();

    render(
      <Modal portalId={portalId} open={true} setOpen={closeFn}>
        This modal is so cool!
      </Modal>
    );

    const element = document.getElementById(portalId);

    expect(element.getAttribute('id')).toBe(portalId);
  });

  it('has given class names', () => {
    const closeFn = jest.fn();

    render(
      <Modal
        portalId="example-modal"
        open={true}
        setOpen={closeFn}
        className="accent-primary"
      >
        This modal is so cool!
      </Modal>
    );

    const section = document.querySelector('section');

    expect(section).toHaveClass('accent-primary');
  });

  it('should have title', () => {
    const closeFn = jest.fn();

    render(
      <Modal
        portalId="example-modal"
        open={true}
        setOpen={closeFn}
        title="Example Title"
      >
        This modal is so cool!
      </Modal>
    );

    const title = document.querySelector('h3');

    expect(title).toHaveTextContent('Example Title');
  });

  it('should have close button', () => {
    const closeFn = jest.fn();

    render(
      <Modal
        portalId="example-modal"
        open={true}
        setOpen={closeFn}
        showCloseButton
      >
        This modal is so cool!
      </Modal>
    );

    const button = document.querySelector('use');

    expect(button.getAttribute('xlink:href')).toBe('/icon-sprite.svg#close');
  });
});
