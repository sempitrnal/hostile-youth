import { type SanityDocument } from "next-sanity";
import Link from "next/link";

import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import { SlicedBody } from "@/components/SlicedPortableText";
import { formatDate } from "@/utils/dateFormatter";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt,image,body}`;

const options = { next: { revalidate: 30 } };

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  const postImageUrl = (post: any) => {
    return post.image
      ? urlFor(post.image)?.width(1920).height(1080).url()
      : null;
  };

  console.log(postImageUrl);
  return (
    <main className="container mx-auto min-h-screen max-w-4xl p-8">
      <h1 className="text-5xl font-dela mb-10">NEWS</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li className="peer hover:underline" key={post._id}>
            <Link className="flex flex-col " href={`/${post.slug.current}`}>
              {postImageUrl(post) && (
                <Image
                  className="rounded-md shadow-lg mb-2 h-[18rem] object-cover"
                  src={postImageUrl(post)!}
                  alt={post.title}
                  width={1920}
                  height={1080}
                />
              )}
              <div className="hover:no-underline">
                <h2 className="text-3xl mb-2 font-semibold text-[#232323] dark:text-white font-sans text-justify ">
                  {post.title}
                </h2>
                <p className="text-gray-400 dark:text-gray-400">
                  {formatDate(post.publishedAt, "MMMM DD, YYYY")}
                </p>
                <SlicedBody body={post.body} length={3} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
