import { Shimmer } from './shimmer';
import { Skeleton } from './skeleton';
import { SkeletonWrapper } from './skeleton-wrapper';

export const SkeletonArticle = () => {
  return (
    <SkeletonWrapper>
      <Skeleton type="title" />
      <Skeleton type="text" />
      <Skeleton type="text" />
      <Skeleton type="text" />
      <Shimmer />
    </SkeletonWrapper>
  );
};
