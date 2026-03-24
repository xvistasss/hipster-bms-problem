// Calendar time rail.
// Responsibilities:
// - Render visible per unit time slot
// - Align exactly with therapist grid
// - Keep time labels readable

import React from 'react';
import { generateTimeSlots } from '../../utils/timeSlots';
import { CALENDAR_INTERVAL_MINUTES, PIXELS_PER_MINUTE } from '../../constants/calendarConfig';

const SLOT_HEIGHT = CALENDAR_INTERVAL_MINUTES * PIXELS_PER_MINUTE;
const slots = generateTimeSlots();

const TimeAxis = () => {

  return (
    <div className="sticky left-0 top-0 z-20 w-20 shrink-0 border-r border-gray-200 bg-white text-gray-500">
      {slots.map((slot) => (
        <div
          key={slot.label}
          style={{
            height: `${SLOT_HEIGHT}px`,
            minHeight: `${SLOT_HEIGHT}px`,
            lineHeight: `${SLOT_HEIGHT}px`,
          }}
          className="border-b border-gray-150 px-2 text-xs">
          {slot.label}
        </div>
      ))}
    </div>
  );
};

export default TimeAxis;
