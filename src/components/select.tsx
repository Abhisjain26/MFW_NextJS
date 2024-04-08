import { forwardRef } from 'react';
import { SelectProps } from '@theme/components/types';
import clsx from 'clsx';
import { Icon } from './icon';
import { twMerge } from 'tailwind-merge';

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const {
    className,
    options,
    borderless = false,
    icon,
    iconSize,
    error,
    label,
    required = false,
    ...rest
  } = props;

  return (
    <label
      className={clsx('flex flex-col relative text-xs text-gray-800', {
        'pl-7': icon
      })}
    >
      {icon && (
        <Icon
          name={icon}
          size={iconSize ?? 20}
          className="absolute left-0 top-1/2 transform -translate-y-1/2"
        />
      )}

      {label && (
        <span className="mb-1">
          {label} {required && <span className="text-secondary">*</span>}
        </span>
      )}
      <select
        {...rest}
        ref={ref}
        className={twMerge(
          clsx(
            'cursor-pointer truncate h-10 w-40 px-2.5 shrink-0 outline-none',
            !borderless &&
              'border border-gray-200 transition-all duration-150 hover:border-primary'
          ),
          className
        )}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className={option.class}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="mt-1 text-sm text-error">{error.message}</span>
      )}
    </label>
  );
});

Select.displayName = 'Select';

export { Select };
