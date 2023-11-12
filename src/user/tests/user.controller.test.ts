import request from "supertest";
import app from "../../app";

describe("User routes", () => {
  const token = "1234";
  test("Get all users", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([
      {
        id: 1,
        name: "John",
        token: "my_secret_token_123",
      },
      {
        id: 2,
        name: "Maria",
        token: null,
      },
      {
        id: 3,
        name: "Tomy",
        token: "1234",
      },
    ]);
  });

  test("Get a user", async () => {
    const response = await request(app)
      .get("/users/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      id: 1,
      name: "John",
      token: "my_secret_token_123",
    });
  });
});
