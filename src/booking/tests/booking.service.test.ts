import * as BookingService from "../bookings.service";
import * as BikeService from "../../bike/bike.service";
import * as UserService from "../../user/user.service";
import { Booking } from "../booking.interface";
import { Bike } from "../../bike/bike.interface";
import { User } from "../../user/user.interface";
import knex from "../../knex";

beforeEach(async () => {
  await knex("bookings").truncate();
});

afterEach(async () => {
  await knex("bookings").truncate();
});

describe("Booking Service", () => {
  it("Should create a booking", async () => {
    const bikes: Bike[] = await BikeService.findAll();
    const bike_id: number = bikes[0].id!;

    const users: User[] = await UserService.findAll();
    const user_id: number = users[0].id!;

    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(startDate.getDate() + 3);
    endDate.setDate(endDate.getDate() + 4);

    const expectedbooking = {
      bike_id,
      user_id,
      start_at: startDate.toISOString().split("T")[0],
      end_at: endDate.toISOString().split("T")[0],
    };

    const bookingId: number = await BookingService.create(expectedbooking);
    expect(bookingId).toBeGreaterThan(0);

    const receivedbooking = await BookingService.find(bookingId);
    expect(receivedbooking.id).toEqual(bookingId);
    expect(
      new Date(receivedbooking.start_at).toISOString().split("T")[0]
    ).toEqual(new Date(expectedbooking.start_at).toISOString().split("T")[0]);
    expect(
      new Date(receivedbooking.end_at).toISOString().split("T")[0]
    ).toEqual(new Date(expectedbooking.end_at).toISOString().split("T")[0]);
    expect(expectedbooking.bike_id).toEqual(bike_id);
    expect(expectedbooking.user_id).toEqual(user_id);
  });

  it("Should return all the Bookings", async () => {
    const bikes: Bike[] = await BikeService.findAll();
    const bike_id: number = bikes[0].id!;

    const users: User[] = await UserService.findAll();
    const user_id: number = users[0].id!;

    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(startDate.getDate() + 5);
    endDate.setDate(endDate.getDate() + 6);

    const expectedbooking = {
      bike_id,
      user_id,
      start_at: startDate.toISOString().split("T")[0],
      end_at: endDate.toISOString().split("T")[0],
    };

    const bookingId: number = await BookingService.create(expectedbooking);
    expect(bookingId).toBeGreaterThan(0);

    const bookings: Booking[] = await BookingService.findAll();
    expect(bookings.length).toEqual(1);
  });

  it("Should return the selected booking", async () => {
    const bikes: Bike[] = await BikeService.findAll();
    const bike_id: number = bikes[0].id!;

    const users: User[] = await UserService.findAll();
    const user_id: number = users[0].id!;

    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(startDate.getDate() + 7);
    endDate.setDate(endDate.getDate() + 8);

    const expectedbooking = {
      bike_id,
      user_id,
      start_at: startDate.toISOString().split("T")[0],
      end_at: endDate.toISOString().split("T")[0],
    };

    const bookingId: number = await BookingService.create(expectedbooking);
    expect(bookingId).toBeGreaterThan(0);

    const booking = await BookingService.find(bookingId);
    expect(booking.id).toEqual(bookingId);
  });

  it("Should throw 'Booking need to be made at least three days ahead.' exception", async () => {
    const bikes: Bike[] = await BikeService.findAll();
    const bike_id: number = bikes[0].id!;

    const users: User[] = await UserService.findAll();
    const user_id: number = users[0].id!;

    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(startDate.getDate());
    endDate.setDate(endDate.getDate() + 9);

    const expectedbooking = {
      bike_id,
      user_id,
      start_at: startDate.toISOString().split("T")[0],
      end_at: endDate.toISOString().split("T")[0],
    };

    await expect(
      async () => await BookingService.create(expectedbooking)
    ).rejects.toThrowError(
      "Booking need to be made at least three days ahead."
    );
  });

  it("Should throw 'Bookings of a single person can't overlap.' exception", async () => {
    const bikes: Bike[] = await BikeService.findAll();
    const bike_id: number = bikes[0].id!;

    const users: User[] = await UserService.findAll();
    const user_id: number = users[0].id!;

    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(startDate.getDate() + 10);
    endDate.setDate(endDate.getDate() + 11);

    const expectedbooking = {
      bike_id,
      user_id,
      start_at: startDate.toISOString().split("T")[0],
      end_at: endDate.toISOString().split("T")[0],
    };

    let bookingId: number = await BookingService.create(expectedbooking);
    expect(bookingId).toBeGreaterThan(0);

    await expect(async () => {
      bookingId = await BookingService.create(expectedbooking);
    }).rejects.toThrowError("Bookings of a single person can't overlap.");
  });

  it("Should throw 'Same bike bookings cannot overlap.' exception", async () => {
    const bikes: Bike[] = await BikeService.findAll();
    const bike_id: number = bikes[0].id!;

    const users: User[] = await UserService.findAll();
    const user_id: number = users[0].id!;

    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(startDate.getDate() + 12);
    endDate.setDate(endDate.getDate() + 13);

    const expectedbooking1 = {
      bike_id,
      user_id,
      start_at: startDate.toISOString().split("T")[0],
      end_at: endDate.toISOString().split("T")[0],
    };

    const bookingId: number = await BookingService.create(expectedbooking1);
    expect(bookingId).toBeGreaterThan(0);

    const expectedbooking2 = {
      bike_id,
      user_id: users[1].id!,
      start_at: startDate.toISOString().split("T")[0],
      end_at: endDate.toISOString().split("T")[0],
    };

    await expect(
      async () => await BookingService.create(expectedbooking2)
    ).rejects.toThrowError("Same bike bookings cannot overlap.");
  });

  it("Should throw 'A person could have no more than 3 bookings scheduled in the future.' exception", async () => {
    const bikes: Bike[] = await BikeService.findAll();
    const bike_id: number = bikes[0].id!;

    const users: User[] = await UserService.findAll();
    const user_id: number = users[0].id!;

    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(startDate.getDate() + 12);
    endDate.setDate(endDate.getDate() + 13);

    const expectedbooking1 = {
      bike_id,
      user_id,
      start_at: startDate.toISOString().split("T")[0],
      end_at: endDate.toISOString().split("T")[0],
    };

    let bookingId: number = await BookingService.create(expectedbooking1);
    expect(bookingId).toBeGreaterThan(0);

    startDate.setDate(endDate.getDate() + 1);
    endDate.setDate(endDate.getDate() + 2);
    const expectedbooking2 = {
      bike_id,
      user_id,
      start_at: startDate.toISOString().split("T")[0],
      end_at: endDate.toISOString().split("T")[0],
    };

    bookingId = await BookingService.create(expectedbooking2);
    expect(bookingId).toBeGreaterThan(0);

    startDate.setDate(endDate.getDate() + 1);
    endDate.setDate(endDate.getDate() + 2);
    const expectedbooking3 = {
      bike_id,
      user_id,
      start_at: startDate.toISOString().split("T")[0],
      end_at: endDate.toISOString().split("T")[0],
    };

    bookingId = await BookingService.create(expectedbooking3);
    expect(bookingId).toBeGreaterThan(0);

    startDate.setDate(endDate.getDate() + 1);
    endDate.setDate(endDate.getDate() + 2);
    const expectedbooking4 = {
      bike_id,
      user_id,
      start_at: startDate.toISOString().split("T")[0],
      end_at: endDate.toISOString().split("T")[0],
    };

    await expect(async () => {
      bookingId = await BookingService.create(expectedbooking4);
    }).rejects.toThrowError(
      "A person could have no more than 3 bookings scheduled in the future."
    );
  });
});
