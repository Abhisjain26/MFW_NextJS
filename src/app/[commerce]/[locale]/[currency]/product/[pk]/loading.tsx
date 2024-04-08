import { Skeleton, SkeletonWrapper } from 'components';

export default function Loading() {
  return (
    <div className="container mx-auto">
      <div className="max-w-5xl mx-auto my-5 px-7">
        <SkeletonWrapper className="md:mb-7">
          <Skeleton className="w-[17.25rem] h-4 lg:w-64" />
        </SkeletonWrapper>
      </div>
      <div className="grid max-w-5xl grid-cols-2 lg:gap-8 mx-auto px-7">
        <div className="col-span-2 mb-7 md:mb-0 lg:col-span-1">
          <div className="flex gap-1">
            <SkeletonWrapper className="hidden md:block md:mb-7">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} className="w-20	h-24 mb-2" />
                ))}
            </SkeletonWrapper>

            <div className="flex-1">
              <SkeletonWrapper className="md:mb-7">
                <Skeleton className="w-full h-[30.375rem] md:h-[36.375rem]" />
              </SkeletonWrapper>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center col-span-2 lg:col-span-1">
          <div className="w-full">
            <SkeletonWrapper className="w-full md:mb-7 flex justify-center items-center">
              <Skeleton className="w-96 h-16 mb-9" />
              <Skeleton className="hidden w-36	h-14 mb-9 md:block" />

              <div className="flex flex-col justify-center items-center mb-9">
                <Skeleton className="w-36 h-4 mb-2" />
                <div className="flex items-center gap-2">
                  {Array(3)
                    .fill(null)
                    .map((_, index) => (
                      <Skeleton key={index} className="w-24	h-10" />
                    ))}
                </div>
              </div>

              <div className="flex flex-col justify-center items-center mb-4">
                <Skeleton className="w-36 h-4 mb-2" />
                <div className="flex items-center gap-2">
                  {Array(5)
                    .fill(null)
                    .map((_, index) => (
                      <Skeleton key={index} className="w-11 h-11" />
                    ))}
                </div>
              </div>

              <Skeleton className="hidden w-full h-14 mb-6 md:block" />
              <Skeleton className="w-40 h-10 mb-9 md:w-72" />
              <Skeleton className="w-24 h-10 mb-7" />
              <Skeleton className="w-full h-36" />
            </SkeletonWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
