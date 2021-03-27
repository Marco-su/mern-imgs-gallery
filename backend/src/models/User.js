import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

UserSchema.statics.encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

UserSchema.statics.comparePasswords = async (typedPassword, dbPassword) => {
  return await bcrypt.compare(typedPassword, dbPassword);
};

export default model("User", UserSchema);
