import BandsList from '@/components/BandsList';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { client } from '@/sanity/client';
import { SanityDocument } from 'next-sanity';
import Link from 'next/link';

export interface Band extends SanityDocument {
  bandName: string;
  bandDescription: string;
}

const options = { next: { revalidate: 30 } };

const Bands = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const searchQuery = (await searchParams).query || ''; // Get the search query from URL

  const BANDS_QUERY = `*[
    _type == "band"
    && defined(slug.current)
    && active == true
    ${
      searchQuery
        ? `&& (bandName match "*${searchQuery}*" || bandDescription match "*${searchQuery}*")`
        : ''
    }
  ]|order(publishedAt desc)[0...12]{
    _id, bandName, slug, bandDescription, publishedAt, image, body
  }`;

  const bands = await client.fetch<Band[]>(BANDS_QUERY, {}, options);

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
              Bands
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="mb-5 font-sans text-5xl font-semibold lowercase transition-colors hover:text-foreground">
        Bands
      </h1>
      <BandsList initialBands={bands} />
    </main>
  );
};

export default Bands;
