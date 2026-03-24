// Booking View.
// Responsibilities:
// - Display booking details
// - Allow booking cancellation

import React from 'react';
import { formatBookingTime } from '../../utils/dateHelpers';
import { bookingService } from '../../services/bookingServices';
import { loggerService } from '../../services/loggerServices';
import { useBookingStore } from '../../store/bookingStore';

const BookingDetails = ({ booking }) => {
  const openEditPanel = useBookingStore((state) => state.openEditPanel);
  const clearSelection = useBookingStore((state) => state.clearSelectedBooking);
  const deleteBooking = useBookingStore((state) => state.deleteBooking);

  const handleCancelBooking = async () => {
    try {
      await bookingService.deleteBooking(booking.id);
      deleteBooking(booking.id);
      loggerService.info('Booking cancelled', booking);
      clearSelection();
    } catch (error) {
      loggerService.error('Booking cancellation failed', error);
    }
  };

  return (
    <div className="space-y-5">
      {/* Client block */}
      <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
        <p className="text-xs font-medium uppercase text-gray-400">Client</p>

        <div className="mt-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-400 text-sm font-semibold text-white">
            {booking.clientName?.slice(0, 2).toUpperCase()}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-800">
              {booking.clientName}
            </p>

            <p className="text-xs text-gray-400">
              Phone: {booking.phone || '-'}
            </p>
          </div>
        </div>
      </div>

      {/* Booking info */}
      <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-800">
            {booking.duration} Mins {booking.service}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs uppercase text-gray-400">Therapist</p>
            <p className="mt-1 text-gray-700">{booking.therapistName}</p>
          </div>

          <div>
            <p className="text-xs uppercase text-gray-400">Time</p>
            <p className="mt-1 text-gray-700">
              {formatBookingTime(booking.displayTime)}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-gray-400">Status</p>
            <p className="mt-1 text-gray-700">{booking.status}</p>
          </div>

          <div>
            <p className="text-xs uppercase text-gray-400">Room</p>
            <p className="mt-1 text-gray-700">{booking.room || '-'}</p>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase text-gray-400">Request</p>
          <p className="mt-1 text-gray-700">
            {booking.requestType || '-'}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-gray-400">Notes</p>
          <p className="mt-1 text-sm text-gray-700">
            {booking.notes || '-'}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={() => openEditPanel(booking.id)}
          className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={handleCancelBooking}
          className="flex-1 rounded-md bg-red-500 px-4 py-2 text-sm text-white transition-colors hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default React.memo(BookingDetails);
