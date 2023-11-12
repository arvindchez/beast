import express from "express";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as BikeService from "../bike/bike.service";
import { Bike } from "../bike/bike.interface";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const bikes: Bike[] = await BikeService.findAll();
      res.status(200).send(bikes);
    } catch (e) {
      res.status(500).send();
    }
  })
);

router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
      const bike: Bike = await BikeService.find(id);

      if (bike) {
        res.status(200).send(bike);
      }

      res.status(404).send("Bike not found");
    } catch (e) {
      res.status(500).send();
    }
  })
);

export default router;
