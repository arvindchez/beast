import { Location } from "../location/location.interface";
import knex from "../knex";

export const findAll = async (): Promise<Location[]> => {
  return await knex<Location>("locations");
};

export const find = async (id: number): Promise<Location> => {
  const location: Location = await knex("locations").where("id", id).first();
  return location;
};
