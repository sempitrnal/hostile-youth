import BandCard from "@/components/BandCard";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
const options = { next: { revalidate: 30 } };
export interface Band extends SanityDocument {
  bandName: string;
  bandDescription: string;
}

const Bands = async () => {
  const BANDS_QUERY = `*[
        _type == "band"
        && defined(slug.current)
      ]|order(publishedAt desc)[0...12]{_id, bandName, slug,bandDescription, publishedAt,image,body}`;
  const bands = await client.fetch<Band[]>(BANDS_QUERY, {}, options);
  console.log(bands);
  return (
    <main className="container mx-auto min-h-screen max-w-4xl p-8 ">
      <h1 className="text-[5rem] font-medium  mb-8">Bands</h1>
      <div className="flex flex-col gap-5">
        {bands.map((band) => (
          <BandCard key={band._id} band={band} />
        ))}
      </div>
    </main>
  );
};

export default Bands;
