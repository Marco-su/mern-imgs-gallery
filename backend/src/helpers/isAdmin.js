import User from "../models/User";
import Role from "../models/Role";

export const isAdmin = async (userId) => {
  const userFound = await User.findById(userId);

  const roles = await Role.find({ _id: { $in: userFound.roles } });

  let admin = false;

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      admin = true;
      break;
    }
  }

  return admin;
};
