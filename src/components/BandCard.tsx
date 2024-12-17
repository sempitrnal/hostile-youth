import { Band } from '@/app/bands/page';
import { urlFor } from '@/sanity/client';
import Image from 'next/image';
import Link from 'next/link';

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
        className="h-20 w-20 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="mt-2 font-sans text-lg font-semibold">
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
