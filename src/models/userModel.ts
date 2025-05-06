import {Schema, model} from "mongoose";

interface IUser{
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userModel = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { unique: true, type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userModel);
export default User;