import { PortableText, SanityDocument } from "next-sanity";
import { Band } from "../page";
import { client, urlFor } from "@/sanity/client";
import Image from "next/image";
import { components } from "@/utils/portableTextComponents";
import Link from "next/link";

const BAND_QUERY = `*[_type == "band" && slug.current == $slug][0]`;
interface BandPageProps {
  params: { slug: string };
}
const options = { next: { revalidate: 30 } };
const BandPage = async ({ params }: BandPageProps) => {
  const { slug } = params;

  const band = await client.fetch<Band>(BAND_QUERY, { slug }, options);

  const bandImageUrl = urlFor(band.image)?.url()!;
  return (
    <main className="container mx-auto min-h-screen max-w-4xl px-8 py-16 ">
      <Link href="/bands" className="hover:underline ">
        ← Back to bands
      </Link>
      <div className="my-10">
        <h1 className="text-7xl text-stone-900 font-medium">{band.bandName}</h1>
        <p className="text-stone-500">{band.bandDescription}</p>
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
    </main>
  );
};

export default BandPage;
