// Main page composition.
// Responsibilities:
// - Render dashboard header
// - Render search input
// - Render booking form
// - Render calendar board
// - Lazy load booking side panel

import React, { Suspense, lazy } from 'react';
import SearchBar from '../components/common/SearchBar';
import BookingForm from '../components/booking/BookingForm';
import CalendarBoard from '../components/calendar/CalendarBoard';

const BookingPanel = lazy(() => import('../components/booking/BookingPanel'));

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-gray-900">Booking Calendar</h1>
        <p className="text-sm text-gray-500">
          Therapist schedule overview and booking management
        </p>
      </div>

      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="w-full max-w-sm space-y-4">
          <SearchBar />
          <BookingForm />
        </div>

        <div className="flex-1">
          <CalendarBoard />
        </div>
      </div>

      <Suspense fallback={null}>
        <BookingPanel />
      </Suspense>
    </div>
  );
};

export default Dashboard;
