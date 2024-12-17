import { urlFor } from '@/sanity/client';
import { PortableTextReactComponents } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';

export const components: Partial<PortableTextReactComponents> = {
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
        className="prose max-w-full"
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
            className="mx-auto my-20 rounded-lg"
          />
        )}
      </div>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="my-4 text-4xl font-bold text-gray-900">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="my-4 text-3xl font-semibold text-gray-800">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="my-4 text-2xl font-semibold text-gray-700">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="my-4 text-xl font-semibold text-gray-700">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="my-4 text-lg font-semibold text-gray-600">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="my-4 text-lg font-medium text-gray-500">{children}</h6>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-gray-400 pl-4 italic text-gray-600">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="my-2 text-justify text-lg text-gray-600">{children}</p>
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
          className="text-purple-600 underline hover:text-purple-800"
        >
          {children}
        </Link>
      );
    },
  },
};
