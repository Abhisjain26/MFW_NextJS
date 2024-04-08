import clsx from 'clsx';
import { BadgeProps } from '@theme/components/types';
import { twMerge } from 'tailwind-merge';

export const Badge = (props: BadgeProps) => {
  const { children, className } = props;

  return (
    <div
      className={twMerge(
        clsx(
          'absolute top-0 -right-2 text-center text-xs rounded-full cursor-default',
          !className && 'bg-primary text-gray-500'
        ),
        className
      )}
    >
      {children}
    </div>
  );
};
