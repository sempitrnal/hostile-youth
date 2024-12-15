import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Bands", href: "/bands" },
];
const Nav = () => {
  return (
    <nav className="flex justify-between transition-all items-center px-5 h-20 bg-white text-black dark:bg-[#0c0c0c] relative dark:text-white shadow-sm ">
      <div className="flex gap-8 items-center">
        <Link className="cursor-pointer hover:opacity-90 " href="/">
          <Image
            className="rounded-sm"
            src="/assets/hostile-youth.png"
            alt="Logo"
            width={80}
            height={80}
          />
        </Link>
        {navLinks.map((link) => {
          return (
            <Link
              className="hover:opacity-80 dark:hover:opacity-70 transition-opacity duration-300"
              key={link.href}
              href={link.href}
            >
              {link.name}
            </Link>
          );
        })}
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Nav;
