// Booking block positioning utility.
// Responsibilities:
// - Convert booking start time into vertical pixel position
// - Respect visible calendar operating hours
// - Keep sizing reusable across booking rendering

import { differenceInMinutes, parseISO, set } from 'date-fns';
import {
  CALENDAR_START_HOUR,
  PIXELS_PER_MINUTE,
} from '../constants/calendarConfig';

/**
 * Returns booking block style for absolute positioning inside therapist column.
 */
export const getBookingStyle = (booking) => {
  const rawServiceAt = booking.service_at || '';
  const serviceDate = rawServiceAt.split(/[ T]/)[0];

  const startTime = booking.start_time || '00:00:00';
  const bookingStart = parseISO(`${serviceDate}T${startTime}`);

  const rawDuration = booking.duration ?? 60;
  const normalizedDuration =
    rawDuration > 300
      ? Math.round(rawDuration / 60)
      : rawDuration;

  if (Number.isNaN(bookingStart.getTime())) {
    return {
      top: '0px',
      height: `${normalizedDuration * PIXELS_PER_MINUTE}px`,
    };
  }

  const calendarStart = set(bookingStart, {
    hours: CALENDAR_START_HOUR,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const topMinutes = Math.max(
    0,
    differenceInMinutes(bookingStart, calendarStart)
  );

  return {
    top: `${topMinutes * PIXELS_PER_MINUTE}px`,
    height: `${normalizedDuration * PIXELS_PER_MINUTE}px`,
  };
};
