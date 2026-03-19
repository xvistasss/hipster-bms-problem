// Responsibilities:
// - Render one therapist header
// - Render therapist bookings only
// - Stay isolated for scalable rendering
// - Memoized to avoid unnecessary rerenders

import React, { useMemo } from 'react';
import BookingBlock from './BookingBlock';

const TherapistColumn = ({ therapist, bookings }) => {
  const therapistBookings = useMemo(() => {
    return bookings.filter((booking) => booking.therapistId === therapist.id);
  }, [bookings, therapist.id]);

  const labelColor =
    therapist.gender === 'female' ? 'text-pink-500' : 'text-blue-500';

  return (
    <div className="relative min-w-[180px] border-r border-gray-200">
      <div className={`sticky top-0 z-10 bg-white px-3 py-2 text-sm font-semibold ${labelColor}`}>
        {therapist.name}
      </div>

      <div className="relative h-[2880px] bg-[linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[length:100%_30px]">
        {therapistBookings.map((booking) => (
          <BookingBlock key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(TherapistColumn);