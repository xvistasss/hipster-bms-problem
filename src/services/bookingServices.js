// Purpose:
// - Abstract booking fetch/create/update/delete
// - Keep component layer independent from backend implementation

import { api } from './api';
import { loggerService } from './loggerServices';
import { THERAPISTS } from '../constants/therapistList';

import { buildReschedulePayload } from '../utils/bookingPayload';
import { normalizeBooking } from '../utils/normalizeBooking';
import { createTherapistMap } from '../utils/createTherapistMap';

const therapistMap = createTherapistMap();

const handleError = (error, action) => {
  loggerService.error('BOOKING_SERVICE_ERROR', {
    action,
    message: error.message,
    status: error.response?.status,
    endpoint: error.config?.url,
  });

  throw error;
};

const getFallbackTherapist = (therapistId) =>
  THERAPISTS.find(
    (t) =>
      t.id === therapistId ||
      String(t.id) === String(therapistId)
  ) || THERAPISTS[0];

export const bookingService = {
  createBooking: async (booking) => {
    try {
      const response = await api.post('bookings/create', booking);
      const savedBooking = response.data?.data || response.data;

      return normalizeBooking(savedBooking, therapistMap, getFallbackTherapist(booking.therapistId));
    } catch (error) {
      handleError(error, 'createBooking');
    }
  },

  fetchBookings: async (date) => {
    try {
      const firstResponse = await api.get('bookings?pagination=1&page=1', {
        params: date ? { date } : {},
      });
      const firstPageData =
        firstResponse.data?.data?.data?.list?.bookings || [];
      const paginationMeta =
        firstResponse.data?.data?.data?.list?.pagination || {};
      const totalPages = paginationMeta.lastPage || 1;

      const remainingRequests = [];
      for (let page = 2; page <= totalPages; page += 1) {
        remainingRequests.push(
          api.get(`bookings?pagination=1&page=${page}`)
        );
      }

      const remainingResponses = await Promise.all(remainingRequests);
      const remainingBookings = remainingResponses.flatMap(
        (response) =>
          response.data?.data?.data?.list?.bookings || []
      );

      const allBookings = [
        ...firstPageData,
        ...remainingBookings,
      ];

      const normalizedBookings = allBookings.map((booking, index) => {
        const fallbackTherapist = THERAPISTS[index % THERAPISTS.length];

        return normalizeBooking(booking, therapistMap, fallbackTherapist);
      });

      return normalizedBookings;
    } catch (error) {
      handleError(error, 'fetchBookings');
      return [];
    }
  },

  showDetails: async (bookingId) => {
    try {
      const response = await api.get(`bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      handleError(error, 'showDetails');
    }
  },

  updateBooking: async (updatedBooking) => {
    try {
      const response = await api.put(`bookings/${updatedBooking.id}`, updatedBooking);
      const savedBooking = response.data?.data || response.data;

      return normalizeBooking(savedBooking, therapistMap, getFallbackTherapist(updatedBooking.therapistId));
    } catch (error) {
      handleError(error, 'updateBooking');
    }
  },

  rescheduleBooking: async (booking) => {
    try {
      const formData = buildReschedulePayload(booking);

      if (!formData) {
        throw new Error('Invalid booking payload');
      }

      const response = await api.post(
        '/bookings/item/reschedule',
        formData
      );
      const savedBooking = response.data?.data || booking;

      return normalizeBooking(savedBooking, therapistMap, getFallbackTherapist(booking.therapistId));
    } catch (error) {
      handleError(error, 'rescheduleBooking');
    }
  },

  updatePaymentStatus: async (data) => {
    try {
      const response = await api.post('bookings/item/payment-status', data);
      return response.data;
    } catch (error) {
      handleError(error, 'updatePaymentStatus');
    }
  },

  cancelBooking: async (data) => {
    try {
      const response = await api.post('bookings/item/cancel', data);
      return response.data;
    } catch (error) {
      handleError(error, 'cancelBooking');
    }
  },

  deleteBooking: async (bookingId) => {
    try {
      await api.delete(`bookings/destroy/${bookingId}`);
      return bookingId;
    } catch (error) {
      handleError(error, 'deleteBooking');
    }
  },
};