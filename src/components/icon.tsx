import { IconProps } from '@theme/components/types';
import clsx from 'clsx';

export const Icon = (props: IconProps) => {
  const { name, size, className, ...rest } = props;

  return (
    <i
      className={clsx(`flex pz-icon-${name}`, className)}
      {...rest}
      style={
        size && {
          fontSize: `${size}px`
        }
      }
    />
  );
};
