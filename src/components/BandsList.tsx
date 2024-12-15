"use client";

import { Band } from "@/app/bands/page";
import BandCard from "@/components/BandCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const BandsList = ({ bands: initialBands }: { bands: Band[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );
  const [bands, setBands] = useState(initialBands);
  const [loading, setLoading] = useState(false);

  // Function to fetch bands based on search input
  const fetchBands = async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/search-bands?query=${query}`);
      if (!res.ok) throw new Error("Failed to fetch bands");
      const data = await res.json();
      setBands(data);
    } catch (err) {
      console.error(err);
      setBands([]);
    } finally {
      setLoading(false);
    }
  };

  // Update search query and fetch data
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Clean the string: trim whitespace and remove special characters
    const query = e.target.value.replace(/[^\w\s]/gi, "").trim();
    console.log("🚀 ~ handleSearch ~ query:", query);

    setSearchQuery(query);

    // Update URL params
    const newUrl = query
      ? `/bands?query=${encodeURIComponent(query)}`
      : `/bands`;

    router.push(newUrl, { scroll: false });

    fetchBands(query);
  };

  return (
    <>
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search bands..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Loading State */}
      {loading && <p className="text-gray-500">Loading...</p>}

      {/* Bands List */}
      <div className="flex flex-col gap-5">
        {!loading && bands.length > 0 ? (
          bands.map((band) => <BandCard key={band._id} band={band} />)
        ) : !loading && bands.length === 0 ? (
          <p className="text-lg text-gray-500">No bands found.</p>
        ) : null}
      </div>
    </>
  );
};

export default BandsList;
