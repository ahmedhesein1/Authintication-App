import bcrypt from "bcryptjs";
import crypto from "crypto";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendResetPasswordEmail,
  sendSuccessEmail,
} from "../mailtrap/emails.js";
export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new AppError("You Are Not authorized", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  req.id = decoded.id;
  decoded ? next() : next(new AppError("Authorization failed"));
});
export const checkAuth = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.id);
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    success: true,
    ...user._doc,
    password: undefined,
  })
});
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
export const verifyEmail = asyncHandler(async (req, res, next) => {
  const { code } = req.body;
  const user = await User.findOne({
    verificationToken: code,
    verificationTokenExpiresAt: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError("Invalid or Expired code", 404));
  }
  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiresAt = undefined;
  await user.save();
  await sendWelcomeEmail(user.email, user.name);
  res.status(200).json({
    success: true,
    message: "Email verified successfully",
    user: {
      ...user._doc,
      password: undefined,
    },
  });
  next();
});
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isMatched = await bcrypt.compare(password, user.password);
  if (!user || !isMatched) {
    return next(new AppError("Email or Password Is Not Correct", 400));
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
  user.lastLogin = new Date();
  res
    .cookie("token", token, {
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
        token,
      },
    });
});
export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("User not found", 400));
  }
  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpiresAt = resetTokenExpiresAt;
  await user.save();
  await sendResetPasswordEmail(
    user.email,
    `${process.env.CLIENT_URL}/reset-password/${resetToken}`
  );
  res.status(200).json({
    success: true,
    message: "Reset password link sent successfully",
  });
  next();
});
export const resetPassword = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpiresAt: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError("Invalid Or Expired Token", 400));
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiresAt = undefined;
  await user.save();
  await sendSuccessEmail(user.email);
  res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
  next();
});
