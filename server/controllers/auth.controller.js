import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10d" });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return successResponse(res, 200, {
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      return errorResponse(res, 401, "Invalid email or password");
    }
  } catch (error) {
    return errorResponse(res, 500, "Server error");
  }
};

export const logoutUser = async (req, res) => {
  try {
    return successResponse(res, 200, null);
  } catch (error) {
    return errorResponse(res, 500, "Server error");
  }
};
