import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { throwError } from "../utils/errorHandler.js";
import { uploadToCloudinary } from "../utils/cloudinaryHandler.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throwError("All fields are required", 400);
    }

    const existingUser = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingUser) {
      throwError("User already exists", 400);
    }

    let imageUrl = "";
    let publicId = "";

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);

      imageUrl = result.secure_url;
      publicId = result.public_id;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      imageUrl,
      publicId,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throwError("Email and password are required", 400);
    }
    const user = await User.findOne({ email });
    if (!user) {
      throwError("No user found", 400);
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throwError("Invalid Password", 400);
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const getProfile = (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};

export const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      throwError("No token found", 403);
    }
    let decode;
    try {
      decode = JWT.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      throwError("Invalid Token", 403);
    }
    const user = await User.findById(decode.id).select("-password");
    if (!user) {
      throwError("No user found", 404);
    }
    const newAccessToken = JWT.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" },
    );
    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({
    success: true,
    message: "Successfully logout",
  });
};
