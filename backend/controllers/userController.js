import User from "../models/User.js";
import { throwError } from "../utils/errorHandler.js";
import { uploadToCloudinary } from "../utils/cloudinaryHandler.js";
import cloudinary from "../config/cloudinaryConfig.js";
export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user._id },
      role: "user",
    }).select("-password");
    if (users.length === 0) {
      throwError("No user found", 404);
    }
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};
export const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      throwError("No user found", 404);
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
export const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    // Check duplicate email
    if (email) {
      const existingUser = await User.findOne({
        email: email.trim().toLowerCase(),
        _id: { $ne: req.user._id },
      });

      if (existingUser) {
        throwError("Email already exists", 400);
      }
    }

    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      throwError("User not found", 404);
    }

    // Update text fields only if provided
    if (name) {
      user.name = name.trim();
    }

    if (email) {
      user.email = email.trim().toLowerCase();
    }

    // Update profile image
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);

      // Delete old image if it exists
      if (user.publicId) {
        await cloudinary.uploader.destroy(user.publicId);
      }

      user.imageUrl = result.secure_url;
      user.publicId = result.public_id;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
        role: user.role,
        isBanned: user.isBanned,
        status: user.status,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const banUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      throwError("No user found", 404);
    }
    if (req.user._id.toString() === req.params.id) {
      throwError("You cannot ban yourself", 400);
    }
    if (user.isBanned) {
      throwError("User is already banned", 400);
    }
    user.isBanned = true;
    await user.save();
    res.status(200).json({
      success: true,
      message: "User banned successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};
export const unbanUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      throwError("No user found", 404);
    }
    if (!user.isBanned) {
      throwError("User is not banned", 400);
    }
    user.isBanned = false;
    await user.save();
    res.status(200).json({
      success: true,
      message: "User unbanned successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};
