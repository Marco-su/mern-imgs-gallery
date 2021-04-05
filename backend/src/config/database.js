import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.DATABASE_URI;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database conected"))
  .catch((err) => console.log("Error conecting to database:", err));
