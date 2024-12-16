"use client";

import { urlFor } from "@/sanity/client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface NewsResult {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  image?: any;
}

interface BandResult {
  _id: string;
  bandName: string;
  slug: { current: string };
  bandDescription: string;
  image?: any;
}
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between children animations
      delayChildren: 0.1, // Initial delay
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="container max-w-4xl min-h-screen p-4 mx-auto overflow-x-hidden lg:p-8">
          <p className="uppercase font-dela">Loading...</p>
        </main>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<{
    news: NewsResult[];
    bands: BandResult[];
  }>({
    news: [],
    bands: [],
  });

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/search?query=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <main className="container max-w-4xl min-h-screen p-4 mx-auto overflow-x-hidden lg:p-8">
      <h1 className="mb-10 text-xl uppercase font-dela">
        Search Results for "{query}"
      </h1>

      {loading && <p className="uppercase font-dela">Loading...</p>}

      {!loading && !results.news.length && !results.bands.length && (
        <p className="uppercase font-dela">No results found.</p>
      )}

      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={containerVariants} // Parent container controls stagger
          className="space-y-12"
        >
          {/* News Section */}
          {!loading && results.news.length > 0 && (
            <motion.section variants={itemVariants}>
              <motion.h2
                variants={itemVariants}
                className="mb-5 text-5xl uppercase font-dela"
              >
                News
              </motion.h2>
              <motion.div variants={containerVariants} className="grid gap-6">
                {results.news.map((post) => (
                  <motion.div key={post._id} variants={itemVariants}>
                    <Link
                      href={`/${post.slug.current}`}
                      className="flex items-center gap-4 hover:underline"
                    >
                      {post.image && (
                        <Image
                          src={urlFor(post.image)?.url()!}
                          alt={post.title}
                          width={300}
                          height={300}
                          className="object-cover w-32 h-20 rounded aspect-video"
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-medium">{post.title}</h3>
                        <p className="text-sm text-gray-600">
                          {post.description}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          )}

          {/* Bands Section */}
          {!loading && results.bands.length > 0 && (
            <motion.section variants={itemVariants}>
              <motion.h2
                variants={itemVariants}
                className="mb-5 text-5xl uppercase font-dela"
              >
                Bands
              </motion.h2>
              <motion.div variants={containerVariants} className="grid gap-6">
                {results.bands.map((band) => (
                  <motion.div key={band._id} variants={itemVariants}>
                    <Link
                      href={`/bands/${band.slug.current}`}
                      className="flex items-center gap-4 hover:underline"
                    >
                      {band.image && (
                        <Image
                          src={urlFor(band.image)?.url()!}
                          alt={band.bandName}
                          width={300}
                          height={300}
                          className="object-cover w-20 h-20 rounded-full aspect-square"
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-medium">{band.bandName}</h3>
                        <p className="text-sm text-gray-600">
                          {band.bandDescription}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
