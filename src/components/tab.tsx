import { useCallback } from 'react';
import clsx from 'clsx';
import { Icon } from '@theme/components';
import { twMerge } from 'tailwind-merge';

export type Props = {
  title: string;
  icon?: string;
  index: number;
  setSelectedTab: (index: number) => void;
  isActive?: boolean;
  iconPosition?: string;
  className?: string;
};

export const Tab = (props: Props) => {
  const {
    title,
    setSelectedTab,
    index,
    isActive,
    icon,
    iconPosition,
    className
  } = props;

  const handleOnClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <button
      onClick={handleOnClick}
      className={twMerge(
        clsx(
          'text-sm flex items-center justify-center px-4 py-2 gap-3 cursor-pointer uppercase break-words',
          isActive ? 'bg-primary' : 'bg-gray-100',
          isActive ? 'text-white' : 'text-primary',
          {
            'flex-col': iconPosition === 'top',
            'flex-col-reverse': iconPosition === 'bottom',
            'flex-row-reverse': iconPosition === 'end'
          }
        ),
        className
      )}
    >
      {icon && (
        <Icon
          name={icon}
          size={16}
          className={isActive ? 'fill-white' : 'fill-primary'}
        />
      )}
      {title}
    </button>
  );
};
