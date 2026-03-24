import { THERAPISTS } from '../constants/therapistList';

export const normalizeBooking = (booking, therapistMap, fallbackTherapist) => {
    const bookingGroups = Object.values(booking.booking_item || {});
    const primaryItem = bookingGroups[0]?.[0] ?? {};
    const rawTherapistId = primaryItem.therapist_id ?? booking.therapist_id;

    const therapistSeed = Number(String(rawTherapistId).replace(/\D/g, '')) || 0;
    const therapist = THERAPISTS[therapistSeed % THERAPISTS.length] || fallbackTherapist || THERAPISTS[0];

    const displayTime = `${(primaryItem.service_at ?? booking.service_at)?.split(/[ T]/)[0]} ${primaryItem.start_time ?? booking.start_time}`;

    const rawDuration = primaryItem.duration ?? booking.duration ?? 60;
    const normalizedDuration = rawDuration > 300 ? Math.round(rawDuration / 60) : rawDuration;

    return {
        ...booking,
        therapistId: therapist.id,
        therapistName: therapist.name,
        therapistGender: therapist.gender.toLowerCase(),
        clientName: booking.user?.name || '',
        service: primaryItem.service?.name || primaryItem.service_name || primaryItem.service || '',
        requestedOnly: Boolean(primaryItem.requested_person),
        start_time: primaryItem.start_time ?? booking.start_time,
        end_time: primaryItem.end_time ?? booking.end_time,
        service_at: primaryItem.service_at ?? booking.service_at,
        displayTime: displayTime,
        duration: normalizedDuration,
        status: booking.status || '',
        resourceName: booking.resource_name || '',
    };
};
