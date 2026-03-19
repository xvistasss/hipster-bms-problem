// Right-side booking detail panel.
// Responsibilities:
// - Show booking details
// - Allow edit and cancel actions
// - Keep first interaction flow simple

import React, { useState } from 'react';
import { useBookingStore } from '../../store/bookingStore';
import { formatBookingTime } from '../../utils/dateHelpers';
import { bookingService } from '../../services/bookingServices';
import BookingEditForm from './BookingEditForm';

const BookingPanel = () => {
  const [isEditing, setIsEditing] = useState(false);

  const selectedBookingId = useBookingStore((state) => state.selectedBookingId);
  const bookingsById = useBookingStore((state) => state.bookingsById);
  const clearSelection = useBookingStore((state) => state.clearSelectedBooking);
  const deleteBooking = useBookingStore((state) => state.deleteBooking);

  if (!selectedBookingId) {
    return null;
  }

  const booking = bookingsById[selectedBookingId];

  if (!booking) {
    return null;
  }

  const handleCancelBooking = async () => {
    await bookingService.deleteBooking(booking.id);
    deleteBooking(booking.id);
    clearSelection();
  };

  return (
    <aside className="fixed right-0 top-0 z-30 h-full w-80 border-l border-gray-200 bg-white shadow-lg">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-800">Booking Details</h2>
        <button
          type="button"
          onClick={() => {
            setIsEditing(false);
            clearSelection();
          }}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>

      <div className="space-y-4 px-4 py-4 text-sm text-gray-700">
        {isEditing ? (
          <BookingEditForm booking={booking} onClose={() => setIsEditing(false)} />
        ) : (
          <>
            <div>
              <p className="font-medium">Client</p>
              <p>{booking.clientName}</p>
            </div>

            <div>
              <p className="font-medium">Service</p>
              <p>{booking.service}</p>
            </div>

            <div>
              <p className="font-medium">Therapist</p>
              <p>{booking.therapistName}</p>
            </div>

            <div>
              <p className="font-medium">Time</p>
              <p>{formatBookingTime(booking.startTime)}</p>
            </div>

            <div>
              <p className="font-medium">Duration</p>
              <p>{booking.duration} mins</p>
            </div>

            <div>
              <p className="font-medium">Status</p>
              <p>{booking.status}</p>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              Edit Booking
            </button>

            <button
              type="button"
              onClick={handleCancelBooking}
              className="w-full rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
            >
              Cancel Booking
            </button>
          </>
        )}
      </div>
    </aside>
  );
};

export default BookingPanel;
