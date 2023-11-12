import * as UserService from "../../user/user.service";
import { User } from "../../user/user.interface";
describe("User Service", () => {
  it("Should return all the Users", async () => {
    const users = await UserService.findAll();
    expect(users.length).toBeGreaterThan(0);
  });

  it("Should return the selected User", async () => {
    const users = await UserService.findAll();
    const id: number = users[0].id!;

    const user: User = await UserService.find(id);
    expect(user.name).toEqual(users[0].name);
  });
});
