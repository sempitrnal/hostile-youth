import PostImage from '@/components/PostImage';
import PostPagePhotosCarousel from '@/components/PostPagePhotosCarousel';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { client, urlFor } from '@/sanity/client';
import { formatDate } from '@/utils/dateFormatter';
import {
  PortableText,
  PortableTextReactComponents,
  type SanityDocument,
} from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const options = { next: { revalidate: 30 } };
interface PostPageProps {
  params: Promise<{ slug: string }>;
}
export const dynamicParams = true;
export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "post"]{ slug }`);
  return posts.map((post: any) => ({ slug: post.slug.current }));
}
export async function generateMetadata({ params }: PostPageProps) {
  const post = await getPostData((await params).slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post does not exist.',
    };
  }

  return {
    title: `${post.title} | Hostile Youth Records`, // Replace "Your Blog Name"
    description: post.body
      ? post.body[0]?.children[0]?.text?.slice(0, 150) || post.title
      : post.title, // Truncate first text block or fallback to title
    openGraph: {
      title: `${post.title} | Hostile Youth Records`,
      description: post.body
        ? post.body[0]?.children[0]?.text?.slice(0, 150) || post.title
        : post.title,
      url: `https://hostile-youth.vercel.app/${(await params).slug}`,
      image: urlFor(post.image)?.url(),
      images: post.images
        ? post.images.map((image: any) => ({
            url: urlFor(image)?.url(),
            alt: post.title,
            width: 1200,
            height: 630,
          }))
        : [],
      type: 'article',
      publishedTime: post.publishedAt,
      siteName: 'Hostile Youth Records',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Hostile Youth Records`,
      description: post.body
        ? post.body[0]?.children[0]?.text?.slice(0, 150) || post.title
        : post.title,
      images: post.images
        ? post.images.map((image: any) => ({
            url: urlFor(image)?.url(),
            alt: post.title,
          }))
        : [],
    },
  };
}
async function getPostData(slug: string): Promise<SanityDocument | null> {
  return client.fetch(POST_QUERY, { slug }, options);
}
export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostData((await params).slug);
  if (!post) {
    return <div>Post not found</div>;
  }

  const components: Partial<PortableTextReactComponents> = {
    types: {
      code: ({ value }: { value: any }) => (
        <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-white">
          <code className="font-mono text-sm">{value.code}</code>
        </pre>
      ),
      iframe: ({ value }: { value: any }) => (
        <div className="relative overflow-hidden pt-[56.25%]">
          <iframe
            src={value.url}
            title={value.title || 'Embedded Iframe'}
            className="absolute left-0 top-0 h-full w-full border-none"
            allowFullScreen
          />
        </div>
      ),
      html: ({ value }: { value: any }) => (
        <div
          dangerouslySetInnerHTML={{ __html: value.html }}
          className="prose my-5 max-w-full"
        />
      ),
      image: ({ value }) => (
        <div className="my-6">
          {value?.asset && (
            <Image
              src={urlFor(value.asset._ref)?.url()!}
              alt={value.alt || 'Sanity Image'}
              width={800}
              height={450}
              className="mx-auto my-2 w-full rounded-lg"
            />
          )}
        </div>
      ),
      video: ({ value }) => (
        <div className="my-6">
          <video
            src={value}
            controls
            className="mx-auto my-2 w-full rounded-lg"
          ></video>
        </div>
      ),
    },
    block: {
      h1: ({ children }) => (
        <h1 className="my-4 text-4xl font-bold text-gray-900 dark:text-white">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="my-4 text-3xl font-semibold text-gray-800 dark:text-white">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="my-4 text-2xl font-semibold text-gray-700 dark:text-white">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="my-4 text-xl font-semibold text-gray-700 dark:text-white">
          {children}
        </h4>
      ),
      h5: ({ children }) => (
        <h5 className="my-4 text-lg font-semibold text-gray-600 dark:text-white">
          {children}
        </h5>
      ),
      h6: ({ children }) => (
        <h6 className="my-4 text-lg font-medium text-gray-500 dark:text-white">
          {children}
        </h6>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-4 border-l-4 border-gray-400 pl-4 italic text-gray-600">
          {children}
        </blockquote>
      ),
      normal: ({ children }) => (
        <p className="my-2 text-justify text-lg text-stone-600 dark:text-gray-200">
          {children}
        </p>
      ),
    },
    marks: {
      link: ({ children, value }) => {
        const target = (value?.href || '').startsWith('http')
          ? '_blank'
          : undefined;
        return (
          <Link
            href={value?.href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            className="text-white underline hover:text-white/80"
          >
            {children}
          </Link>
        );
      },
    },
  };
  return (
    <main className="">
      <Breadcrumb className="mb-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link
              className="font-sans text-xl font-semibold lowercase transition-colors hover:text-foreground"
              href="/"
            >
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage className="font-sans text-xl font-semibold lowercase transition-colors hover:text-foreground">
              {post.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="lg:px-20">
        <h1 className="mb-2 text-4xl font-bold">{post.title}</h1>
        <div className="">
          <p className="text-stone-500 dark:text-stone-200">
            by {post.publisherName}
          </p>
          <p className="text-sm text-stone-400 dark:text-stone-400">
            {formatDate(new Date(post.publishedAt), 'MMMM DD, YYYY')}
          </p>
          <div className="my-5">
            <PostImage alt={post.title} image={urlFor(post.image)?.url()!} />
          </div>
          {Array.isArray(post.images) && (
            <h2 className="mb-5 mt-8 font-sans text-2xl font-bold">photos</h2>
          )}
          {post.images && <PostPagePhotosCarousel post={post} />}
          {Array.isArray(post.body) && (
            <PortableText value={post.body} components={components} />
          )}
        </div>
      </div>
    </main>
  );
}
