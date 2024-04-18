'use client';

import { useAppDispatch } from '@akinon/next/redux/hooks';
import { toggleMobileMenu } from '@akinon/next/redux/reducers/header';
import clsx from 'clsx';

import { PwaBackButton } from './pwa-back-button';
import { Button, Icon } from '@theme/components';

export default function MobileHamburgerButton() {
  const dispatch = useAppDispatch();

  return (
    <div className="flex row-start-2 sm:hidden ">
      <PwaBackButton />
      <Button
        className={clsx([
          'w-12',
          'h-12',
          'bg-white',
          'text-dark',
          'flex',
          'items-center',
          'justify-center',
          'px-0',
          'border-none',
          'hover:bg-secondary-hover'
        ])}
        onClick={() => dispatch(toggleMobileMenu())}
      >
        <Icon name="hamburger" size={18} className="fill-white" />
      </Button>
    </div>
  );
}
