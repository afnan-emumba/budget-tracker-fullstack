import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log("Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
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
    return res.status(400).json({
      success: false,
      message: "Missing fields",
    });
  }

  try {
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const newUser = new User(user);
    await newUser.save();

    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.log("Error in user creation:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: true,
      message: "User not found",
    });
  }

  try {
    await User.findByIdAndUpdate(id, user, { new: true });
    res.status(200).json({
      success: true,
      message: "User Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  try {
    await User.findByIdAndRemove(id);
    res.status(200).json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
