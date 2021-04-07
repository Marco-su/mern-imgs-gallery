import jwt from "jsonwebtoken";
import User from "../models/User";

const secret = process.env.SECRET_WORD || "secret";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.signedCookies.auth;
    const verifyToken = req.signedCookies.authConfirm;

    if (!verifyToken || token !== verifyToken)
      res.json({ message: "No valid user found", success: false });

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
    console.log(error.message);
    res.json({ message: "Invalid token", success: false });
  }
};
