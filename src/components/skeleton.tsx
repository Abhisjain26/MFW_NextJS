import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type SkeletonProps = {
  className?: string;
  type?:
    | 'text'
    | 'title'
    | 'avatar'
    | 'thumbnail'
    | 'image'
    | 'price'
    | 'select'
    | 'button';
};

export const Skeleton: React.FC<SkeletonProps> = ({ type, className }) => {
  return (
    <div
      className={twMerge(
        clsx([
          'relative bg-gray-400 overflow-hidden',
          'after:-translate-x-full after:z-10 after:bg-skeleton-shimmer after:animate-skeleton-shimmer after:absolute after:inset-0', // shimmer animation
          { 'w-full h-3': type === 'text' },
          { 'w-1/2 h-5 mb-3': type === 'title' },
          { 'w-24 h-24 rounded-full': type === 'avatar' },
          { 'w-24 h-24': type === 'thumbnail' },
          { 'w-full h-40': type === 'image' },
          { 'w-20 h-5': type === 'price' },
          { 'w-full h-10': type === 'select' },
          { 'w-full h-10': type === 'button' }
        ]),
        className
      )}
    ></div>
  );
};
