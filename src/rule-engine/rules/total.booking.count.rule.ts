import { Booking } from "../../booking/booking.interface";
import * as BookingService from "../../booking/bookings.service";
import { Rule } from "../rule.interface";

export class TotalBookingCountRule implements Rule {
  validate = async (booking: Booking): Promise<boolean> => {
    const currentDate = new Date();
    const query = `user_id = ${booking.user_id} and start_at >= ${
      currentDate.toISOString().split("T")[0]
    }`;

    const bookings: Booking[] = await BookingService.customQuery(query);
    const count = process.env.BOOKING_COUNT_THRESHOLD
      ? parseInt(process.env.BOOKING_COUNT_THRESHOLD, 10)
      : 3;

    return await new Promise((resolve, _reject) => {
      setImmediate(() => {
        if (bookings && bookings.length >= count) {
          return resolve(true);
        }

        return resolve(false);
      });
    });
  };
}
