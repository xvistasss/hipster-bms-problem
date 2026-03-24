// Booking creation form.
// Responsibilities:
// - Create booking safely
// - Update Zustand immediately
// - Show lightweight validation feedback

import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useBookingStore } from '../../store/bookingStore';
import { bookingService } from '../../services/bookingServices';
import { loggerService } from '../../services/loggerServices';
import { BOOKING_STATUSES, DURATION_OPTIONS } from '../../constants/bookingStatus';
import { THERAPISTS } from '../../constants/therapistList';

const BookingForm = () => {
  const addBooking = useBookingStore((state) => state.addBooking);

  const therapists = useMemo(() => THERAPISTS, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      clientName: '',
      service: '',
      therapistId: therapists[0]?.id || '',
      duration: DURATION_OPTIONS[1],
      room: '',
      requestType: '',
      notes: '',
      status: BOOKING_STATUSES[0],
    },
  });

  const onSubmit = async (data) => {
    try {
      const therapist = therapists.find(
        (item) => item.id === data.therapistId
      );

      const booking = {
        ...data,
        therapistName: therapist?.name || '',
        therapistGender: therapist?.gender || '',
        startTime: new Date().toISOString(),
        duration: Number(data.duration),
        requestTherapist: false,
        requestRoom: false,
      };

      const createdBooking = await bookingService.createBooking(booking);

      addBooking(createdBooking);

      loggerService.info('Booking created', createdBooking);

      reset();
    } catch (error) {
      loggerService.error('Booking creation failed', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-lg border border-gray-200 bg-white p-4"
    >
      {/* Client */}
      <div>
        <label className="mb-1 block text-xs font-medium uppercase text-gray-500">
          Client Name
        </label>

        <input
          {...register('clientName', {
            required: 'Client name is required',
          })}
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
          {...register('service', {
            required: 'Service is required',
          })}
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

        <select
          {...register('therapistId')}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          {therapists.map((therapist) => (
            <option key={therapist.id} value={therapist.id}>
              {therapist.name}
            </option>
          ))}
        </select>
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
          rows={3}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
      >
        Create Booking
      </button>
    </form>
  );
};

export default React.memo(BookingForm);
