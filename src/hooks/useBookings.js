// Booking loading hook.
// Responsibilities:
// - Load bookings safely
// - Populate Zustand store
// - Handle loading / error state
// - Log API failures cleanly

import { useEffect, useMemo, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { useBookingStore } from '../store/bookingStore';
import { useUIStore } from '../store/uiStore';
import { bookingService } from '../services/bookingServices';
import { loggerService } from '../services/loggerServices';
import { normalizeBooking } from '../utils/normalizeBooking';
import { createTherapistMap } from '../utils/createTherapistMap';
import { THERAPISTS } from '../constants/therapistList';

export const useBookings = () => {
  const isAuthReady = useAuthStore((state) => state.isAuthReady);
  
  const bookingsById = useBookingStore((state) => state.bookingsById);
  const setBookings = useBookingStore((state) => state.setBookings);

  const loading = useBookingStore((state) => state.loading);
  const setLoading = useBookingStore((state) => state.setLoading);
  
  const error = useBookingStore((state) => state.error);
  const setError = useBookingStore((state) => state.setError);

  const activeFilters = useUIStore((state) => state.activeFilters);
  const selectedDate = useBookingStore((state) => state.selectedDate);

  const therapistMap = useMemo(() => createTherapistMap(), []);

  const bookings = useMemo(() => {
    const allBookings = Object.values(bookingsById || {});

    const normalizedBookings = allBookings
      .map((booking) =>
        normalizeBooking(
          booking,
          therapistMap,
          THERAPISTS[0]
        )
      )
      .filter(Boolean);

    return normalizedBookings.filter((booking) => {
      if (
        activeFilters.gender &&
        booking.therapistGender !== activeFilters.gender
      ) {
        return false;
      }

      if (
        activeFilters.resources.length &&
        !activeFilters.resources.includes(booking.resourceName)
      ) {
        return false;
      }

      if (
        activeFilters.statuses.length &&
        !activeFilters.statuses.includes(booking.status)
      ) {
        return false;
      }

      if (
        activeFilters.selectedTherapists.length &&
        !activeFilters.selectedTherapists.includes(booking.therapistId)
      ) {
        return false;
      }

      if (
        activeFilters.requestedOnly &&
        !booking.requestedOnly
      ) {
        return false;
      }

      return true;
    });
  }, [bookingsById, activeFilters, therapistMap]);

  const formattedDate = useMemo(() => {
    const safeDate =
      selectedDate instanceof Date
        ? selectedDate
        : new Date(selectedDate);

    return safeDate.toISOString().split('T')[0];
  }, [selectedDate]);

  const loadBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const fetchedBookings = await bookingService.fetchBookings(formattedDate);
      setBookings(fetchedBookings);

      loggerService.info('Bookings loaded', {
        count: fetchedBookings.length,
      });
    } catch (fetchError) {
      setError('Failed to load bookings');

      loggerService.error('Booking fetch failed', fetchError);
    } finally {
      setLoading(false);
    }
  }, [setBookings, setLoading, setError, formattedDate]);

  useEffect(() => {
    if (!isAuthReady) {
      return;
    }

    loadBookings();
  }, [isAuthReady, loadBookings]);

  return {
    loading,
    error,
    bookings,
    retry: loadBookings,
  };
};
