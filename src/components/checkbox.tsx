import { forwardRef } from 'react';
import { CheckboxProps } from '@theme/components/types';
import { twMerge } from 'tailwind-merge';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { children, error, ...rest } = props;

  return (
    <label className={twMerge('flex flex-col text-xs', props.className)}>
      <div className="flex items-center">
        <input
          type="checkbox"
          {...rest}
          ref={ref}
          className="w-4 h-4 shrink-0"
        />
        {children && <span className="ml-2">{children}</span>}
      </div>
      {error && (
        <span className="mt-1 text-sm text-error">{error.message}</span>
      )}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };
