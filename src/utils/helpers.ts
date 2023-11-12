export const clashesWithExisting = (
  existingBookingStart: Date,
  existingBookingEnd: Date,
  newBookingStart: Date,
  newBookingEnd: Date
): boolean => {
  if (
    (newBookingStart >= existingBookingStart &&
      newBookingStart <= existingBookingEnd) ||
    (existingBookingStart >= newBookingStart &&
      existingBookingStart <= newBookingEnd)
  ) {
    return true;
  }

  return false;
};
