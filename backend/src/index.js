import app from "./server/server";
import dotenv from "dotenv";

import "./config/database";

dotenv.config();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("Server conected on port", port);
});
