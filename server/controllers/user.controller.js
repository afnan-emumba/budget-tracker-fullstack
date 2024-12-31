import mongoose from "mongoose";
import User from "../models/user.model.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return successResponse(res, 200, users);
  } catch (error) {
    return errorResponse(res, 500, "Server error");
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return errorResponse(res, 404, "User not found");
  }

  try {
    const user = await User.findById(id);
    return successResponse(res, 200, user);
  } catch (error) {
    return errorResponse(res, 500, "Server error");
  }
};

export const createUser = async (req, res) => {
  const user = req.body;

  if (
    !user.email ||
    !user.password ||
    !user.firstName ||
    !user.lastName ||
    !user.budgetLimit
  ) {
    return errorResponse(res, 400, "Missing fields");
  }

  try {
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return errorResponse(res, 400, "Email already exists");
    }

    const newUser = new User(user);
    await newUser.save();
    return successResponse(res, 201, newUser);
  } catch (error) {
    return errorResponse(res, 500, "Server error");
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return errorResponse(res, 404, "User not found");
  }

  try {
    await User.findByIdAndUpdate(id, user, { new: true });
    return successResponse(res, 200, null);
  } catch (error) {
    return errorResponse(res, 500, "Server error");
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return errorResponse(res, 404, "User not found");
  }

  try {
    await User.findByIdAndRemove(id);
    return successResponse(res, 200, null);
  } catch (error) {
    return errorResponse(res, 500, "Server error");
  }
};
