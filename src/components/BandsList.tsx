"use client";

import { Band } from "@/app/bands/page";
import BandCard from "@/components/BandCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";

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
    const query = e.target.value.replace(/[^\w\s]/gi, "").trim();
    setSearchQuery(query);

    // Update URL params
    const newUrl = query
      ? `/bands?query=${encodeURIComponent(query)}`
      : `/bands`;

    router.push(newUrl, { scroll: false });

    fetchBands(query);
  };

  // Group bands alphabetically
  const groupedBands = useMemo(() => {
    return bands.reduce((acc: Record<string, Band[]>, band) => {
      const firstLetter = band.bandName[0]?.toUpperCase() || "#"; // Default to '#' for empty names
      if (!acc[firstLetter]) acc[firstLetter] = [];
      acc[firstLetter].push(band);
      return acc;
    }, {});
  }, [bands]);

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

      {/* Alphabetical Bands List */}
      {!loading && Object.keys(groupedBands).length > 0 ? (
        <div>
          {Object.keys(groupedBands)
            .sort() // Sort alphabetically
            .map((letter) => (
              <div key={letter} className="mb-6">
                <h2 className="mb-4 text-2xl font-dela">{letter}</h2>
                <div className="flex flex-col gap-5">
                  {groupedBands[letter].map((band) => (
                    <BandCard key={band._id} band={band} />
                  ))}
                </div>
              </div>
            ))}
        </div>
      ) : !loading && bands.length === 0 ? (
        <p className="text-lg text-gray-500">No bands found.</p>
      ) : null}
    </>
  );
};

export default BandsList;
