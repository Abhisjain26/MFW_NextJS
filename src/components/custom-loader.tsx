import { Icon } from './icon';
import { twMerge } from 'tailwind-merge';

type CustomLoaderProps = {
  iconName: string;
  animateType: 'bounce' | 'spin';
  className?: string;
};

export const CustomLoader: React.FC<CustomLoaderProps> = ({
  iconName,
  animateType = 'spin',
  className
}) => {
  return (
    <Icon
      name={iconName}
      className={twMerge(`animate-${animateType}`, className)}
    />
  );
};
