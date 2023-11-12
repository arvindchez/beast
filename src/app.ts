import express from "express";
import cors from "cors";
import bikes from "./bike/bikes.controller";
import locations from "./location/locations.controller";
import bookings from "./booking/bookings.controller";
import users from "./user/users.controller";
import { notFoundHandler } from "./middleware/not-found.middleware";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/bikes", bikes);
app.use("/locations", locations);
app.use("/bookings", bookings);
app.use("/users", users);

app.use(notFoundHandler);

export default app;
