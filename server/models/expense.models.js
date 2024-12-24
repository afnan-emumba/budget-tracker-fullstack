import mongoose from "mongoose";

const expenseSchema = mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
