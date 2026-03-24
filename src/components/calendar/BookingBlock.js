// Booking block rendered inside therapist calendar column.
// Responsibilities:
// - Display booking summary
// - Support drag interaction
// - Snap visually to calendar grid

import React from 'react';
import clsx from 'clsx';
import { useDraggable } from '@dnd-kit/core';
import { getBookingStyle } from '../../utils/bookingPosition';
import { useBookingStore } from '../../store/bookingStore';
import { FEMALE_COLOR, MALE_COLOR } from '../../constants/therapistColors';

const BookingBlock = ({ booking }) => {
  const openViewPanel = useBookingStore((state) => state.openViewPanel);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: booking.id,
  });

  const baseStyle = getBookingStyle(booking);

  const bookingStyle = {
    ...baseStyle,
    top: `calc(${baseStyle.top} + 1px)`,
    height: `calc(${baseStyle.height} - 3px)`,
    backgroundColor:
      booking.therapistGender === 'female'
        ? FEMALE_COLOR
        : MALE_COLOR,
    ...(transform && {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      zIndex: 30,
    }),
  };

  const isDragging = Boolean(transform);

  return (
    <div
      ref={setNodeRef}
      style={bookingStyle}
      className="absolute left-1 right-1 rounded-md">
      <button
        type="button"
        onClick={() => openViewPanel(booking.id)}
        {...listeners}
        {...attributes}
        className={
          clsx(
            'flex flex-1 flex-col w-full h-full cursor-grab active:cursor-grabbing overflow-hidden px-2 py-1 text-left text-xs text-white shadow-sm transition hover:opacity-90',
            isDragging && 'opacity-30'
          )
        }>
        <div className="text-xs font-thin leading-tight">
          {booking.duration} Mins {booking.service}
        </div>

        <div className="truncate text-xs font-medium leading-tight">
          837438436 {booking.clientName || booking.booking || 'Booking'}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-row justify-center items-center gap-1 p-1">
          {booking.requestedOnly && (
            <span className="rounded-lg px-1 text-[0.50rem] font-bold text-center text-white bg-black/30">T</span>
          )}

          {booking.requestRoom && (
            <span className="rounded-lg px-1 text-[0.50rem] font-bold text-center text-black bg-white/60">R</span>
          )}
        </div>
      </button>
    </div>
  );
};

export default React.memo(BookingBlock);
