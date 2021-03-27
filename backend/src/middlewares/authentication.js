import jwt from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv";

const secret = process.env.SECRET_WORD || "secret";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token)
      return res.json({ message: "Is not authenticated", success: false });

    const decoded = jwt.verify(token, secret);
    req.userId = decoded.userId;

    const userFound = await User.findById(req.userId, { password: 0 });

    if (!userFound)
      return res.json({
        message: "No user found with this token",
        success: false,
      });

    next();
  } catch (error) {
    res.json({ message: "Invalid token", success: false });
  }
};
