// Search input.
// Responsibilities:
// - Update search term in UI store
// - Stay lightweight and reusable
// - Support booking filtering cleanly

import React from 'react';
import { Search } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const SearchBar = () => {
  const searchTerm = useUIStore((state) => state.searchTerm);
  const setSearchTerm = useUIStore((state) => state.setSearchTerm);

  return (
    <div className="flex relative h-10 min-w-[250px]">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search Sales by phone / name"
        className="h-full w-full rounded-md border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-700 outline-none transition focus:border-gray-300"
      />
    </div>
  );
};

export default SearchBar;
