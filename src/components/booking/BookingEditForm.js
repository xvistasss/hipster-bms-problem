// Responsibilities:
// - Edit selected booking
// - Update through booking service
// - Sync Zustand store immediately
// - Keep first version simple and reusable

import React from 'react';
import { useForm } from 'react-hook-form';
import { useBookingStore } from '../../store/bookingStore';
import { bookingService } from '../../services/bookingServices';

const BookingEditForm = ({ booking, onClose }) => {
  const updateBooking = useBookingStore((state) => state.updateBooking);

  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      clientName: booking.clientName,
      service: booking.service,
      duration: booking.duration,
    },
  });

  const onSubmit = async (data) => {
    const updatedBooking = {
      ...booking,
      ...data,
      duration: Number(data.duration),
    };

    await bookingService.updateBooking(updatedBooking);
    updateBooking(updatedBooking);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Client Name
        </label>
        <input
          {...register('clientName', { required: true })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Service
        </label>
        <input
          {...register('service', { required: true })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Duration (minutes)
        </label>
        <input
          type="number"
          {...register('duration')}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
};

export default BookingEditForm;
