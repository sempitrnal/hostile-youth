"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Bands", href: "/bands" },
];

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Close menu when screen width is >= 1024px (lg breakpoint)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={` transition-all sticky top-0 left-0 w-full flex   h-20 bg-white text-black dark:bg-[#0e0e0e] dark:text-white ${
        hasShadow ? "dark:shadow-none shadow-md  dark:border-b-[.5px] " : ""
      }`}
    >
      <div className="flex container justify-between items-center mx-auto   p-8  max-w-4xl ">
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

        <div className="flex gap-2 lg:gap-10 items-center">
          {/* Burger Menu Button for Small Screens */}
          <div className="lg:hidden translate-y-1">
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
          <div
            className={`lg:flex items-center ${
              isMenuOpen
                ? "absolute top-full left-0 w-full border bg-white dark:bg-[#0e0e0e] shadow-md flex flex-col lg:flex-row"
                : "hidden lg:flex"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                onClick={toggleMenu}
                className="lg:hover:opacity-80  lg:hover:bg-transparent hover:bg-[#f5f5f5] dark:hover:bg-[#141414] dark:hover:opacity-70 border-b lg:border-none w-full align-middle transition-all duration-300 p-8 lg:p-0"
                key={link.href}
                href={link.href}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
