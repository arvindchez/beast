import express from "express";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as LocationService from "../location/location.service";
import { Location } from "../location/location.interface";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const locations: Location[] = await LocationService.findAll();
      res.status(200).send(locations);
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
      const location: Location = await LocationService.find(id);

      if (location) {
        res.status(200).send(location);
      }

      res.status(404).send("Location not found");
    } catch (e) {
      res.status(500).send();
    }
  })
);

export default router;
