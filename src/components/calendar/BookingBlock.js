// Booking block rendered inside therapist calendar column.
// Responsibilities:
// - Display booking summary
// - Support minimal drag interaction
// - Keep rendering lightweight

import React from 'react';
import clsx from 'clsx';
import { useDraggable } from '@dnd-kit/core';
import { getBookingStyle } from '../../utils/bookingPosition';
import { useBookingStore } from '../../store/bookingStore';

const BookingBlock = ({ booking }) => {
  const selectBooking = useBookingStore((state) => state.selectBooking);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: booking.id,
  });

  const bookingStyle = getBookingStyle(booking);

  const dragStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

  const therapistColor =
    booking.therapistGender === 'female' ? 'bg-pink-500' : 'bg-blue-500';

  return (
    <button
      ref={setNodeRef}
      type="button"
      onClick={() => selectBooking(booking.id)}
      style={{ ...bookingStyle, ...dragStyle }}
      {...listeners}
      {...attributes}
      className={clsx(
        'absolute left-1 right-1 rounded-md px-2 py-1 text-left text-white shadow-sm',
        'overflow-hidden text-xs transition hover:opacity-90 cursor-move',
        therapistColor
      )}
    >
      <div className="font-medium truncate">{booking.clientName}</div>

      <div className="flex items-center gap-2 text-[10px] opacity-90">
        <span>{booking.service}</span>
        {booking.requestTherapist && <span>T</span>}
        {booking.requestRoom && <span>R</span>}
      </div>
    </button>
  );
};

export default React.memo(BookingBlock);
