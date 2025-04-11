import express from "express";
import * as authControl from "../controllers/authControl.js";
// import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", authControl.protect, authControl.checkAuth);

router.post("/signup", authControl.signup);
router.post("/login", authControl.login);
router.post("/logout", authControl.logout);

router.post("/verify-email", authControl.verifyEmail);
router.post("/forgot-password", authControl.forgotPassword);

router.post("/reset-password/:token", authControl.resetPassword);

export default router;
