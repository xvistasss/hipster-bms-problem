// Converts booking time values into calendar pixel coordinates.
// Used by booking blocks, drag/drop calculations, and conflict checks.
// Pure utility file: no UI logic here.

import { parseISO, differenceInMinutes, startOfDay } from 'date-fns';

// Visual scale used across calendar rendering.
// 1 minute = 2 pixels keeps 15-minute slots visually clear.
export const PIXELS_PER_MINUTE = 2;

// Each therapist column width can be reused in layout calculations.
export const THERAPIST_COLUMN_WIDTH = 180;

/**
 * Convert booking start time into vertical top position.
 * @param {string} startTime - ISO booking start time
 * @returns {number} pixel top position
 */
export const getBookingTop = (startTime) => {
  const bookingDate = parseISO(startTime);
  const dayStart = startOfDay(bookingDate);

  const minutesFromStart = differenceInMinutes(bookingDate, dayStart);

  return minutesFromStart * PIXELS_PER_MINUTE;
};

/**
 * Convert booking duration into visual height.
 * @param {number} duration - duration in minutes
 * @returns {number} pixel height
 */
export const getBookingHeight = (duration) => {
  return duration * PIXELS_PER_MINUTE;
};

/**
 * Full reusable booking style object.
 * Useful for inline style placement in booking block.
 * @param {Object} booking
 * @returns {Object}
 */
export const getBookingStyle = (booking) => ({
  top: `${getBookingTop(booking.startTime)}px`,
  height: `${getBookingHeight(booking.duration)}px`,
});
