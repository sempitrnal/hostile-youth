"use client";

import { formatDate } from "@/utils/dateFormatter";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

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
      className={`flex ${searchPage ? "gap-4 lg:gap-6 flex-row" : "flex-col gap-4 lg:gap-7"} items-center justify-center  sm:flex-row   w-full sm:items-center  group/link ${isLoading ? "cursor-default" : "cursor-pointer"} border-black   `}
      href={`/${post.slug.current}`}
    >
      <div
        className={`relative transition-[width]  ${searchPage ? "w-[10rem]" : "w-full sm:w-[25rem] lg:w-[30rem]"} h-auto  `}
      >
        {/* Loader */}

        {isLoading && (
          <Skeleton className="absolute top-0 left-0 w-full  h-full aspect-square rounded-none" />
        )}
        {/* <Skeleton className="absolute top-0 left-0 w-full bg-primary/10 h-full aspect-square " /> */}

        {/* Image */}
        <Image
          src={postImageUrl || "/fallback.jpg"}
          alt={post.title || "Image"}
          width={1080}
          layout="responsive"
          height={1080}
          priority
          fetchPriority="high"
          className={`object-cover object-top transition-opacity aspect-square duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)} // Set loading to false when done
        />
      </div>
      {/* Text with Skeleton */}

      {isLoading ? (
        <div className="w-full mt-4 lg:mt-8  lg:w-full flex  flex-col items-start lg:items-start  gap-3  ">
          <Skeleton className="w-full h-4 lg:h-8 " />
          <Skeleton className="w-[90%] h-4 lg:h-8 " />
          <Skeleton className="w-[80%] h-4 lg:h-8" />
          <div className="w-full h-full my-2 flex flex-col gap-2">
            <Skeleton className="w-[40%] h-3 lg:h-6" />
            <Skeleton className="w-[32%] h-3 lg:h-6 lg:hidden" />
          </div>
        </div>
      ) : (
        <div
          className={`w-full flex  flex-col items-start lg:items-start  ${searchPage ? "gap-1" : "gap-1  lg:gap-5"}`}
        >
          <h2
            className={`${searchPage ? "text-lg sm:text-xl lg:text-3xl " : "text-3xl sm:text-5xl lg:text-5xl "} lg:text-start  transition-all   group-hover/link:underline  duration-300 font-medium font-sans   text-black  dark:text-white lowercase`}
          >
            {post.title}
          </h2>
          <div className="flex flex-col lg:flex-row lg:gap-2 items-start lg:items-center justify-start lg:justify-start ">
            <p
              className={`${searchPage ? "text-sm" : ""} text-stone-900 dark:text-stone-200  lowercase`}
            >
              {post.publisherName}
            </p>
            <span className="hidden lg:block">/</span>
            <p className=" text-stone-900 dark:text-white font-bold text-[12px]   lowercase">
              {formatDate(post.publishedAt, "MMMM DD, YYYY")}
            </p>
          </div>
        </div>
      )}

      {/* Post Body */}
      {/* {!isLoading && <SlicedBody body={post.body} length={1} />} */}
    </Link>
  );
}
