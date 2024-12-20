'use client';
import { urlFor } from '@/sanity/client';
import { motion } from 'framer-motion';
import { SanityDocument } from 'next-sanity';
import PostImage from './PostImage';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';

const PostPagePhotosCarousel = ({ post }: { post: SanityDocument }) => {
  return (
    <div className="mx-auto mb-10 overflow-hidden rounded-sm lg:w-full">
      {post.images && (
        <Dialog>
          <DialogTrigger>open</DialogTrigger>
          <DialogTitle>{post.title}</DialogTitle>
          <DialogContent className="bg-trasparent fixed left-[50%] top-[50%] z-50 grid w-[90%] max-w-3xl origin-center translate-x-[-50%] translate-y-[-50%] transform gap-4 rounded-lg border-none p-0 shadow-lg duration-300 data-[state=closed]:scale-95 data-[state=open]:scale-105 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-in-0 data-[state=open]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-100 data-[state=closed]:slide-out-to-top-1/2 data-[state=open]:slide-in-from-top-1/2">
            <PostImage
              alt={post.title}
              image={urlFor(post.images.map((e: any) => e)[0])?.url()!}
            />
          </DialogContent>
        </Dialog>
      )}
      {Array.isArray(post.images) && post.images.length > 0 && (
        <Carousel>
          <CarouselContent className="-ml-2 rounded-sm md:-ml-4">
            {post.images.map((image: any, index: number) => {
              if (!image || !image.asset) return null; // Validate image object
              return (
                <CarouselItem
                  className="pl-2 md:pl-4 lg:basis-1/2"
                  key={image._key || index}
                >
                  <div className="overflow-hidden rounded-sm">
                    <PostImage alt={post.title} image={urlFor(image)?.url()!} />
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      )}
      <motion.div
        initial={{
          opacity: 0,
          x: -50,
        }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.3,
        }}
        className="mt-5 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 lg:hidden"
      >
        swipe to view more
      </motion.div>
    </div>
  );
};

export default PostPagePhotosCarousel;
