import express from "express";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as UserService from "../user/user.service";
import { auth } from "../middleware/auth.middleware";
import { User } from "../user/user.interface";

const router = express.Router();

router.get(
  "/",
  auth,
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const users: User[] = await UserService.findAll();
      res.status(200).send(users);
    } catch (e) {
      res.status(500).send();
    }
  })
);

router.get(
  "/:id",
  auth,
  asyncHandler(async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
      const user: User = await UserService.find(id);

      if (user) {
        res.status(200).send(user);
      }

      res.status(404).send("User not found");
    } catch (e) {
      res.status(500).send();
    }
  })
);

export default router;
