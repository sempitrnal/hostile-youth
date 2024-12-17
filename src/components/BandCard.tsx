import { Band } from "@/app/bands/page";
import { urlFor } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";

interface BandCardProps {
  band: Band;
}

const BandCard = ({ band }: BandCardProps) => {
  const imgUrl = urlFor(band.image)?.url()!;

  return (
    <Link
      href={`/bands/${band.slug.current}`}
      className="flex items-start gap-5 hover:underline"
    >
      <Image
        src={imgUrl}
        alt={band.bandName}
        width={300}
        height={300}
        className="rounded-full object-cover w-20 h-20"
      />
      <div className="flex flex-col ">
        <h3 className="text-lg font-semibold font-sans mt-2">
          {band.bandName}
        </h3>
        <p className="text-stone-700 dark:text-stone-300">
          {band.bandDescription}
        </p>
      </div>
    </Link>
  );
};

export default BandCard;
