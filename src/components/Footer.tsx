import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="h-full w-full border-gray-50 bg-[#0c0cff] transition-colors dark:border-stone-800 dark:bg-[#91ee2e]">
      <div className="container mx-auto flex flex-col items-center justify-center gap-5 p-8">
        <div className="flex flex-col items-center gap-3">
          <p className="bg text-center text-4xl font-bold lowercase text-white dark:text-stone-900 lg:text-5xl">
            HOSTILE YOUTH
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link target="_blank" href="https://www.facebook.com/HOSTILEYOUTH">
            <span className="text-2xl text-white transition-opacity hover:opacity-80 dark:text-stone-900">
              facebook
            </span>
          </Link>
          <Link
            target="_blank"
            href="https://www.instagram.com/hostileyouthrecords/"
          >
            <span className="text-2xl text-white transition-opacity hover:opacity-80 dark:text-stone-900">
              ig
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
