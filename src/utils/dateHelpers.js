// Shared date utilities.
// Responsibilities:
// - Normalize booking display times
// - Keep time formatting reusable across UI
// - Avoid duplicating date-fns logic in components

import { format, parseISO } from 'date-fns';

/**
 * Format ISO date into readable booking time.
 * Example: 09:15 AM
 */
export const formatBookingTime = (isoDate) => {
  return format(parseISO(isoDate), 'hh:mm a');
};

/**
 * Create default booking start time.
 * Keeps current local time rounded naturally for demo use.
 */
export const getDefaultBookingTime = () => {
  return new Date().toISOString();
};
