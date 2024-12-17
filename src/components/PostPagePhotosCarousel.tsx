"use client";
import { urlFor } from "@/sanity/client";
import { motion } from "framer-motion";
import { SanityDocument } from "next-sanity";
import PostImage from "./PostImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const PostPagePhotosCarousel = ({ post }: { post: SanityDocument }) => {
  return (
    <div className="mx-auto mb-10 lg:w-full">
      {Array.isArray(post.images) && post.images.length > 0 && (
        <Carousel>
          <CarouselContent className="-ml-2 md:-ml-4">
            {post.images.map((image: any, index: number) => {
              if (!image || !image.asset) return null; // Validate image object
              return (
                <CarouselItem
                  className="pl-2 md:pl-4 lg:basis-1/2"
                  key={image._key || index}
                >
                  <div className="overflow-hidden rounded-lg">
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
          delay: 1.5,
        }}
        className="lg:hidden flex justify-center items-center mt-5 text-sm text-gray-500 dark:text-gray-400"
      >
        swipe to view more
      </motion.div>
    </div>
  );
};

export default PostPagePhotosCarousel;
