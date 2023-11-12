import { Request, Response, NextFunction } from "express";
import knex from "../knex";
import { User } from "../user/user.interface";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error();
    }

    const user: User = await knex("users").where("token", token).first();
    if (!user) {
      throw new Error();
    }

    next();
  } catch (e) {
    res.status(401).send("Error: Please authenticate");
  }
};
