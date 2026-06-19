import { throwError } from "../utils/errorHandler.js";
export const adminOnly = (req, res, next) => {
  try {
    if (!req.user) {
      throwError("access denied", 401);
    }
    if (req.user.role !== "admin") {
      throwError("Only admin can access", 403);
    }
    next();
  } catch (error) {
    next(error);
  }
};
