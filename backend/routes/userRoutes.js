import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminOnly.js";

import {
  getAllUser,
  getSingleUser,
  updateProfile,
  banUser,
  unbanUser,
} from "../controllers/userController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllUser);
router.get("/:id", protect, getSingleUser);
router.put("/update-profile", protect, upload.single("image"), updateProfile);
router.patch("/:id/ban", protect, adminOnly, banUser);

router.patch("/:id/unban", protect, adminOnly, unbanUser);

export default router;
