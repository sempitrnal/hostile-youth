import { type SanityDocument } from "next-sanity";

import PostCard from "@/components/PostCard";
import { client, urlFor } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title,publisherName, slug, publishedAt,image,body}`;

const options = { next: { revalidate: 30 } };

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
    <main className="container max-w-4xl min-h-screen p-4 mx-auto sm:p-8">
      <h1 className="mb-10 text-5xl font-dela">NEWS</h1>
      <ul className="flex flex-col pb-32 gap-y-20">
        {posts.map((post) => (
          <li className="" key={post._id}>
            <PostCard
              post={post}
              postImageUrl={
                post.image
                  ? urlFor(post.image)?.width(1920).height(1080).url()!
                  : null
              }
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
