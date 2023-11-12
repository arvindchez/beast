import { Bike } from "./bike.interface";
import knex from "../knex";

export const findAll = async (): Promise<Bike[]> => {
  return await knex<Bike>("bikes");
};

export const find = async (id: number): Promise<Bike> => {
  const bike: Bike = await knex("bikes").where("id", id).first();
  return bike;
};
