import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Bands', href: '/bands' },
];

// Variants for the parent container
const menuVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delay between each child
    },
  },
};

// Variants for each nav link
const linkVariants = {
  hidden: { opacity: 0, x: -50 }, // Start from the left
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const NavMenu = ({
  isMenuOpen,
  toggleMenu,
}: {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}) => {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={menuVariants}
          className="absolute left-0 top-full flex w-full flex-col items-center border bg-white shadow-md dark:bg-[#0e0e0e] lg:relative lg:flex lg:w-auto lg:flex-row lg:gap-5"
        >
          {navLinks.map((link) => (
            <motion.div key={link.href} variants={linkVariants}>
              <Link
                href={link.href}
                onClick={() => window.innerWidth < 1024 && toggleMenu()}
                className="w-full border-b p-8 align-middle font-dela text-xl font-extrabold uppercase text-yellow-500 drop-shadow-[0_35px_35px_rgba(0,0,0,0.795)] transition-colors duration-300 hover:bg-[#f5f5f5] dark:text-white dark:hover:bg-[#141414] dark:hover:opacity-70 lg:border-none lg:p-0 lg:hover:bg-transparent lg:hover:opacity-80"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavMenu;
