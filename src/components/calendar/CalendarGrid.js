// Responsibilities:
// - Extract bookings per therapist
// - Stay isolated for scalable rendering
// - Memoized to avoid unnecessary rerenders

import React from 'react';
import TherapistColumn from './TherapistColumn';

const CalendarGridCell = ({
  columnIndex,
  rowIndex,
  style,
  therapists,
  bookingsByTherapist,
}) => {
  const therapist = therapists[columnIndex];
  if (rowIndex !== 0 || !therapist) {
    return null;
  }
  
  const therapistBookings = bookingsByTherapist[String(therapist.id)] || [];

  return (
    <div style={style}>
      <TherapistColumn therapistId={therapist.id} bookings={therapistBookings} />
    </div>
  );
};

export default React.memo(CalendarGridCell);
