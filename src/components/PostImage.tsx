'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Skeleton } from './ui/skeleton'; // Assume this is a reusable skeleton component

export default function PostImage({
  image,
  alt,
}: {
  image: string | null;
  alt: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative h-80 w-full">
      {/* Loader */}
      {isLoading && (
        <Skeleton className="absolute left-0 top-0 h-full w-full rounded-md" />
      )}

      {/* Image */}
      <Image
        src={image || '/fallback.jpg'} // Fallback for invalid URLs
        alt={alt || 'Image'}
        width={1920}
        height={1080}
        priority
        fetchPriority="high"
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)} // Set loading to false when done
      />
    </div>
  );
}
