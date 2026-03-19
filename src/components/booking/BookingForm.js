// Responsibilities:
// - Collect booking input
// - Create booking through booking service
// - Update Zustand store immediately
// - Log booking actions safely

import React from 'react';
import { useForm } from 'react-hook-form';
import { useBookingStore } from '../../store/bookingStore';
import { bookingService } from '../../services/bookingServices';
import { loggerService } from '../../services/loggerServices';

const BookingForm = () => {
  const addBooking = useBookingStore((state) => state.addBooking);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      clientName: '',
      service: '',
      therapistId: 'therapist-1',
      duration: 45,
    },
  });

  const therapists = bookingService.getTherapists();

  const onSubmit = async (data) => {
    try {
      const therapist = therapists.find((item) => item.id === data.therapistId);

      const booking = {
        ...data,
        therapistName: therapist.name,
        therapistGender: therapist.gender,
        startTime: new Date().toISOString(),
        status: 'BOOKED',
        requestTherapist: false,
        requestRoom: false,
        duration: Number(data.duration),
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
      className="space-y-4 rounded-lg border border-gray-200 bg-white p-4"
    >
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
        className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
      >
        Create Booking
      </button>
    </form>
  );
};

export default BookingForm;
