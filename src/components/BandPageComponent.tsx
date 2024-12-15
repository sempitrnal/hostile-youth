import { Band } from "@/app/bands/page";
import { urlFor } from "@/sanity/client";
import { PortableText, PortableTextReactComponents } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { FaBandcamp, FaFacebook, FaInstagram, FaSpotify } from "react-icons/fa";

const BandPageComponent = ({ band }: { band: Band }) => {
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
          className="max-w-full my-2 prose"
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
              className="w-full mx-auto my-2 rounded-lg"
            />
          )}
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
        <blockquote className="pl-4 my-4 italic text-gray-600 border-l-4 border-gray-400">
          {children}
        </blockquote>
      ),
      normal: ({ children }) => (
        <p className="my-2 font-sans text-lg text-justify text-gray-500 dark:text-gray-200">
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

  const { socialLinks } = band;

  const bandImageUrl = urlFor(band.image)?.url()!;

  return (
    <>
      <div className="my-10">
        <h1 className="text-5xl font-medium transition-all font-dela lg:text-7xl text-stone-800 dark:text-white">
          {band.bandName}
        </h1>
        <p className="text-stone-500 dark:text-stone-200">
          {band.bandDescription}
        </p>
      </div>
      <div className="flex items-center gap-2 my-5">
        {socialLinks && socialLinks.instagram && (
          <Link
            target="_blank"
            href={socialLinks.instagram}
            className="hover:underline "
          >
            <FaInstagram className="text-3xl" />
          </Link>
        )}
        {socialLinks && socialLinks.bandcamp && (
          <Link
            target="_blank"
            href={socialLinks.bandcamp}
            className="hover:underline"
          >
            <FaBandcamp className="text-3xl " />
          </Link>
        )}
        {socialLinks && socialLinks.spotify && (
          <Link
            target="_blank"
            href={socialLinks.spotify}
            className="hover:underline"
          >
            <FaSpotify className="text-3xl " />
          </Link>
        )}
        {socialLinks && socialLinks.facebook && (
          <Link
            target="_blank"
            href={socialLinks.facebook}
            className="hover:underline"
          >
            <FaFacebook className="text-3xl " />
          </Link>
        )}
      </div>
      <Image
        src={bandImageUrl}
        alt={band.bandName}
        width={1920}
        height={1080}
        className="object-cover w-full h-full rounded-md "
      />
      {Array.isArray(band.body) && (
        <PortableText value={band.body} components={components} />
      )}
    </>
  );
};

export default BandPageComponent;
