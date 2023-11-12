import * as LocationService from "../location.service";
import { Location } from "../../location/location.interface";
describe("Location Service", () => {
  it("Should return all the locations", async () => {
    const locations: Location[] = await LocationService.findAll();
    expect(locations.length).toBeGreaterThan(0);
  });

  it("Should return the selected location", async () => {
    const locations: Location[] = await LocationService.findAll();
    const id: number = locations[0].id!;

    const location: Location = await LocationService.find(id);
    expect(location.name).toEqual(locations[0].name);
  });
});
