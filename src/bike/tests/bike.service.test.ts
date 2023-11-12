import { Bike } from "../bike.interface";
import * as BikeService from "../bike.service";

describe("Bike Service", () => {
  it("Should return all the bikes", async () => {
    const bikes: Bike[] = await BikeService.findAll();
    expect(bikes.length).toBeGreaterThan(3);
  });

  it("Should return the selected bike", async () => {
    const bikes: Bike[] = await BikeService.findAll();
    const id: number = bikes[0].id!;

    const bike = await BikeService.find(id);
    expect(bike.type).toEqual(bikes[0].type);
  });
});
