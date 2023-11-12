import request from "supertest";
import app from "../../app";

describe("Location routes", () => {
  test("Get all locations", async () => {
    const response = await request(app).get("/locations");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([
      {
        id: 1,
        name: "Harbor",
      },
      {
        id: 2,
        name: "Airport",
      },
      {
        id: 3,
        name: "Park",
      },
      {
        id: 4,
        name: "Hall",
      },
    ]);
  });

  test("Get a location", async () => {
    const response = await request(app).get("/locations/1");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      id: 1,
      name: "Harbor",
    });
  });
});
