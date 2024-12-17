"use client";

import BandCard from "@/components/BandCard";
import PostCard from "@/components/PostCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { urlFor } from "@/sanity/client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Band } from "../bands/page";

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
    bands: Band[];
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
      <Breadcrumb className="mb-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link
              className="lowercase text-xl transition-colors font-semibold font-sans hover:text-foreground"
              href="/"
            >
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="lowercase text-xl transition-colors font-semibold font-sans hover:text-foreground">
              search
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="mb-10 text-xl lowercase font-bold font-sans">
        Search Results for "{query}"
      </h1>

      {loading && (
        <p className="text-xl lowercase font-bold font-sans">huwat sa...</p>
      )}

      {!loading && !results.news.length && !results.bands.length && (
        <p className="text-xl lowercase font-bold font-sans">
          No results found.
        </p>
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
                className="text-5xl mb-5 lowercase font-semibold font-sans"
              >
                News
              </motion.h2>
              <motion.div variants={containerVariants} className="grid gap-6">
                {results.news.map((post) => (
                  <PostCard
                    searchPage
                    key={post._id}
                    post={post}
                    postImageUrl={urlFor(post.image)?.url()!}
                  />
                ))}
              </motion.div>
            </motion.section>
          )}

          {/* Bands Section */}
          {!loading && results.bands.length > 0 && (
            <motion.section variants={itemVariants}>
              <motion.h2
                variants={itemVariants}
                className="text-5xl mb-5 lowercase font-semibold font-sans"
              >
                Bands
              </motion.h2>
              <motion.div variants={containerVariants} className="grid gap-6">
                {results.bands.map((band) => (
                  <motion.div key={band._id} variants={itemVariants}>
                    <BandCard band={band} />
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
