import User from "../models/User";
import Role from "../models/Role";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET_WORD || "secret";

//--Login
export const login = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email }).populate(
    "roles"
  );

  if (!userFound)
    return res.json({
      message: "User not found, verify your email",
      success: false,
    });

  const matchPassword = await User.comparePasswords(
    req.body.password,
    userFound.password
  );

  if (!matchPassword)
    return res.json({ message: "Invalid password", success: false });

  const token = jwt.sign({ userId: userFound._id }, secret, {
    expiresIn: 86400,
  });

  return res.json({ token, success: true });
};

//--Register
export const register = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email });

  if (userFound)
    return res.json({
      message: "This email is already in use",
      success: false,
    });

  const { username, email, password, roles } = req.body;

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save();

  return res.json({ message: "User created", success: true });
};
