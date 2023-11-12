import { Booking } from "../booking/booking.interface";

export interface Rule {
  validate(booking: Booking): Promise<boolean>;
}
