// Derived visible booking selector.
// Responsibilities:
// - Read bookings from props
// - Apply debounced search filtering
// - Return stable visible booking list

import { useMemo } from 'react';
import { useDebounce } from './useDebounce';
import { useUIStore } from '../store/uiStore';

export const useVisibleBookings = (bookings) => {
  const searchTerm = useUIStore((state) => state.searchTerm);
  const debouncedSearch = useDebounce(searchTerm, 300);

  const visibleBookings = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();

    if (!normalizedSearch) {
      return bookings;
    }

    return bookings.filter((booking) => {
      const clientName = booking.clientName.toLowerCase();
      const service = booking.service.toLowerCase();
      const therapistName = booking.therapistName.toLowerCase();

      return (
        clientName.includes(normalizedSearch) ||
        service.includes(normalizedSearch) ||
        therapistName.includes(normalizedSearch)
      );
    });
  }, [bookings, debouncedSearch]);

  return {
    visibleBookings,
    isFiltering: Boolean(debouncedSearch.trim()),
  };
};
