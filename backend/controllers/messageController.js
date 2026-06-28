import Message from "../models/Message.js";
import User from "../models/User.js";
import { throwError } from "../utils/errorHandler.js";
import { getIO, getOnlineUsers } from "../services/socketService.js";

export const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { receiverId } = req.params;

    if (!message || !message.trim()) {
      throwError("Message is required", 400);
    }

    const receiver = await User.findById(receiverId);

    if (!receiver) {
      throwError("Receiver not found", 404);
    }

    const newMessage = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      message: message.trim(),
    });
    const io = getIO();
    const onlineUsers = getOnlineUsers();

    const receiverSocketId = onlineUsers[receiverId];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { receiverId } = req.params;

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      throwError("No user found", 404);
    }
    const messages = await Message.find({
      $or: [
        {
          sender: req.user._id,
          receiver: receiverId,
        },
        {
          sender: receiverId,
          receiver: req.user._id,
        },
      ],
    })
      .populate("sender receiver", "name")
      .sort({ createdAt: 1 });
    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    next(error);
  }
};

export const messageSeen = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.messageId);
    if (!message) {
      throwError("No message found", 404);
    }
    if (message.receiver.toString() !== req.user._id.toString()) {
      throwError("unauthorized user", 403);
    }
    if (message.isSeen) {
      throwError("Message already seen", 400);
    }
    message.isSeen = true;
    await message.save();
    res.status(200).json({
      success: true,
      message: "Message marked as seen",
      data: message,
    });
  } catch (error) {
    next(error);
  }
};
