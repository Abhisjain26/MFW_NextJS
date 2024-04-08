import { twMerge } from 'tailwind-merge';

type SkeletonWrapperProps = {
  className?: string;
  children: React.ReactNode;
};

export const SkeletonWrapper: React.FC<SkeletonWrapperProps> = ({
  className,
  children
}) => {
  return (
    <div
      className={twMerge('relative flex flex-col overflow-hidden', className)}
    >
      {children}
    </div>
  );
};
