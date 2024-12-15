import { client, urlFor } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import {
  PortableText,
  PortableTextReactComponents,
  type SanityDocument,
} from "next-sanity";
import Image from "next/image";
import Link from "next/link";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const options = { next: { revalidate: 30 } };
interface PostPageProps {
  params: { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    { slug },
    options
  );

  const postImageUrl = post.image ? urlFor(post.image)?.url() : null;
  const components: Partial<PortableTextReactComponents> = {
    types: {
      code: ({ value }: { value: any }) => (
        <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
          <code className="text-sm font-mono">{value.code}</code>
        </pre>
      ),
      iframe: ({ value }: { value: any }) => (
        <div className="relative pt-[56.25%] overflow-hidden ">
          <iframe
            src={value.url}
            title={value.title || "Embedded Iframe"}
            className="absolute top-0 left-0 w-full h-full border-none "
            allowFullScreen
          />
        </div>
      ),
      html: ({ value }: { value: any }) => (
        <div
          dangerouslySetInnerHTML={{ __html: value.html }}
          className="prose max-w-full my-2"
        />
      ),
      image: ({ value }) => (
        <div className="my-6">
          {value?.asset && (
            <Image
              src={urlFor(value.asset._ref)?.url()!}
              alt={value.alt || "Sanity Image"}
              width={800}
              height={450}
              className="rounded-lg mx-auto my-2"
            />
          )}
        </div>
      ),
    },
    block: {
      h1: ({ children }) => (
        <h1 className="text-4xl font-bold my-4 text-gray-900">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-3xl font-semibold my-4 text-gray-800">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-2xl font-semibold my-4 text-gray-700">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-xl font-semibold my-4 text-gray-700">{children}</h4>
      ),
      h5: ({ children }) => (
        <h5 className="text-lg font-semibold my-4 text-gray-600">{children}</h5>
      ),
      h6: ({ children }) => (
        <h6 className="text-lg font-medium my-4 text-gray-500">{children}</h6>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600 my-4">
          {children}
        </blockquote>
      ),
      normal: ({ children }) => (
        <p className="text-lg  my-2 text-justify text-gray-600">{children}</p>
      ),
    },
    marks: {
      link: ({ children, value }) => {
        const target = (value?.href || "").startsWith("http")
          ? "_blank"
          : undefined;
        return (
          <Link
            href={value?.href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            className="text-purple-600 hover:text-purple-800 underline"
          >
            {children}
          </Link>
        );
      },
    },
  };

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        <Image
          src={postImageUrl}
          alt={post.title}
          className="aspect-video rounded-xl"
          width="1050"
          height="500"
          quality={100}
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="prose">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(post.body) && (
          <PortableText value={post.body} components={components} />
        )}
      </div>
    </main>
  );
}
