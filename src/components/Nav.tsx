"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "News", href: "/" },
  { name: "Bands", href: "/bands" },
  { name: "Merch", href: "/merch" },
];

const staggeredNavLinks = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 },
  }),
};

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Close menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 left-0 z-40 w-full flex h-20 bg-white text-black  dark:text-white transition-all ${
        hasShadow
          ? "shadow-md dark:shadow-sm dark:shadow-[rgba(229,229,229,0.17)]"
          : ""
      } dark:bg-[#f82424]`}
    >
      <div className="container flex items-center justify-between max-w-4xl p-4 mx-auto sm:p-8">
        {/* Logo */}
        <Link className="cursor-pointer hover:opacity-90" href="/">
          <Image
            className="rounded-sm"
            src="/assets/hostile-youth.png"
            alt="Logo"
            width={80}
            height={80}
          />
        </Link>

        <div className="flex items-center gap-2 lg:gap-10">
          {/* Burger Menu Button for Small Screens */}
          <div className="translate-y-1 lg:hidden">
            <button
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              className="text-black dark:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 12h16.5m-16.5-6.75h16.5m-16.5 13.5h16.5"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute top-full px-10 pt-10 pb-[100vh] left-0 w-full bg-white dark:bg-[#0e0e0e] shadow-md flex flex-col lg:hidden"
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href} // Use link.href only
                    custom={index}
                    variants={staggeredNavLinks}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="flex flex-col w-full gap-5" // Full width for mobile
                  >
                    <Link
                      href={link.href}
                      onClick={() => toggleMenu()}
                      className="p-4 text-xl font-extrabold text-yellow-500 uppercase font-dela dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Large Screen Menu */}
          <div className="hidden lg:flex lg:gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href} // Unique key
                href={link.href}
                className="text-xl font-extrabold text-blue-600 uppercase transition-all duration-300 font-dela dark:text-white lg:hover:opacity-80"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
