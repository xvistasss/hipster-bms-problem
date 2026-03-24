// Responsibilities:
// - Render the booking blocks on therapist column
// - Stay isolated for scalable rendering
// - Memoized to avoid unnecessary rerenders

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { generateTimeSlots } from '../../utils/timeSlots';
import { CALENDAR_INTERVAL_MINUTES, PIXELS_PER_MINUTE } from '../../constants/calendarConfig';
import BookingBlock from './BookingBlock';

const SLOT_HEIGHT = CALENDAR_INTERVAL_MINUTES * PIXELS_PER_MINUTE;
const slots = generateTimeSlots();

const TherapistColumn = ({ therapistId, bookings }) => {
  const { setNodeRef } = useDroppable({
    id: String(therapistId),
  });

  return (
    <div
      ref={setNodeRef}
      className="shrink-0 border-r border-gray-200 bg-white">
      <div
        className="relative"
        style={{height: slots.length * SLOT_HEIGHT}}>
        {slots.map((slot) => (
          <div
            key={slot.value}
            style={{
              height: SLOT_HEIGHT,
              minHeight: SLOT_HEIGHT,
              lineHeight: `${SLOT_HEIGHT}px`,
            }}
            className="border-b border-gray-150"
          />
        ))}

        {bookings?.map((booking) => (
          <BookingBlock
            key={`${booking.id}-${booking.start_time}-${booking.therapistId}`}
            booking={booking}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(TherapistColumn);
