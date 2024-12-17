import { type SanityDocument } from "next-sanity";

import PostCard from "@/components/PostCard";
import { client, urlFor } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title,publisherName, slug, publishedAt,image,body}`;

const options = { next: { revalidate: 60 } };

export const generateMetadata = async () => {
  return {
    title: "Hostile Youth Records | Home",
    description:
      "Welcome to Your Hostile Youth Records. Discover the latest news, posts, and updates.",
    openGraph: {
      title: "Hostile Youth Records | Home",
      description:
        "Explore the latest news and articles on Your Blog Name, your source for updates.",
      url: "https://hostile-youth.vercel.app",
      images: [
        {
          url: "https://hostile-youth.vercel.app/assets/hostile-youth.jpg",
          alt: "hostile youth",
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Hostile Youth Records | Home",
      description:
        "Welcome to Your Hostile Youth Records. Discover the latest news, posts, and updates.",
      images: [
        {
          url: "https://hostile-youth.vercel.app/assets/hostile-youth.jpg",
          alt: "hostile youth",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
};
export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className=" ">
      <div className="flex flex-col gap-16">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            postImageUrl={post.image ? urlFor(post.image)?.url()! : null}
          />
        ))}
      </div>
    </main>
  );
}
