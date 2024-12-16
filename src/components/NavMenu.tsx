import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Bands", href: "/bands" },
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
          className="lg:flex lg:gap-5 items-center absolute lg:relative top-full left-0 w-full lg:w-auto border bg-white dark:bg-[#0e0e0e] shadow-md flex flex-col lg:flex-row"
        >
          {navLinks.map((link) => (
            <motion.div key={link.href} variants={linkVariants}>
              <Link
                href={link.href}
                onClick={() => window.innerWidth < 1024 && toggleMenu()}
                className="lg:hover:opacity-80 uppercase font-dela font-extrabold text-xl text-yellow-500 dark:text-white lg:hover:bg-transparent hover:bg-[#f5f5f5] dark:hover:bg-[#141414] dark:hover:opacity-70 border-b lg:border-none w-full align-middle transition-colors duration-300 p-8 lg:p-0 drop-shadow-[0_35px_35px_rgba(0,0,0,0.795)]"
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
