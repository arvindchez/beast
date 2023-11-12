import request from "supertest";
import app from "../../app";

describe("Bike routes", () => {
  test("Get all bikes", async () => {
    const response = await request(app).get("/bikes");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([
      {
        id: 1,
        type: "electric",
        price_per_day: 10,
      },
      {
        id: 2,
        type: "classic",
        price_per_day: 3,
      },
      {
        id: 3,
        type: "modern",
        price_per_day: 5,
      },
      {
        id: 4,
        type: "classic",
        price_per_day: 3,
      },
    ]);
  });

  test("Get a bike", async () => {
    const response = await request(app).get("/bikes/1");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      id: 1,
      type: "electric",
      price_per_day: 10,
    });
  });
});
