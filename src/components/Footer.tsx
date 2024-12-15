import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full  border-t-[.5px] transition-all border-gray-100 dark:border-stone-800 bg-white dark:bg-[#0e0e0e]">
      <div className="container flex flex-col items-center justify-center gap-5 p-8 mx-auto">
        <p className="text-xl text-center bg lg:text-3xl text-stone-900 dark:text-white font-dela">
          &copy; HOSTILE YOUTH RECORDS
        </p>
        <div className="flex items-center gap-1">
          <Link target="_blank" href="https://www.facebook.com/HOSTILEYOUTH">
            <FaFacebook className="text-2xl transition-opacity hover:opacity-80" />
          </Link>
          <Link
            target="_blank"
            href="https://www.instagram.com/hostileyouthrecords/"
          >
            <FaInstagram className="text-2xl transition-opacity hover:opacity-80" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
