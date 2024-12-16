"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import { formatDate } from "@/utils/dateFormatter";
import { SlicedBody } from "@/components/SlicedPortableText";

export default function PostCard({
  post,
  postImageUrl,
}: {
  post: any;
  postImageUrl: string | null;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500); // 1.5s skeleton duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <Link
      className={`flex flex-col group/link ${isLoading ? "cursor-default" : "cursor-pointer"}`}
      href={`/${post.slug.current}`}
    >
      {/* Image with Skeleton */}
      <div className="relative w-full mb-2 overflow-hidden rounded-md h-52 sm:h-64 lg:h-80">
        {isLoading ? (
          <Skeleton className="absolute top-0 left-0 w-full h-full mb-2" />
        ) : (
          postImageUrl && (
            <Image
              className="object-cover w-full h-full"
              src={postImageUrl}
              alt={post.title}
              width={1920}
              height={1080}
              priority
            />
          )
        )}
      </div>

      {/* Text with Skeleton */}
      {isLoading ? (
        <div className="mt-2 space-y-2">
          <Skeleton className="w-full h-8 rounded-lg" />
          <Skeleton className="w-1/2 h-4 rounded-lg" />
          <Skeleton className="w-1/3 h-4 rounded-lg" />
        </div>
      ) : (
        <div>
          <h2 className="text-xl lg:text-3xl mb-1 text-justify group-hover/link:opacity-90 transition-opacity duration-500 font-black text-[#292929] dark:text-white font-sans">
            {post.title}
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            {post.publisherName}
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            {formatDate(post.publishedAt, "MMMM DD, YYYY")}
          </p>
        </div>
      )}

      {/* Post Body */}
      {!isLoading && <SlicedBody body={post.body} length={1} />}
    </Link>
  );
}
