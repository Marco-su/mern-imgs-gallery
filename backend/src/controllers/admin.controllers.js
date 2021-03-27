import fs from "fs-extra";
import path from "path";

import User from "../models/User";
import Image from "../models/Image";
import { isAdmin } from "../helpers/isAdmin";

export const deleteUser = async (req, res) => {
  const admin = await isAdmin(req.userId);

  if (!admin)
    return res.json({ message: "Not authorized to delete it", success: false });

  await User.findByIdAndDelete(req.params.id);

  //--Delete this user images
  const images = await Image.find({ userId: req.params.id });

  await Image.deleteMany({ userId: req.params.id });

  for (let i = 0; i < images.length; i++) {
    await fs.unlink(
      path.join(__dirname, `../public/uploads/${images[i].storage_name}`)
    );
  }

  res.json({ message: "User deleted", success: true });
};
