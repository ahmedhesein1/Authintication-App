import express from "express";
import * as authControl from "../controllers/authControl.js";
// import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", authControl.signup);
// router.post("/login", login);
// router.post("/logout", logout);

// router.post("/verify-email", verifyEmail);
// router.post("/forgot-password", forgotPassword);

// router.post("/reset-password/:token", resetPassword);

export default router;
