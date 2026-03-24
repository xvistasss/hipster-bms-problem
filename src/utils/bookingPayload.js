export const buildReschedulePayload = (booking) => {
  const bookingItemGroups = Object.values(booking.booking_item || {});
  const primaryItem = bookingItemGroups[0]?.[0];

  if (!primaryItem) {
    return null;
  }

  const formData = new FormData();

  formData.append('id', booking.id);

  formData.append(
    'items',
    JSON.stringify([
      {
        id: primaryItem.id,
        start_time: primaryItem.start_time,
        end_time: primaryItem.end_time,
      },
    ])
  );

  formData.append('service_at', primaryItem.service_at);
  formData.append('panel', booking.panel || 'customer');

  return formData;
};