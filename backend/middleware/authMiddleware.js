import JWT from "jsonwebtoken";
import User from "../models/User.js";
import { throwError } from "../utils/errorHandler.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throwError("Unauthorized", 401);
    }

    let decoded;

    try {
      decoded = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      throwError("Invalid or expired token", 401);
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throwError("User not found", 404);
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
