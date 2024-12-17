'use client';

import { Band } from '@/app/bands/page';
import BandCard from '@/components/BandCard';
import { useMemo, useState } from 'react';
import { Input } from './ui/input';

const BandsList = ({ initialBands }: { initialBands: Band[] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  // Filter bands locally based on search query
  const filteredBands = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return initialBands.filter(
      (band) =>
        band.bandName.toLowerCase().includes(query) ||
        band.bandDescription.toLowerCase().includes(query),
    );
  }, [searchQuery, initialBands]);

  // Group bands alphabetically for display
  const groupedBands = useMemo(() => {
    return filteredBands.reduce((acc: Record<string, Band[]>, band) => {
      const firstLetter = band.bandName[0]?.toUpperCase() || '#';
      if (!acc[firstLetter]) acc[firstLetter] = [];
      acc[firstLetter].push(band);
      return acc;
    }, {});
  }, [filteredBands]);

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.replace(/[^\w\s]/gi, '').trim();
    setSearchQuery(query);
  };

  return (
    <>
      {/* Search Input */}
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search bands..."
          value={searchQuery}
          onChange={handleSearch}
          className=""
        />
      </div>

      {/* Conditional Rendering: Grouped or Flat List */}
      {filteredBands.length > 0 ? (
        searchQuery ? (
          // Flat list when search query is active
          <div className="flex flex-col gap-5">
            {filteredBands.map((band) => (
              <BandCard key={band._id} band={band} />
            ))}
          </div>
        ) : (
          // Grouped list when no search query
          <div>
            {Object.keys(groupedBands)
              .sort()
              .map((letter) => (
                <div key={letter} className="mb-6">
                  <h2 className="mb-4 font-sans text-4xl font-bold lowercase">
                    {letter}
                  </h2>
                  <div className="flex flex-col gap-5">
                    {groupedBands[letter].map((band) => (
                      <BandCard key={band._id} band={band} />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )
      ) : (
        <p className="text-lg text-gray-500">No bands found.</p>
      )}
    </>
  );
};

export default BandsList;
