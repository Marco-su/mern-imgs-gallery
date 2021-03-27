import multer from "multer";
import path from "path";
import { randomName } from "../helpers/randomName";

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },

  filename: (req, file, cb) => {
    const imgName = randomName();

    const ext = path.extname(file.originalname).toLowerCase();

    cb(null, `${imgName}-${Date.now()}${ext}`);
  },
});

export const uploader = multer({ storage });
