// Responsibilities:
// - Load booking data through hooks
// - Render therapists horizontally using Grid
// - Keep calendar scalable for large therapist counts

import React, { useMemo } from 'react';
import { Grid } from 'react-window';
import TherapistColumn from './TherapistColumn';
import { useBookings } from '../../hooks/useBookings';
import { useVisibleBookings } from '../../hooks/useVisibleBookings';
import { bookingService } from '../../services/bookingServices';

const COLUMN_WIDTH = 180;
const COLUMN_HEIGHT = 700;
const BOARD_WIDTH = 1000;
const BOARD_HEIGHT = 700;

const TherapistCell = ({ columnIndex, rowIndex, style, therapists, bookings }) => {
  if (rowIndex !== 0) {
    return null;
  }

  const therapist = therapists[columnIndex];

  if (!therapist) {
    return null;
  }

  return (
    <div style={style}>
      <TherapistColumn therapist={therapist} bookings={bookings} />
    </div>
  );
};

const CalendarBoard = () => {
  const { loading, error } = useBookings();
  const bookings = useVisibleBookings();
  const therapists = bookingService.getTherapists();

  const cellProps = useMemo(
    () => ({ therapists, bookings }),
    [therapists, bookings]
  );

  if (loading) {
    return <div className="p-4 text-sm text-gray-500">Loading bookings...</div>;
  }

  if (error) {
    return <div className="p-4 text-sm text-red-500">{error}</div>;
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <Grid
        columnCount={therapists.length}
        columnWidth={COLUMN_WIDTH}
        rowCount={1}
        rowHeight={COLUMN_HEIGHT}
        cellComponent={TherapistCell}
        cellProps={cellProps}
        style={{ width: BOARD_WIDTH, height: BOARD_HEIGHT }}
      />
    </div>
  );
};

export default CalendarBoard;
