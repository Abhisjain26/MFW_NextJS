import { SkeletonWrapper } from './skeleton-wrapper';
import { Skeleton } from './skeleton';
import { Shimmer } from './shimmer';

export const SkeletonProduct = () => {
  return (
    <SkeletonWrapper>
      <Skeleton type="image" />
      <Skeleton type="title" />
      <Skeleton type="price" />
      <Shimmer />
    </SkeletonWrapper>
  );
};
