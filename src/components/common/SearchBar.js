// Reusable search input.
// Responsibilities:
// - Update search term in UI store
// - Stay reusable for dashboard-level filtering
// - Keep first version lightweight

import React from 'react';
import { useUIStore } from '../../store/uiStore';

const SearchBar = () => {
  const searchTerm = useUIStore((state) => state.searchTerm);
  const setSearchTerm = useUIStore((state) => state.setSearchTerm);

  return (
    <div className="w-full max-w-sm">
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search client or booking"
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500"
      />
    </div>
  );
};

export default SearchBar;