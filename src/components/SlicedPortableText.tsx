import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import Link from 'next/link';

// Helper function to truncate text
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const SlicedBody = ({
  body,
  length = 5,
  charLimit = 200,
}: {
  body: any;
  length?: number;
  charLimit?: number; // Maximum number of characters
}) => {
  // Truncate block content with character limit
  const truncatedBody = body.slice(0, length).map((block: any) => {
    if (block._type === 'block' && block.children) {
      // Truncate each child text node
      return {
        ...block,
        children: block.children.map((child: any) => ({
          ...child,
          text: truncateText(child.text, charLimit),
        })),
      };
    }
    return block;
  });

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
          className="prose max-w-full"
        />
      ),
      image: () => null,
    },
    block: {
      normal: ({ children }) => (
        <p className="mt-2 text-justify text-sm text-stone-500 dark:text-stone-500">
          {children}{' '}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600">
          {children}
        </blockquote>
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
            className="text-stone-900 underline hover:text-stone-800 dark:text-white dark:hover:text-white/80"
          >
            {children}
          </Link>
        );
      },
    },
  };

  return <PortableText value={truncatedBody} components={components} />;
};
