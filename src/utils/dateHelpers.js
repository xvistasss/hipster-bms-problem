// Shared date utilities.
// Responsibilities:
// - Normalize booking display times
// - Keep time formatting reusable across UI
// - Avoid duplicating date-fns logic in components

import { format, parseISO } from 'date-fns';

/**
 * Format ISO date into readable booking date.
 * Example: Mon Jan 01
 */
export const formatBookingDate = (isoDate) =>
  format(parseISO(isoDate), `EEEE MMM dd`);

/**
 * Format ISO date into readable booking time.
 * Example: 09:15 AM
 */
export const formatBookingTime = (isoDate) =>
  format(parseISO(isoDate), 'hh:mm a');

/**
 * Create default booking start time.
 * Uses current local timestamp for initial booking creation.
 */
export const getDefaultBookingTime = () => new Date().toISOString();

/**
 * Sets booking time.
 * Uses given local timestamp for booking creation.
 */
export const setBookingTime = (time) => new Date(time).toISOString();
