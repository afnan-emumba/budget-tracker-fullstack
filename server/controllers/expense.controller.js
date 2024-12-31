import mongoose from "mongoose";
import Expense from "../models/expense.model.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({});
    return successResponse(res, 200, expenses);
  } catch (error) {
    return errorResponse(res, 500, "Server error");
  }
};

export const getExpense = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return errorResponse(res, 404, "Expense not found");
  }

  try {
    const expense = await Expense.findById(id);
    return successResponse(res, 200, expense);
  } catch (error) {
    return errorResponse(res, 500, "Server error");
  }
};

export const getUserExpenses = async (req, res) => {
  const { userID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return errorResponse(res, 404, "User not found");
  }

  try {
    const expenses = await Expense.find({ userID });
    return successResponse(res, 200, expenses);
  } catch (error) {
    return errorResponse(res, 500, "Server error");
  }
};

export const createExpense = async (req, res) => {
  const expense = req.body;

  if (!expense.title || !expense.price || !expense.date || !expense.userID) {
    return errorResponse(res, 400, "Missing fields");
  }

  const newExpense = new Expense(expense);

  try {
    await newExpense.save();
    return successResponse(res, 201, newExpense);
  } catch (error) {
    return errorResponse(res, 500, "Server error");
  }
};

export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const expense = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return errorResponse(res, 404, "Expense not found");
  }

  try {
    const newExp = await Expense.findByIdAndUpdate(id, expense, { new: true });
    return successResponse(res, 200, newExp);
  } catch (error) {
    return errorResponse(res, 500, "Server error");
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return errorResponse(res, 404, "Expense not found");
  }

  try {
    await Expense.findByIdAndDelete(id);
    return successResponse(res, 200, null);
  } catch (error) {
    return errorResponse(res, 500, "Server error");
  }
};
