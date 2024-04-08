import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type ShimmerProps = {
  className?: string;
};

export const Shimmer: React.FC<ShimmerProps> = ({ className }) => {
  return (
    <div
      className={clsx(['absolute top-0 left-0 w-full h-full animate-pulse'])}
    >
      <div
        className={twMerge(
          'w-full h-full bg-black bg-opacity-20 shadow-[0 0 30px 30px rgba(255,255,255,0.2)]',
          className
        )}
      ></div>
    </div>
  );
};
