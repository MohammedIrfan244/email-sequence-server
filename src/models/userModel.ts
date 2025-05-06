import {Schema, model} from "mongoose";

interface IUser{
  username: string;
  email: string;
  password: string;
  googleId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userModel = new Schema<IUser>(
  {
    username: { unique: true, type: String, required: true },
    email: { unique: true, type: String, required: true },
    password: { type: String, required: true },
    googleId: { type: String, required: false },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userModel);
export default User;