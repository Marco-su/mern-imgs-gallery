//---Imports
import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "../routes/auth.routes";
import adminRoutes from "../routes/admin.routes";
import imagesRoutes from "../routes/images.routes";

//---Initializations
dotenv.config();
const app = express();

//---Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser(process.env.COOKIE_SECRET || "secret"));

//---Statics
app.use(express.static(path.join(__dirname, "../public/uploads")));

//---Routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/images", imagesRoutes);

//---Export
export default app;
