import { format, setHours, addMinutes, setMinutes } from 'date-fns';
import {
    CALENDAR_START_HOUR,
    CALENDAR_INTERVAL_MINUTES,
    PIXELS_PER_MINUTE
} from '../constants/calendarConfig';

export const snapBookingTime = (
  booking,
  dropRect,
  clientY,
  scrollTop,
) => {
    if (!dropRect) {
        return null;
    }
    
    const slotHeight = CALENDAR_INTERVAL_MINUTES * PIXELS_PER_MINUTE;

    // Pure relative Y inside drop target
    const relativeY = clientY - dropRect.top + scrollTop;

     // Snap to nearest slot
    const slotIndex = Math.max(
        0,
        Math.floor((relativeY + slotHeight / 2) / slotHeight)
    );

    const totalMinutes = slotIndex * CALENDAR_INTERVAL_MINUTES;

    const hours = CALENDAR_START_HOUR + Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const bookingItemGroups = Object.values(booking.booking_item || {});
    const primaryItem = bookingItemGroups[0]?.[0];

    if (!primaryItem) {
        return null;
    }

    const currentDate = new Date(primaryItem.service_at.replace(' ', 'T'));

    const nextDate = setMinutes(
        setHours(currentDate, hours),
        minutes
    );
    const endDate = addMinutes(nextDate, primaryItem.duration);

    return {
        startTime: format(nextDate, 'HH:mm:ss'),
        endTime: format(endDate, 'HH:mm:ss'),
        serviceAt: format(nextDate, 'yyyy-MM-dd HH:mm:ss'),
    };
};
