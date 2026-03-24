// Main page composition.
// Responsibilities:
// - Render dashboard header
// - Render time rail
// - Render virtualized calendar board
// - Lazy load booking side panel

import React, { useRef, Suspense, lazy, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useBookingStore } from '../store/bookingStore';
import BookingOverlay from '../components/calendar/BookingOverlay';
import TherapistHeader from '../components/calendar/TherapistHeader';
import TimeAxis from '../components/calendar/TimeAxis';
import CalendarBoard from '../components/calendar/CalendarBoard';
import Loader from '../components/common/Loader';
import { THERAPISTS } from '../constants/therapistList';
import { snapBookingTime } from '../utils/snapBookingTime';
import { bookingService } from '../services/bookingServices';
import { loggerService } from '../services/loggerServices';


const BookingPanel = lazy(() => import('../components/booking/BookingPanel'));

const Dashboard = () => {
  const panelMode = useBookingStore((state) => state.panelMode);
  const bookingsById = useBookingStore((state) => state.bookingsById);
  const updateBooking = useBookingStore((state) => state.updateBooking);

  const [activeId, setActiveId] = useState(null);

  const scrollRef = useRef(null);
  const headerRef = useRef(null);
  const dragOffsetRef = useRef(0);

  const handleScroll = (e) => {
    requestAnimationFrame(() => {
      if (headerRef.current) {
        headerRef.current.scrollLeft = e.target.scrollLeft;
      }
    });
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);

    const activeRect = event.active.rect.current.translated
      || event.active.rect.current.initial;

    if (activeRect) {
      dragOffsetRef.current =
        event.activatorEvent.clientY - activeRect.top;
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    setActiveId(null);

    if (!over) {
      return;
    }

    const booking = bookingsById[active.id];

    if (!booking) {
      return;
    }

    const bookingItemGroups = Object.values(booking.booking_item || {});
    const primaryItem = bookingItemGroups[0]?.[0];

    if (!primaryItem) {
      return;
    }

    const targetTherapist =
      THERAPISTS.find((therapist) => therapist.id === over.id) ||
      THERAPISTS.find((therapist) => therapist.id === booking.therapistId);

    if (!targetTherapist) {
      return;
    }

    const dropRect = over.rect;
    const finalClientY = event.activatorEvent.clientY + event.delta.y - dragOffsetRef.current;
    const scrollTop = scrollRef.current?.scrollTop ?? 0;

    const snappedTime = snapBookingTime(
      booking,
      dropRect,
      finalClientY,
      scrollTop,
    );

    if (!snappedTime) {
      return;
    }

    const firstGroupKey = Object.keys(booking.booking_item)[0];
    const existingGroup = booking.booking_item[firstGroupKey] || [];

    const updatedBooking = {
      ...booking,
      therapistId: targetTherapist.id,
      therapistName: targetTherapist.name,
      therapistGender: targetTherapist.gender,
      start_time: snappedTime.startTime,
      end_time: snappedTime.endTime,
      service_at: snappedTime.serviceAt,
      booking_item: {
        ...booking.booking_item,
        [firstGroupKey]: [
          {
            ...existingGroup[0],
            therapist_id: targetTherapist.id,
            therapist: targetTherapist.name,
            gender: targetTherapist.gender,
            start_time: snappedTime.startTime,
            end_time: snappedTime.endTime,
            service_at: snappedTime.serviceAt,
          },
          ...existingGroup.slice(1),
        ]
      },
    };

    try {
      const savedBooking = await bookingService.rescheduleBooking(updatedBooking);
      updateBooking(savedBooking || updatedBooking);

      loggerService.info('Booking moved', {
        bookingId: booking.id,
        targetTherapist: targetTherapist.id,
        startTime: snappedTime.startTime,
      });
    } catch (error) {
      loggerService.error('Booking move failed', error);
    }
  };

  const activeBooking = activeId ? bookingsById[activeId] : null;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    })
  );

  return (
    <main className="flex flex-col min-h-screen bg-gray-100">
      <div className="sticky top-0 z-30">
        <BookingOverlay />
        <TherapistHeader ref={headerRef} />
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex flex-1 overflow-x-auto overflow-y-scroll rounded-lg border border-gray-200 bg-white pb-2">
          <TimeAxis />
          <CalendarBoard />
        </div>

        <DragOverlay>
          {activeBooking ? (
            <div className="pointer-events-none z-[9999] rounded-md px-3 py-2 text-xs text-white shadow-lg bg-blue-500 min-w-[140px]">
              <div className="font-medium truncate">
                {activeBooking.booking || activeBooking.clientName}
              </div>
              <div className="text-[10px] opacity-90 truncate">
                {activeBooking.therapistName}
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Lazy load side panel because booking details are secondary interaction path */}
      {panelMode && (
        <Suspense fallback={<Loader />}>
          <BookingPanel />
        </Suspense>
      )}
    </main>
  );
};

export default Dashboard;
