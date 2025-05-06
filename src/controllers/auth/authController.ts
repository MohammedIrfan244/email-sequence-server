import { Request, Response } from "express";
import User from "../../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import CustomError from "../../lib/utils/CustomError";

const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log("test");
    return new CustomError("User already exists", 400);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (!newUser) {
    return new CustomError("User registration failed", 400);
  }
  res.status(201).json({
    status: "success",
    message: "User registered successfully",
  });
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return new CustomError("Invalid Credentials", 400);
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return new CustomError("Invalid Credentials", 400);
  }
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );
  res.status(200).json({
    status: "success",
    token,
  });
};

export { registerUser, loginUser };
