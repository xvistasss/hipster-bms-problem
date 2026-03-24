// Booking edit form.
// Responsibilities:
// - Edit selected booking safely
// - Update through booking service
// - Sync Zustand immediately
// - Show lightweight validation feedback

import React from 'react';
import { useForm } from 'react-hook-form';
import { useBookingStore } from '../../store/bookingStore';
import { bookingService } from '../../services/bookingServices';
import { loggerService } from '../../services/loggerServices';
import { BOOKING_STATUSES, DURATION_OPTIONS } from '../../constants/bookingStatus';

const BookingEditForm = ({ booking, onClose }) => {
  const updateBooking = useBookingStore((state) => state.updateBooking);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      clientName: booking.clientName,
      service: booking.service,
      duration: booking.duration,
      therapistName: booking.therapistName || '',
      room: booking.room || '',
      requestType: booking.requestType || '',
      notes: booking.notes || '',
      status: booking.status || BOOKING_STATUSES[0]
    },
  });

  const onSubmit = async (data) => {
    try {
      const updatedBooking = {
        ...booking,
        ...data,
        duration: Number(data.duration),
      };

      await bookingService.updateBooking(updatedBooking);

      updateBooking(updatedBooking);

      loggerService.info('Booking edited', updatedBooking);

      onClose();
    } catch (error) {
      loggerService.error('Booking edit failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* Client */}
      <div>
        <label className="mb-1 block text-xs font-medium uppercase text-gray-500">
          Client Name
        </label>

        <input
          {...register('clientName', { required: 'Client name is required' })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />

        {errors.clientName && (
          <p className="mt-1 text-xs text-red-500">
            {errors.clientName.message}
          </p>
        )}
      </div>

      {/* Service */}
      <div>
        <label className="mb-1 block text-xs font-medium uppercase text-gray-500">
          Service
        </label>

        <input
          {...register('service', { required: 'Service is required' })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />

        {errors.service && (
          <p className="mt-1 text-xs text-red-500">
            {errors.service.message}
          </p>
        )}
      </div>

      {/* Therapist */}
      <div>
        <label className="mb-1 block text-xs font-medium uppercase text-gray-500">
          Therapist
        </label>

        <input
          {...register('therapistName')}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      {/* Duration */}
      <div>
        <label className="mb-1 block text-xs font-medium uppercase text-gray-500">
          Duration
        </label>

        <select
          {...register('duration', {
            required: 'Duration is required',
          })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          {DURATION_OPTIONS.map((duration) => (
            <option key={duration} value={duration}>
              {duration} mins
            </option>
          ))}
        </select>

        {errors.duration && (
          <p className="mt-1 text-xs text-red-500">
            {errors.duration.message}
          </p>
        )}
      </div>

      {/* Room */}
      <div>
        <label className="mb-1 block text-xs font-medium uppercase text-gray-500">
          Room
        </label>

        <input
          {...register('room')}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      {/* Request Type */}
      <div>
        <label className="mb-1 block text-xs font-medium uppercase text-gray-500">
          Request Type
        </label>

        <input
          {...register('requestType')}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      {/* Status */}
      <div>
        <label className="mb-1 block text-xs font-medium uppercase text-gray-500">
          Status
        </label>

        <select
          {...register('status')}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          {BOOKING_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Notes */}
      <div>
        <label className="mb-1 block text-xs font-medium uppercase text-gray-500">
          Notes
        </label>

        <textarea
          {...register('notes')}
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      {/* Save */}
      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
};

export default React.memo(BookingEditForm);
