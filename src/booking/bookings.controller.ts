import express from "express";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as BookingService from "./bookings.service";
import { auth } from "../middleware/auth.middleware";
import { Booking } from "./booking.interface";

const router = express.Router();

router.get(
  "/",
  auth,
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const bookings: Booking[] = await BookingService.findAll();
      res.status(200).send(bookings);
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
      const booking: Booking = await BookingService.find(id);
      if (booking) {
        res.status(200).send(booking);
      }

      res.status(404).send({ message: "Booking not found" });
    } catch (e) {
      res.status(500).send();
    }
  })
);

router.post("/", auth, async (req: Request, res: Response) => {
  try {
    const booking: Booking = req.body;
    const response = await BookingService.create(booking);
    booking.id = response;
    res.status(201).json(booking);
  } catch (err: Error | any) {
    res.status(500).send({ message: err.message });
  }
});

export default router;
