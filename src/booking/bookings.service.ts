import knex from "../knex";
import { Booking } from "./booking.interface";
import * as BikeService from "../bike/bike.service";
import * as UserService from "../user/user.service";
import { UserOverlapRule } from "../rule-engine/rules/user.overlap.rule";
import { RuleFactory } from "../rule-engine/factory.rule";
import { BikeOverlapRule } from "../rule-engine/rules/bike.overlap.rule";
import { StartDateRule } from "../rule-engine/rules/startdate.rule";
import { TotalBookingCountRule } from "../rule-engine/rules/total.booking.count.rule";

export const findAll = async (): Promise<Booking[]> => {
  return await knex<Booking>("bookings");
};

export const find = async (id: number): Promise<Booking> => {
  const booking: Booking = await knex("bookings").where("id", id).first();
  return booking;
};

export const create = async (booking: Booking): Promise<number> => {
  const user = await UserService.find(booking.user_id);
  if (!user) {
    throw new Error("User not found");
  }

  const bike = await BikeService.find(booking.bike_id);
  if (!bike) {
    throw new Error("Bike not found");
  }

  await RunRules(booking);

  const identity = await knex<Booking>("bookings").insert([booking]);
  return identity[0];
};

export const customQuery = async (query: string): Promise<Booking[]> => {
  const result: Booking[] = await knex<Booking>("bookings").modify(
    (queryBuilder) => {
      queryBuilder.andWhereRaw(query);
      return queryBuilder;
    }
  );

  return result;
};

const RunRules = async (booking: Booking) => {
  const context = new RuleFactory(new StartDateRule());
  let result = await context.check(booking);
  if (result) {
    throw new Error("Booking need to be made at least three days ahead.");
  }

  context.setRule(new TotalBookingCountRule());
  result = await context.check(booking);
  if (result) {
    throw new Error(
      "A person could have no more than 3 bookings scheduled in the future."
    );
  }

  context.setRule(new UserOverlapRule());
  result = await context.check(booking);
  if (result) {
    throw new Error("Bookings of a single person can't overlap.");
  }

  context.setRule(new BikeOverlapRule());
  result = await context.check(booking);
  if (result) {
    throw new Error("Same bike bookings cannot overlap.");
  }
};
