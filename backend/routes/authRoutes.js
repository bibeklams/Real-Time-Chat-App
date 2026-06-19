import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  register,
  login,
  refreshToken,
  getProfile,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.get("/profile", protect, getProfile);
router.post("/logout", protect, logout);

export default router;
