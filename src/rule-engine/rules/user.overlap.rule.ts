import { Booking } from "../../booking/booking.interface";
import * as BookingService from "../../booking/bookings.service";
import { clashesWithExisting } from "../../utils/helpers";
import { Rule } from "../rule.interface";

export class UserOverlapRule implements Rule {
  validate = async (booking: Booking): Promise<boolean> => {
    const currentBookingStart = new Date(booking.start_at);
    const currentBookingEnd = new Date(booking.end_at);
    const query = `user_id = ${booking.user_id} and start_at >= ${
      currentBookingStart.toISOString().split("T")[0]
    }`;

    const bookings: Booking[] = await BookingService.customQuery(query);
    if (bookings) {
      if (bookings.length > 0) {
        return bookings.every((cur: Booking) => {
          const existingBookingStart = new Date(cur.start_at);
          const existingBookingEnd = new Date(cur.end_at);

          // Check whether there is a clash between the new booking and the existing booking
          return clashesWithExisting(
            existingBookingStart,
            existingBookingEnd,
            currentBookingStart,
            currentBookingEnd
          );
        });
      }
    }

    return false;
  };
}
