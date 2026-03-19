// Derived booking selector hook.
// Responsibilities:
// - Read bookings from booking store
// - Read search term from UI store
// - Apply debounced filtering
// - Keep filtering outside render components

import { useMemo } from 'react';
import { useBookingStore } from '../store/bookingStore';
import { useUIStore } from '../store/uiStore';
import { useDebounce } from './useDebounce';

export const useVisibleBookings = () => {
  const bookingIds = useBookingStore((state) => state.bookingIds);
  const bookingsById = useBookingStore((state) => state.bookingsById);
  const searchTerm = useUIStore((state) => state.searchTerm);

  const debouncedSearch = useDebounce(searchTerm, 300);

  return useMemo(() => {
    const allBookings = bookingIds.map((id) => bookingsById[id]);

    if (!debouncedSearch.trim()) {
      return allBookings;
    }

    const lowerSearch = debouncedSearch.toLowerCase();

    return allBookings.filter((booking) => {
      return (
        booking.clientName.toLowerCase().includes(lowerSearch) ||
        booking.service.toLowerCase().includes(lowerSearch)
      );
    });
  }, [bookingIds, bookingsById, debouncedSearch]);
};
