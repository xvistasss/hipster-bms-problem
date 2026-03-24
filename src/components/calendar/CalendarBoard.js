// Responsibilities:
// - Load booking data through hooks
// - Render therapists horizontally using Grid
// - Keep calendar scalable for large therapist counts

import React, { useMemo } from 'react';
import { Grid } from 'react-window';
import { useBookings } from '../../hooks/useBookings';
import { useVisibleBookings } from '../../hooks/useVisibleBookings';
import { useTherapists } from '../../hooks/useTherapists';
import {
  THERAPIST_COLUMN_WIDTH,
  CALENDAR_BOARD_HEIGHT,
} from '../../constants/calendarConfig';

import CalendarGridCell from './CalendarGrid';
import Loader from '../common/Loader';
import EmptyState from '../common/EmptyState';

const CalendarBoard = () => {
  const { loading, error, bookings, retry } = useBookings();
  const { visibleBookings, isFiltering } = useVisibleBookings(bookings);
  const { therapists, visibleTherapistIds } = useTherapists();

  const bookingsByTherapist = useMemo(() => {
    const visibleIdSet = new Set(
      visibleTherapistIds.map(String)
    );

    return visibleBookings.reduce((acc, booking) => {
      const therapistKey = String(booking.therapistId);

      if (!visibleIdSet.has(therapistKey)) {
        return acc;
      }

      if (!acc[therapistKey]) {
        acc[therapistKey] = [];
      }

      acc[therapistKey].push(booking);

      return acc;
    }, {});
  }, [visibleBookings, visibleTherapistIds]);

  const cellProps = useMemo(
    () => ({
      therapists,
      bookingsByTherapist,
    }),
    [therapists, bookingsByTherapist]
  );

  if (loading) {
    return <Loader />;
  }

  // Bookings exist but search/filter removed visible results
  if (!visibleBookings.length && isFiltering) {
    return (
      <EmptyState
        title="No matching results"
        description="Try changing therapist name, status, or time filter."
      />
    );
  }

  // No booking data exists at all
  if (!bookings.length) {
    return (
      <EmptyState
        title="No bookings available"
        description="Create a new booking to start scheduling."
      />
    );
  }

  // Error in fetching data
  if (error) {
    return (
      <EmptyState
        title="Failed to load bookings"
        description={error}
        action={"Retry"}
        reaction={retry}
      />
    );
  }

  return (
    <div className="flex-1 bg-white">
      <Grid
        columnCount={therapists.length}
        columnWidth={THERAPIST_COLUMN_WIDTH}
        rowCount={1}
        rowHeight={CALENDAR_BOARD_HEIGHT}
        cellComponent={CalendarGridCell}
        cellProps={cellProps}
        style={{
          width: therapists.length * THERAPIST_COLUMN_WIDTH,
          height: CALENDAR_BOARD_HEIGHT,
          overflow: 'clip'
        }}
      />
    </div>
  );
};

export default CalendarBoard;
