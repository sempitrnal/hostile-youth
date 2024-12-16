import { type SanityDocument } from "next-sanity";
import Link from "next/link";

import { SlicedBody } from "@/components/SlicedPortableText";
import { client, urlFor } from "@/sanity/client";
import { formatDate } from "@/utils/dateFormatter";
import Image from "next/image";

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
  const postImageUrl = (post: any) => {
    return post.image
      ? urlFor(post.image)?.width(1920).height(1080).url()
      : null;
  };

  return (
    <main className="container max-w-4xl min-h-screen p-4 mx-auto sm:p-8">
      <h1 className="mb-10 text-5xl font-dela">NEWS</h1>
      <ul className="flex flex-col pb-32 gap-y-20">
        {posts.map((post) => (
          <li className="" key={post._id}>
            <Link
              className="flex flex-col group/link "
              href={`/${post.slug.current}`}
            >
              {postImageUrl(post) && (
                <Image
                  className="object-cover h-full mb-2 rounded-md shadow-lg"
                  src={postImageUrl(post)!}
                  alt={post.title}
                  width={1920}
                  height={1080}
                  priority
                />
              )}
              <div className="">
                <h2 className="text-xl lg:text-3xl mb-1 text-justify  group-hover/link:opacity-90 transition-opacity duration-500  font-black text-[#292929] dark:text-white font-sans  ">
                  {post.title}
                </h2>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  {post.publisherName}
                </p>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  {formatDate(post.publishedAt, "MMMM DD, YYYY")}
                </p>
              </div>
              <SlicedBody body={post.body} length={1} />{" "}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
