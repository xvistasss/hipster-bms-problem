// Responsibilities:
// - Hold normalized booking data
// - Support optimistic create/update/delete
// - Keep selected booking isolated from calendar rendering
// - Expose lightweight actions for UI components

import { create } from 'zustand';
import { getDefaultBookingTime } from '../utils/dateHelpers';

const normalizeBookings = (bookings = []) => {
  const bookingsById = {};
  const bookingIds = [];

  bookings.forEach((booking) => {
    bookingsById[booking.id] = booking;
    bookingIds.push(booking.id);
  });

  return { bookingsById, bookingIds };
};

export const useBookingStore = create((set) => ({
  bookingsById: {},
  bookingIds: [],
  selectedBookingId: null,
  loading: false,
  error: null,
  panelMode: null,

  selectedDate: getDefaultBookingTime(),
  selectedOutlet: 'Liat Towers',
  selectedInterval: 15,

  setBookings: (bookings) => {
    const normalized = normalizeBookings(bookings);

    set({
      bookingsById: normalized.bookingsById,
      bookingIds: normalized.bookingIds,
      error: null,
    });
  },

  addBooking: (booking) =>
    set((state) => {
      const alreadyExists = state.bookingIds.includes(booking.id);

      return {
        bookingsById: {
          ...state.bookingsById,
          [booking.id]: booking,
        },
        bookingIds: alreadyExists
          ? state.bookingIds
          : [...state.bookingIds, booking.id],
      };
    }),

  updateBooking: (updatedBooking) =>
    set((state) => ({
      bookingsById: {
        ...state.bookingsById,
        [updatedBooking.id]: {
          ...state.bookingsById[updatedBooking.id],
          ...updatedBooking,
        },
      },
    })),

  deleteBooking: (bookingId) =>
    set((state) => {
      const nextBookings = { ...state.bookingsById };
      delete nextBookings[bookingId];

      return {
        bookingsById: nextBookings,
        bookingIds: state.bookingIds.filter((id) => id !== bookingId),
      };
    }),

  openViewPanel: (id) =>
    set({
      panelMode: 'view',
      selectedBookingId: id,
    }),

  openCreatePanel: () =>
    set({
      panelMode: 'create',
      selectedBookingId: null,
    }),

  openEditPanel: (id) =>
    set({
      panelMode: 'edit',
      selectedBookingId: id,
    }),

  clearSelectedBooking: () =>
    set({
      panelMode: null,
      selectedBookingId: null,
    }),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  setSelectedDate: (date) =>
    set({
      selectedDate: date instanceof Date ? date : new Date(date),
    }),

  setSelectedOutlet: (outlet) =>
    set({ selectedOutlet: outlet }),

  setSelectedInterval: (interval) =>
    set({ selectedInterval: interval }),
}));