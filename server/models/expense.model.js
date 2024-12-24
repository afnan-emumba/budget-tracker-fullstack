import mongoose from "mongoose";

const expenseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
