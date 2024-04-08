import { twMerge } from 'tailwind-merge';

type LoaderSpinnerProps = {
  className?: string;
  borderType?: 'solid' | 'dotted' | 'dashed';
};

export const LoaderSpinner: React.FC<LoaderSpinnerProps> = ({
  borderType = 'solid',
  className
}) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        className={twMerge(
          'w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin',
          `border-${borderType}`,
          className
        )}
      />
    </div>
  );
};
