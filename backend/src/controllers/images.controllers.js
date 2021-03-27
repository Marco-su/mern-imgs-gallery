import Image from "../models/Image";
import { isAdmin } from "../helpers/isAdmin";

import fs from "fs-extra";
import path from "path";

//--Get images
export const getImages = async (req, res) => {
  const images = await Image.find().sort({ createdAt: -1 }).limit(20);

  return res.json(images);
};

//--Get single image
export const getSingleImage = async (req, res) => {
  const image = await Image.findById(req.params.id);

  if (!image)
    return res.json({ message: "The image does not exist", success: false });

  return res.json(image);
};

//--Create image
export const createNewImage = async (req, res) => {
  const { title, description } = req.body;

  if (!req.file) return res.json({ message: "No file found", success: false });

  const storage_name = req.file.filename;

  const newImage = new Image({
    title,
    description,
    userId: req.userId,
    storage_name,
  });

  await newImage.save();

  return res.json({ message: "Image uploaded", success: true });
};

//--Update image
export const updateImage = async (req, res) => {
  const image = await Image.findById(req.params.id);

  if (!image)
    return res.json({ message: "The image does not exist", success: false });

  if (image.userId !== req.userId)
    return res.json({ message: "Not authorized to update", success: false });

  await Image.findByIdAndUpdate(req.params.id, req.body);

  return res.json({ message: "Image updated", success: true });
};

//--Delete image
export const deleteImage = async (req, res) => {
  const image = await Image.findById(req.params.id);

  if (!image)
    return res.json({ message: "The image does not exist", success: false });

  if (image.userId !== req.userId) {
    const admin = await isAdmin(req.userId);

    if (!admin) return res.json({ message: "Not authorized to delete it" });
  }

  const deletedImage = await Image.findByIdAndDelete(req.params.id);

  await fs.unlink(
    path.join(__dirname, `../public/uploads/${deletedImage.storage_name}`)
  );

  return res.json({ message: "Image deleted", success: true });
};
