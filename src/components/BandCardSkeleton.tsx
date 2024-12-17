import { Skeleton } from './ui/skeleton';

const BandCardSkeleton = () => {
  return (
    <div className="flex w-full items-center gap-3">
      <Skeleton className="aspect-square h-20 w-20 rounded-full"></Skeleton>
      <div className="flex w-full flex-col gap-2">
        <Skeleton className="h-5 w-[10rem]"></Skeleton>
        <Skeleton className="h-3 w-full lg:w-[50%]"></Skeleton>
        <Skeleton className="h-3 w-full lg:w-[50%]"></Skeleton>
      </div>
    </div>
  );
};

export default BandCardSkeleton;
