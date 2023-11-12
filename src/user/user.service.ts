import { User } from "../user/user.interface";
import knex from "../knex";

export const findAll = async (): Promise<User[]> => {
  return await knex<User>("users");
};

export const find = async (id: number): Promise<User> => {
  const user: User = await knex("users").where("id", id).first();
  return user;
};
