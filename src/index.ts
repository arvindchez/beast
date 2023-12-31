import app from "./app";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT, 10);

app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}`);
});
