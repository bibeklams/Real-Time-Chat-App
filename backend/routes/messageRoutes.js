import express from "express";
import {
  sendMessage,
  getMessages,
  messageSeen,
} from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:receiverId", protect, sendMessage);
router.get("/:receiverId", protect, getMessages);
router.patch("/:messageId/seen", protect, messageSeen);

export default router;
