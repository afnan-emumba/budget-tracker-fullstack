import mongoose from "mongoose";
import Expense from "../models/expense.model.js";

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({});
    res.status(200).json(expenses);
  } catch (error) {
    console.log("Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getExpense = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Expense not found",
    });
  }

  try {
    const expense = await Expense.findById(id);
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const createExpense = async (req, res) => {
  const expense = req.body;

  if (!expense.title || !expense.price || !expense.date || !expense.userID) {
    return res.status(400).json({
      success: false,
      message: "Missing fields",
    });
  }

  const newExpense = new Expense(expense);

  try {
    await newExpense.save();

    res.status(201).json({
      success: true,
      data: newExpense,
    });
  } catch (error) {
    console.log("Error in expense creation:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updateExpense = async (req, res) => {
  const { id } = req.params;

  const expense = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: true,
      message: "Expense not found",
    });
  }

  try {
    await Expense.findByIdAndUpdate(id, expense, { new: true });
    res.status(200).json({
      success: true,
      message: "Expense Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: true,
      message: "Expense not found",
    });
  }

  try {
    await Expense.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Expense Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
