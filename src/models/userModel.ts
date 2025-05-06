import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    username: { unique: true, type: String, required: true },
    email: { unique: true, type: String, required: true },
    password: { type: String, required: true },
    googleId: { type: String, required: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userModel);
export default User;