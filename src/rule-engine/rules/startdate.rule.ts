import { Booking } from "../../booking/booking.interface";
import { Rule } from "../rule.interface";

export class StartDateRule implements Rule {
  validate = async (booking: Booking): Promise<boolean> => {
    const startDate = new Date(booking.start_at);
    const targetDate = new Date();
    let days: number = process.env.BOOKING_DAYS_THRESHOLD
      ? parseInt(process.env.BOOKING_DAYS_THRESHOLD, 10)
      : 3;
    days = days - 1;

    targetDate.setDate(targetDate.getDate() + days);
    return await new Promise((resolve, _reject) => {
      setImmediate(() => {
        if (startDate < targetDate) {
          return resolve(true);
        }

        return resolve(false);
      });
    });
  };
}
