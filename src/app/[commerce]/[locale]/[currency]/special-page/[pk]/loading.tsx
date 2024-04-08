import { Skeleton, SkeletonWrapper } from 'components';

export default function Loading() {
  return (
    <div className="container p-4 mx-auto lg:px-0 lg:my-4">
      <SkeletonWrapper className="md:mb-7">
        <Skeleton className="w-[17.25rem] h-4 lg:w-64" />
      </SkeletonWrapper>

      <div className="w-full flex gap-8">
        <div className="hidden lg:block">
          <SkeletonWrapper className="w-[17.25rem] h-[650px] shrink-0">
            <Skeleton className="w-full h-full" />
          </SkeletonWrapper>
        </div>

        <div className="flex-1">
          <div className="lg:hidden">
            <SkeletonWrapper className="w-full flex-row items-center py-4 justify-center">
              <div className="w-full flex gap-4 justify-center">
                <Skeleton className="w-full h-9 md:w-40" />
                <Skeleton className="w-full h-9 md:w-40" />
              </div>
            </SkeletonWrapper>
          </div>

          <div className="hidden lg:block">
            <SkeletonWrapper className="w-full flex-row items-center justify-between mb-4">
              <div className="flex flex-row gap-5">
                <Skeleton className="w-20 h-5" />
              </div>
              <div className="flex items-center gap-7">
                <Skeleton className="w-[21.25rem] h-[38px]" />
                <Skeleton className="w-40 h-[38px]" />
              </div>
            </SkeletonWrapper>
          </div>

          <div className="grid gap-x-4 gap-y-7 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-full h-80 md:h-[26.813rem] lg::h-[35.875rem]"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
