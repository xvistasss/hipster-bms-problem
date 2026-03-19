// Purpose:
// - Simulate booking fetch/create/update/delete
// - Keep component layer independent from backend implementation
// - Allow optimistic UI testing now

import { addMinutes, setHours, setMinutes } from 'date-fns';

const therapists = Array.from({ length: 12 }, (_, index) => ({
  id: `therapist-${index + 1}`,
  name: `Therapist ${index + 1}`,
  gender: index % 2 === 0 ? 'female' : 'male',
}));

const generateBookings = () => {
  return Array.from({ length: 50 }, (_, index) => {
    const base = setMinutes(setHours(new Date(), 9), 0);
    const start = addMinutes(base, index * 15);

    return {
      id: `booking-${index + 1}`,
      clientName: `Client ${index + 1}`,
      therapistId: therapists[index % therapists.length].id,
      therapistName: therapists[index % therapists.length].name,
      therapistGender: therapists[index % therapists.length].gender,
      startTime: start.toISOString(),
      duration: 45,
      service: 'Massage',
      status: 'BOOKED',
      requestTherapist: index % 3 === 0,
      requestRoom: index % 4 === 0,
    };
  });
};

let bookings = generateBookings();
export const bookingService = {
  fetchBookings: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...bookings]), 400);
    });
  },

  createBooking: async (booking) => {
    const newBooking = {
      ...booking,
      id: `booking-${Date.now()}`,
    };

    bookings.push(newBooking);

    return new Promise((resolve) => {
      setTimeout(() => resolve(newBooking), 300);
    });
  },

  updateBooking: async (updatedBooking) => {
    bookings = bookings.map((booking) =>
      booking.id === updatedBooking.id ? updatedBooking : booking
    );

    return new Promise((resolve) => {
      setTimeout(() => resolve(updatedBooking), 300);
    });
  },

  deleteBooking: async (bookingId) => {
    bookings = bookings.filter((booking) => booking.id !== bookingId);

    return new Promise((resolve) => {
      setTimeout(() => resolve(bookingId), 300);
    });
  },

  getTherapists: () => therapists,
};