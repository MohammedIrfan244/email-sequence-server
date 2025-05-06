import express from 'express';
import { tryCatch } from '../lib/utils/tryCatch';
import { loginUser, registerUser } from '../controllers/auth/authController';

const route=express.Router();

route
.post("/register",tryCatch(registerUser))
.post("/login",tryCatch(loginUser))

export default route;