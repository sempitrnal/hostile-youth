import BandsList from "@/components/BandsList";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";

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
  const searchQuery = (await searchParams).query || ""; // Get the search query from URL

  const BANDS_QUERY = `*[
    _type == "band"
    && defined(slug.current)
    && active == true
    ${
      searchQuery
        ? `&& (bandName match "*${searchQuery}*" || bandDescription match "*${searchQuery}*")`
        : ""
    }
  ]|order(publishedAt desc)[0...12]{
    _id, bandName, slug, bandDescription, publishedAt, image, body
  }`;

  const bands = await client.fetch<Band[]>(BANDS_QUERY, {}, options);

  return (
    <main className="container max-w-4xl min-h-screen p-8 mx-auto">
      <h1 className="mb-10 text-5xl uppercase font-dela ">Bands</h1>
      <BandsList initialBands={bands} />
    </main>
  );
};

export default Bands;
