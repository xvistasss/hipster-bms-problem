// Calendar time slot generator.
// Responsibilities:
// - Generate visible calendar slots
// - Respect calendar start/end hours
// - Keep slot logic reusable across board rendering

import { addMinutes, format, set } from 'date-fns';
import {
  CALENDAR_INTERVAL_MINUTES,
  CALENDAR_START_HOUR,
  CALENDAR_END_HOUR,
} from '../constants/calendarConfig';

export const generateTimeSlots = () => {
  const slots = [];

  let current = set(new Date(), {
    hours: CALENDAR_START_HOUR,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const end = set(new Date(), {
    hours: CALENDAR_END_HOUR,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  while (current < end) {
    slots.push({
      label: format(current, 'hh:mm a'),
      value: current,
    });

    current = addMinutes(current, CALENDAR_INTERVAL_MINUTES);
  }

  return slots;
};
