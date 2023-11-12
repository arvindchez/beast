export interface Booking {
  id?: number;
  user_id: number;
  bike_id: number;
  start_at: Date | string;
  end_at: Date | string;
}
