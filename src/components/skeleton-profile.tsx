import { Shimmer } from './shimmer';
import { Skeleton } from './skeleton';
import { SkeletonWrapper } from './skeleton-wrapper';

export const SkeletonProfile = () => {
  return (
    <SkeletonWrapper>
      <div>
        <Skeleton type="avatar" />
      </div>
      <div>
        <Skeleton type="title" />
        <Skeleton type="text" />
        <Skeleton type="text" />
      </div>
      <Shimmer />
    </SkeletonWrapper>
  );
};
