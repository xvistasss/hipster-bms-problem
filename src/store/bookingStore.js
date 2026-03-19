// Responsibilities:
// - Hold normalized booking data
// - Support optimistic create/update/delete
// - Keep selected booking isolated from calendar rendering
// - Expose lightweight actions for UI components

import { create } from 'zustand';

const normalizeBookings = (bookings = []) => {
  const bookingsById = {};
  const bookingIds = [];

  bookings.forEach((booking) => {
    bookingsById[booking.id] = booking;
    bookingIds.push(booking.id);
  });

  return { bookingsById, bookingIds };
};

export const useBookingStore = create((set, get) => ({
  bookingsById: {},
  bookingIds: [],
  selectedBookingId: null,
  loading: false,
  error: null,

  setBookings: (bookings) => {
    const normalized = normalizeBookings(bookings);
    set({
      bookingsById: normalized.bookingsById,
      bookingIds: normalized.bookingIds,
      error: null,
    });
  },

  addBooking: (booking) =>
    set((state) => ({
      bookingsById: {
        ...state.bookingsById,
        [booking.id]: booking,
      },
      bookingIds: [...state.bookingIds, booking.id],
    })),

  updateBooking: (updatedBooking) =>
    set((state) => ({
      bookingsById: {
        ...state.bookingsById,
        [updatedBooking.id]: updatedBooking,
      },
    })),

  deleteBooking: (bookingId) =>
    set((state) => {
      const next = { ...state.bookingsById };
      delete next[bookingId];

      return {
        bookingsById: next,
      }
    }),

  selectBooking: (bookingId) => set({ selectedBookingId: bookingId }),
  clearSelectedBooking: () => set({ selectedBookingId: null }),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));