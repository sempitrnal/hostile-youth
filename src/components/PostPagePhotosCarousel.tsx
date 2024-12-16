import { urlFor } from "@/sanity/client";
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
    </div>
  );
};

export default PostPagePhotosCarousel;
