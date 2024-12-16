import { Skeleton } from "./ui/skeleton";

const BandCardSkeleton = () => {
  return (
    <div className="flex items-center w-full gap-3">
      <Skeleton className="w-20 h-20 rounded-full aspect-square "></Skeleton>
      <div className="flex flex-col w-full gap-2">
        <Skeleton className="w-[10rem] h-5"></Skeleton>
        <Skeleton className="w-full lg:w-[50%] h-3"></Skeleton>
        <Skeleton className="w-full lg:w-[50%] h-3"></Skeleton>
      </div>
    </div>
  );
};

export default BandCardSkeleton;
