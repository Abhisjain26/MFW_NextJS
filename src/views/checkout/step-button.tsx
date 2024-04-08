import React from 'react';
import { useAppDispatch } from '@akinon/next/redux/hooks';
import { setCurrentStep } from '@akinon/next/redux/reducers/checkout';
import { Icon } from '@theme/components';
import clsx from 'clsx';
import { CheckoutStep } from '@akinon/next/types';

type Props = {
  label: string;
  tabKey?: CheckoutStep;
  selected?: boolean;
  completed?: boolean;
  disabled?: boolean;
  number: string;
};

export const CheckoutStepButton = ({
  label,
  number,
  tabKey,
  selected,
  completed,
  disabled
}: Props) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (!tabKey || disabled) {
      return;
    }

    dispatch(setCurrentStep(tabKey));
  };

  return (
    <button
      className={clsx(
        'flex items-center justify-center transition-all',
        { 'cursor-not-allowed': disabled },
        { 'mr-6': completed }
      )}
      onClick={handleClick}
    >
      <span
        className={clsx(
          'relative w-min flex items-center justify-center flex-row flex-wrap text-xs',
          'font-medium transition-all md:flex-nowrap pointer-events-none',
          { 'text-[green]': completed },
          { 'text-gray-600': !completed && !selected },
          { 'text-black': selected }
        )}
      >
        <span className="order-1 flex-1 md:mr-1 md:order-none md:flex-none">
          {number} {number && `.`}
        </span>
        <span className="order-3 uppercase md:order-none">{label}</span>
        <Icon
          name="check"
          size={12}
          className={clsx(
            'absolute -right-6 transition-all duration-300 fill-[green]',
            { 'opacity-0 scale-x-0': !completed },
            { 'opacity-100 scale-x-100': completed }
          )}
        />
      </span>
    </button>
  );
};
