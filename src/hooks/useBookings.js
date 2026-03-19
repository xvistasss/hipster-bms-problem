// Responsibilities:
// - Load bookings from booking service
// - Push normalized data into Zustand store
// - Expose loading + error handling
// - Keep UI components free from fetch logic

import { useEffect } from 'react';
import { useBookingStore } from '../store/bookingStore';
import { bookingService } from '../services/bookingServices';

export const useBookings = () => {
  const setBookings = useBookingStore((state) => state.setBookings);
  const setLoading = useBookingStore((state) => state.setLoading);
  const setError = useBookingStore((state) => state.setError);
  const loading = useBookingStore((state) => state.loading);
  const error = useBookingStore((state) => state.error);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        const bookings = await bookingService.fetchBookings();
        setBookings(bookings);
      } catch (err) {
        console.error('Failed to load bookings:', err);
        setError('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [setBookings, setLoading, setError]);

  return {
    loading,
    error,
  };
};
