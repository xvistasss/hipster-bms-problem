// Booking overlap checker.
// Responsibilities:
// - Detect booking conflicts for same therapist
// - Keep logic reusable for drag/drop and edit flows
// - Stay lightweight for first version

import { parseISO, addMinutes, isBefore, isAfter } from 'date-fns';

export const hasBookingConflict = (bookings, candidateBooking) => {
  const candidateStart = parseISO(candidateBooking.startTime);
  const candidateEnd = addMinutes(candidateStart, candidateBooking.duration);

  return bookings.some((booking) => {
    if (
      booking.id === candidateBooking.id ||
      booking.therapistId !== candidateBooking.therapistId
    ) {
      return false;
    }

    const bookingStart = parseISO(booking.startTime);
    const bookingEnd = addMinutes(bookingStart, booking.duration);

    return isBefore(candidateStart, bookingEnd) && isAfter(candidateEnd, bookingStart);
  });
};
