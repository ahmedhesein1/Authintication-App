import bcrypt from "bcryptjs";
import crypto from "crypto";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import {sendVerificationEmail} from "../mailtrap/emails.js";
export const signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return next(new AppError("User already exists", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = generateVerificationCode();

  const newUser = await User.create({
    email,
    password: hashedPassword,
    name,
    verificationToken,
    verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
  });
  await sendVerificationEmail(email, verificationToken);
  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: {
      ...newUser._doc,
      password: undefined,
    },
  });
});
