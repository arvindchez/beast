import request from "supertest";
import app from "../../app";

import * as BikeService from "../../bike/bike.service";
import * as UserService from "../../user/user.service";
import { Bike } from "../../bike/bike.interface";
import { User } from "../../user/user.interface";
import knex from "../../knex";

beforeEach(async () => {
  await knex("bookings").truncate();
});

afterEach(async () => {
  await knex("bookings").truncate();
});

describe("Booking routes", () => {
  const token = "1234";
  test("Get all bookings", async () => {
    const response = await request(app)
      .get("/bookings")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });

  test("Get a invalid booking with 404 exception", async () => {
    const response = await request(app)
      .get("/bookings/abcc")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual("Booking not found");
  });

  test("Create a valid booking", async () => {
    const { response, payload } = await CreateNewBooking(token);
    expect(response.status).toEqual(201);
    expect(response.body.bike_id).toEqual(payload.bike_id);
    expect(response.body.user_id).toBe(payload.user_id);
    expect(response.body.start_at).toEqual(payload.start_at);
    expect(response.body.end_at).toBe(payload.end_at);
  });

  test("Get a valid booking", async () => {
    const { response, payload } = await CreateNewBooking(token);

    const id: number = response.body.id;
    const res = await request(app)
      .get(`/bookings/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toEqual(200);
    expect(res.body.id).toEqual(id);
    expect(res.body.bike_id).toEqual(payload.bike_id);
    expect(res.body.user_id).toBe(payload.user_id);
    expect(res.body.start_at).toEqual(payload.start_at);
    expect(res.body.end_at).toBe(payload.end_at);
  });
});

const createPayload = async () => {
  const bikes: Bike[] = await BikeService.findAll();
  const bike_id: number = bikes[0].id!;

  const users: User[] = await UserService.findAll();
  const user_id: number = users[0].id!;

  const startDate = new Date();
  const endDate = new Date();
  startDate.setDate(startDate.getDate() + 3);
  endDate.setDate(endDate.getDate() + 4);

  const payload = {
    bike_id,
    user_id,
    start_at: startDate.toISOString().split("T")[0],
    end_at: endDate.toISOString().split("T")[0],
  };

  return payload;
};

const CreateNewBooking = async (token: string) => {
  const payload = await createPayload();
  const response = await request(app)
    .post("/bookings")
    .set("Authorization", `Bearer ${token}`)
    .send(payload)
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
  return { response, payload };
};
