import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full   h-full transition-colors border-gray-50 dark:border-stone-800 bg-[#0c0cff] dark:bg-[#91ee2e]">
      <div className="container flex flex-col items-center justify-center gap-5 p-8 mx-auto">
        <div className="flex flex-col items-center gap-3">
          <p className=" text-center bg text-4xl lg:text-5xl text-white dark:text-stone-900 font-bold lowercase">
            HOSTILE YOUTH
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link target="_blank" href="https://www.facebook.com/HOSTILEYOUTH">
            <span className="text-2xl text-white dark:text-stone-900  transition-opacity hover:opacity-80">
              facebook
            </span>
          </Link>
          <Link
            target="_blank"
            href="https://www.instagram.com/hostileyouthrecords/"
          >
            <span className="text-2xl text-white dark:text-stone-900 transition-opacity hover:opacity-80">
              ig
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
