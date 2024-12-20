import { Band } from '@/app/bands/page';
import { urlFor } from '@/sanity/client';
import { PortableText, PortableTextReactComponents } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { FaBandcamp, FaFacebook, FaInstagram, FaSpotify } from 'react-icons/fa';
import GenreBadge from './GenreBadge';

const BandPageComponent = ({ band }: { band: Band }) => {
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
          className="prose my-2 max-w-full"
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
        <p className="my-2 text-justify font-sans text-lg text-stone-600 dark:text-gray-200">
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
            className="text-stone-900 underline hover:text-stone-800 dark:text-white dark:hover:text-white/80"
          >
            {children}
          </Link>
        );
      },
    },
  };

  const { socialLinks } = band;
  const { genre } = band;
  console.log(genre);
  const bandImageUrl = urlFor(band.image)?.url()!;

  return (
    <>
      <div className="mt-10">
        <div className="flex items-center gap-5">
          <Image
            src={bandImageUrl}
            alt={band.bandName}
            width={500}
            height={500}
            className="aspect-square h-24 w-24 rounded-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <h1 className="font-sans text-5xl font-medium text-stone-800 transition-colors dark:text-white lg:text-7xl">
                {band.bandName}
              </h1>
              <p className="text-stone-500 dark:text-stone-200">
                {band.bandDescription}
              </p>
            </div>
            {genre && <GenreBadge genre={genre} />}
          </div>
        </div>
      </div>
      <div className="my-5 flex items-center gap-2">
        {socialLinks && socialLinks.instagram && (
          <Link
            target="_blank"
            href={socialLinks.instagram}
            className="hover:underline"
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
            <FaBandcamp className="text-3xl" />
          </Link>
        )}
        {socialLinks && socialLinks.spotify && (
          <Link
            target="_blank"
            href={socialLinks.spotify}
            className="hover:underline"
          >
            <FaSpotify className="text-3xl" />
          </Link>
        )}
        {socialLinks && socialLinks.facebook && (
          <Link
            target="_blank"
            href={socialLinks.facebook}
            className="hover:underline"
          >
            <FaFacebook className="text-3xl" />
          </Link>
        )}
      </div>

      {Array.isArray(band.body) && (
        <PortableText value={band.body} components={components} />
      )}
    </>
  );
};

export default BandPageComponent;
