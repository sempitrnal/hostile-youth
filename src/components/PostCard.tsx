'use client';

import { formatDate } from '@/utils/dateFormatter';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Skeleton } from './ui/skeleton';

export default function PostCard({
  post,
  postImageUrl,
  searchPage,
}: {
  post: any;
  postImageUrl: string | null;
  searchPage?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link
      className={`flex ${searchPage ? 'flex-row gap-4 lg:gap-6' : 'flex-col gap-4 lg:gap-7'} group/link w-full items-center justify-center sm:flex-row sm:items-center ${isLoading ? 'cursor-default' : 'cursor-pointer'} border-black`}
      href={`/${post.slug.current}`}
    >
      <div
        className={`relative transition-[width] ${searchPage ? 'w-[10rem]' : 'w-full sm:w-[25rem] lg:w-[30rem]'} h-auto`}
      >
        {/* Loader */}

        {isLoading && (
          <Skeleton className="absolute left-0 top-0 aspect-square h-full w-full rounded-none" />
        )}
        {/* <Skeleton className="absolute top-0 left-0 w-full bg-primary/10 h-full aspect-square " /> */}

        {/* Image */}
        <Image
          src={postImageUrl || '/fallback.jpg'}
          alt={post.title || 'Image'}
          width={1080}
          layout="responsive"
          height={1080}
          priority
          fetchPriority="high"
          className={`aspect-square object-cover object-top transition-opacity duration-500 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsLoading(false)} // Set loading to false when done
        />
      </div>
      {/* Text with Skeleton */}

      {isLoading ? (
        <div className="mt-4 flex w-full flex-col items-start gap-3 lg:mt-8 lg:w-full lg:items-start">
          <Skeleton className="h-4 w-full lg:h-8" />
          <Skeleton className="h-4 w-[90%] lg:h-8" />
          <Skeleton className="h-4 w-[80%] lg:h-8" />
          <div className="my-2 flex h-full w-full flex-col gap-2">
            <Skeleton className="h-3 w-[40%] lg:h-6" />
            <Skeleton className="h-3 w-[32%] lg:hidden lg:h-6" />
          </div>
        </div>
      ) : (
        <div
          className={`flex w-full flex-col items-start lg:items-start ${searchPage ? 'gap-1' : 'gap-1 lg:gap-5'}`}
        >
          <h2
            className={`${searchPage ? 'text-lg sm:text-xl lg:text-3xl' : 'text-3xl sm:text-5xl lg:text-5xl'} font-sans font-medium lowercase text-black transition-all duration-300 group-hover/link:underline dark:text-white lg:text-start`}
          >
            {post.title}
          </h2>
          <div className="flex flex-col items-start justify-start lg:flex-row lg:items-center lg:justify-start lg:gap-2">
            <p
              className={`${searchPage ? 'text-sm' : ''} lowercase text-stone-900 dark:text-stone-200`}
            >
              {post.publisherName}
            </p>
            <span className="hidden lg:block">/</span>
            <p className="text-[12px] font-bold lowercase text-stone-900 dark:text-white">
              {formatDate(post.publishedAt, 'MMMM DD, YYYY')}
            </p>
          </div>
        </div>
      )}

      {/* Post Body */}
      {/* {!isLoading && <SlicedBody body={post.body} length={1} />} */}
    </Link>
  );
}
