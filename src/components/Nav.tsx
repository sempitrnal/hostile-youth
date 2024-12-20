'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { Input } from './ui/input';

const navLinks = [
  { name: 'News', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Bands', href: '/bands' },
];

const staggeredNavLinks = {
  hidden: { opacity: 0, x: -100 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: -200,
    transition: { delay: i * 0.05 },
  }),
};

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchOpen(false);
    if (isMenuOpen) setIsMenuOpen(false);
    // Redirect to search page with query
    router.push(`/search?q=${searchQuery}`);
  };
  return (
    <nav
      className={`sticky left-0 top-0 z-40 flex h-20 w-full bg-[#fffef4] text-black transition-colors dark:text-white ${
        hasShadow ? 'shadow-sm dark:shadow-[rgba(229,229,229,0.17)]' : ''
      } dark:bg-[#0e0e0e]`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between p-4">
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
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger
              onClick={(e) => {
                e.preventDefault();
                setIsSearchOpen(true);
              }}
            >
              <FaSearch className="hover:stone-700 cursor-pointer text-xl text-stone-900 transition-colors dark:text-white" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-bold lowercase">
                  Search
                </DialogTitle>
                <div className="py-5">
                  <form action="" onSubmit={searchHandler}>
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className=""
                      placeholder=""
                    />
                  </form>
                  <DialogDescription className="my-2 text-sm lowercase text-stone-500 dark:text-stone-200">
                    Search for your favorite bands and news
                  </DialogDescription>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          {/* Burger Menu Button for Small Screens */}
          <div className="translate-y-1 lg:hidden">
            <button
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              className="text-black focus:outline-none dark:text-white"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
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
                  className="h-6 w-6"
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
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { delay: 0.3 } }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 top-full flex w-full flex-col bg-white px-10 pb-[100vh] pt-10 shadow-md dark:bg-[#0e0e0e] lg:hidden"
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href} // Use link.href only
                    custom={index}
                    variants={staggeredNavLinks}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex w-full flex-col gap-5" // Full width for mobile
                  >
                    <Link
                      href={link.href}
                      onClick={() => toggleMenu()}
                      className="rounded-sm p-4 text-xl font-semibold lowercase text-[#0c5dff] transition-colors duration-500 hover:bg-gray-100 dark:text-white dark:hover:bg-[#171717]"
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
                className="font-sans text-xl font-semibold lowercase text-stone-900 transition-colors duration-300 dark:text-white lg:hover:opacity-80"
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
