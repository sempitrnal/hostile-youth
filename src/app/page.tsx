import Link from "next/link";
import { PortableText, type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";

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
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li className=" hover:underline" key={post._id}>
            <Link className="" href={`/${post.slug.current}`}>
              {postImageUrl(post) && (
                <Image
                  className="rounded-lg shadow-lg"
                  src={postImageUrl(post)!}
                  alt={post.title}
                  width={1920}
                  height={1080}
                />
              )}
              <h2 className="text-xl font-semibold ">{post.title}</h2>
              <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
