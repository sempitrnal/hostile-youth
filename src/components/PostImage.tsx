"use client";
import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton"; // Assume this is a reusable skeleton component

export default function PostImage({
  image,
  alt,
}: {
  image: string | null;
  alt: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-80">
      {/* Loader */}
      {isLoading && (
        <Skeleton className="absolute top-0 left-0 w-full h-full rounded-md" />
      )}

      {/* Image */}
      <Image
        src={image || "/fallback.jpg"} // Fallback for invalid URLs
        alt={alt || "Image"}
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
  );
}
