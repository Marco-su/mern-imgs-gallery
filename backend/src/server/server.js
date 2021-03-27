//---Imports
import express from "express";
import cors from "cors";
import path from "path";

import authRoutes from "../routes/auth.routes";
import adminRoutes from "../routes/admin.routes";
import imagesRoutes from "../routes/images.routes";

//---Initializations
const app = express();

//---Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

//---Statics
app.use(express.static(path.join(__dirname, "../public/uploads")));

//---Routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/images", imagesRoutes);

//---Export
export default app;
