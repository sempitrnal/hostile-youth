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
              className="rounded-lg mx-auto my-2 w-full"
            />
          )}
        </div>
      ),
    },
    block: {
      h1: ({ children }) => (
        <h1 className="text-4xl font-bold my-4 dark:text-white text-gray-900">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-3xl font-semibold my-4 dark:text-white text-gray-800">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-2xl font-semibold my-4 dark:text-white text-gray-700">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-xl font-semibold my-4 dark:text-white text-gray-700">
          {children}
        </h4>
      ),
      h5: ({ children }) => (
        <h5 className="text-lg font-semibold my-4 dark:text-white text-gray-600">
          {children}
        </h5>
      ),
      h6: ({ children }) => (
        <h6 className="text-lg font-medium my-4 dark:text-white text-gray-500">
          {children}
        </h6>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600 my-4">
          {children}
        </blockquote>
      ),
      normal: ({ children }) => (
        <p className="text-lg  my-2 text-justify dark:text-gray-200 text-gray-600">
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
            className="text-stone-900 hover:text-stone-800 dark:text-white dark:hover:text-white/80 underline"
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
        <h1 className="text-7xl text-stone-900 font-medium dark:text-white">
          {band.bandName}
        </h1>
        <p className="text-stone-500 dark:text-stone-200">
          {band.bandDescription}
        </p>
      </div>
      <div className="my-5 flex gap-2 items-center">
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
        className=" rounded-md object-cover w-full h-[25rem]"
      />
      {Array.isArray(band.body) && (
        <PortableText value={band.body} components={components} />
      )}
    </>
  );
};

export default BandPageComponent;
