import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import Link from "next/link";

export const SlicedBody = ({
  body,
  length = 5,
}: {
  body: any;
  length?: number;
}) => {
  const components: Partial<PortableTextReactComponents> = {
    types: {
      code: ({ value }: { value: any }) => (
        <pre className="p-4 overflow-x-auto text-white bg-gray-900 rounded-lg">
          <code className="font-mono text-sm">{value.code}</code>
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
          className="max-w-full prose"
        />
      ),
      image: () => null,
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
        <blockquote className="pl-4 italic text-gray-600 border-l-4 border-gray-400">
          {children}
        </blockquote>
      ),
      normal: ({ children }) => (
        <p className="text-sm text-justify text-stone-500 dark:text-gray-100">
          {children}
        </p>
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
            className="underline text-stone-900 hover:text-stone-800 dark:text-white dark:hover:text-white/80"
          >
            {children}
          </Link>
        );
      },
    },
  };

  return <PortableText value={body.slice(0, length)} components={components} />;
};
