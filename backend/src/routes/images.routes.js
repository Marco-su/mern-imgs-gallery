import { Router } from "express";
import { uploader } from "../config/multer";
import { isAuth } from "../middlewares/authentication";
import {
  createNewImage,
  getImages,
  getSingleImage,
  updateImage,
  deleteImage,
} from "../controllers/images.controllers";

const router = Router();

router
  .route("/")
  .get(getImages)
  .post([isAuth, uploader.single("image")], createNewImage);

router
  .route("/:id")
  .get(getSingleImage)
  .put(isAuth, updateImage)
  .delete(isAuth, deleteImage);

export default router;
