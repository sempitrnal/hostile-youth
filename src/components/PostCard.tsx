"use client";

import { SlicedBody } from "@/components/SlicedPortableText";
import { formatDate } from "@/utils/dateFormatter";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function PostCard({
  post,
  postImageUrl,
}: {
  post: any;
  postImageUrl: string | null;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link
      className={`flex flex-col group/link ${isLoading ? "cursor-default" : "cursor-pointer"}`}
      href={`/${post.slug.current}`}
    >
      <div className="relative w-full h-full overflow-hidden rounded-sm">
        {/* Loader */}
        {isLoading && (
          <Skeleton className="absolute top-0 left-0 w-full h-full rounded-md" />
        )}

        {/* Image */}
        <Image
          src={postImageUrl || "/fallback.jpg"} // Fallback for invalid URLs
          alt={post.title || "Image"}
          width={1920}
          height={1080}
          priority
          fetchPriority="high"
          className={`object-cover w-full h-full transition-all duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoadingComplete={() => setIsLoading(false)} // Set loading to false when done
        />
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
