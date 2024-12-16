import { urlFor } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import Image from "next/image";

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
                    <Image
                      src={urlFor(image)?.url() || "/fallback.jpg"} // Ensure fallback for invalid URLs
                      alt={post.title || "Image"}
                      width={1920}
                      height={1080}
                      className="object-cover w-full transition-all cursor-grab "
                    />
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:block" />
          <CarouselNext className="hidden lg:block" />
        </Carousel>
      )}
    </div>
  );
};

export default PostPagePhotosCarousel;
