// Right-side booking detail panel.
// Responsibilities:
// - Show booking details
// - Support edit and cancel actions
// - Keep interaction clean and readable

import React, { lazy, Suspense } from 'react';
import { useBookingStore } from '../../store/bookingStore';
import Loader from '../common/Loader';

const BookingDetails = lazy(() => import('./BookingDetails'));
const BookingForm = lazy(() => import('./BookingForm'));
const BookingEditForm = lazy(() => import('./BookingEditForm'));

const BookingPanel = () => {
  const panelMode = useBookingStore((state) => state.panelMode);
  const selectedBookingId = useBookingStore((state) => state.selectedBookingId);
  const bookingsById = useBookingStore((state) => state.bookingsById);
  const clearSelection = useBookingStore((state) => state.clearSelectedBooking);

  if (!panelMode) return null;

  const booking = selectedBookingId ? bookingsById[selectedBookingId] : null;

  const closePanel = () => {
    clearSelection();
  };

  const renderHeader = () => {
    switch (panelMode) {
      case 'view':
        return 'Booking Details';
      case 'create':
        return 'Create Booking';
      case 'edit':
        return 'Edit Booking';
      default:
        return '';
    }
  };

  const renderContent = () => {
    switch (panelMode) {
      case 'view':
        if (!booking) {
          return (
            <div className="rounded border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
              Booking data unavailable.
            </div>
          );
        }
        return <BookingDetails booking={booking} />;

      case 'create':
        return <BookingForm onClose={closePanel} />;

      case 'edit':
        if (!booking) {
          return (
            <div className="rounded border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
              Booking data unavailable.
            </div>
          );
        }
        return <BookingEditForm booking={booking} onClose={closePanel} />;

      default:
        return null;
    }
  };

  return (
    <aside className="fixed right-0 top-0 z-30 h-full w-80 border-l border-gray-200 bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-800">
          {renderHeader()}
        </h2>

        <button
          type="button"
          onClick={closePanel}
          className="text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          Close
        </button>
      </div>

      <div className="h-[calc(100%-57px)] overflow-y-auto px-4 py-4 text-sm text-gray-700">
        <Suspense fallback={<Loader />}>
          {renderContent()}
        </Suspense>
      </div>
    </aside>
  );
};

export default React.memo(BookingPanel);
