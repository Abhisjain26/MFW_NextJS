'use client';

import { ButtonProps } from '@theme/components/types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(
        clsx(
          [
            'px-4',
            'h-10',
            'text-xs',
            'bg-primary',
            'text-primary-foreground',
            'border',
            'border-primary',
            'transition-all',
            'hover:bg-white',
            'hover:border-primary',
            'hover:text-primary'
          ],
          props.appearance === 'outlined' && [
            'bg-transparent ',
            'text-primary ',
            'hover:bg-primary ',
            'hover:text-primary-foreground'
          ],
          props.appearance === 'ghost' && [
            'bg-transparent',
            'border-transparent',
            'text-primary',
            'hover:bg-primary',
            'hover:text-primary-foreground'
          ]
        ),
        props.className
      )}
    >
      {props.children}
    </button>
  );
};
