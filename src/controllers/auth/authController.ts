import { NextFunction, Request, Response } from "express";
import User from "../../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import CustomError from "../../lib/utils/CustomError";
import { AuthenticatedRequest } from "../../lib/types/type";

const registerUser = async (req: Request, res: Response,next : NextFunction) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new CustomError("User already exists", 400))
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (!newUser) {
    return next(new CustomError("User registration failed", 500))
  }
  res.status(201).json({
    status: "success",
    message: "User registered successfully",
  });
};

const loginUser = async (req: AuthenticatedRequest, res: Response, next:NextFunction) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError("User not found", 404))
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return next(new CustomError("User not found", 404))
  }
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );
  req.user = user._id.toString();
  res.status(200).json({
    status: "success",
    token,
  });
};

export { registerUser, loginUser };
