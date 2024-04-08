'use client';

import ReactPortal from './react-portal';

import { Icon } from './icon';
import { twMerge } from 'tailwind-merge';
import { useEffect } from 'react';
export interface ModalProps {
  portalId: string;
  children?: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  title?: React.ReactNode;
  showCloseButton?: React.ReactNode;
  className?: string;
}

export const Modal = (props: ModalProps) => {
  const {
    children,
    portalId,
    open,
    setOpen,
    title = '',
    showCloseButton = true,
    className
  } = props;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  if (!open) return null;

  return (
    <ReactPortal wrapperId={portalId}>
      <div className="fixed top-0 left-0 w-screen h-screen bg-primary bg-opacity-60 z-50" />
      <section
        className={twMerge(
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white',
          className
        )}
      >
        {(showCloseButton || title) && (
          <div className="flex px-6 py-4 border-b border-gray-400">
            {title && <h3 className="text-lg font-light">{title}</h3>}
            {showCloseButton && (
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="ml-auto"
              >
                <Icon name="close" size={16} />
              </button>
            )}
          </div>
        )}
        {children}
      </section>
    </ReactPortal>
  );
};
