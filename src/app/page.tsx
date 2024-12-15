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
    <main className="container max-w-4xl min-h-screen p-4 mx-auto sm:p-8">
      <h1 className="mb-10 text-5xl font-dela">NEWS</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li className="" key={post._id}>
            <Link
              className="flex flex-col group/link "
              href={`/${post.slug.current}`}
            >
              {postImageUrl(post) && (
                <Image
                  className="rounded-md shadow-lg mb-2 h-[18rem] object-cover"
                  src={postImageUrl(post)!}
                  alt={post.title}
                  width={1920}
                  height={1080}
                />
              )}
              <div className="">
                <h2 className="text-xl lg:text-3xl mb-1 text-justify  group-hover/link:underline  font-black text-[#292929] dark:text-white font-sans  ">
                  {post.title}
                </h2>
                <p className="text-sm text-stone-600 group-hover/link:underline dark:text-stone-400">
                  {formatDate(post.publishedAt, "MMMM DD, YYYY")}
                </p>
              </div>
            </Link>
            <SlicedBody body={post.body} length={3} />
          </li>
        ))}
      </ul>
    </main>
  );
}
