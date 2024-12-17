import BandPageComponent from "@/components/BandPageComponent";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { client, urlFor } from "@/sanity/client";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Band } from "../page";

const BAND_QUERY = `*[_type == "band" && slug.current == $slug][0]`;
interface BandPageProps {
  params: Promise<{ slug: string }>;
}
const options = { next: { revalidate: 30 } };

export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "band"]{ slug }`);
  return posts.map((post: any) => ({ slug: post.slug.current }));
}
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  // fetch data
  const bandData = await getBandData(slug);

  return {
    title: bandData?.bandName,
    description: bandData?.bandDescription,
    openGraph: {
      title: bandData?.bandName,
      description: bandData?.bandDescription,
      images: bandData?.image
        ? [{ url: urlFor(bandData?.image)?.url()!, alt: bandData?.bandName }]
        : [],
      url: `https://hostile-youth.vercel.app/bands/${slug}`,
      type: "website",
    },
  };
}
async function getBandData(slug: string): Promise<Band | null> {
  return client.fetch(BAND_QUERY, { slug }, options);
}
const BandPage = async ({ params }: BandPageProps) => {
  const { slug } = await params;

  const band = await getBandData(slug);
  if (!band) return notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: band.bandName,
    description: band.bandDescription,
    image: urlFor(band.image)?.url()!,
    url: band.url,
  };

  return (
    <main className="">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link
              className="lowercase text-xl transition-colors font-semibold font-sans hover:text-foreground"
              href="/"
            >
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link
              className="lowercase text-xl transition-colors font-semibold font-sans hover:text-foreground"
              href="/bands"
            >
              Bands
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className=" text-xl text-stone-800 dark:text-white transition-colors font-black font-sans hover:text-foreground">
              {band.bandName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <BandPageComponent band={band} />
    </main>
  );
};

export default BandPage;
