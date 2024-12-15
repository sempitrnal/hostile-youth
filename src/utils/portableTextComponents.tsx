import { urlFor } from "@/sanity/client";
import { PortableTextReactComponents } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

export const components: Partial<PortableTextReactComponents> = {
  types: {
    code: ({ value }: { value: any }) => (
      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
        <code className="text-sm font-mono">{value.code}</code>
      </pre>
    ),
    iframe: ({ value }: { value: any }) => (
      <div className="relative pt-[56.25%] overflow-hidden">
        <iframe
          src={value.url}
          title={value.title || "Embedded Iframe"}
          className="absolute top-0 left-0 w-full h-full border-none"
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
            alt={value.alt || "Sanity Image"}
            width={800}
            height={450}
            className="rounded-lg mx-auto my-20"
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
      <h2 className="text-3xl font-semibold my-4 text-gray-800">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold my-4 text-gray-700">{children}</h3>
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
