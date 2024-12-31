import express from "express";
import {
  getExpenses,
  getExpense,
  getUserExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expense.controller.js";
import { validate } from "../middleware/validate.js";
import { expenseSchema } from "../middleware/validationSchema.js";

const router = express.Router();

router
  .get("/", getExpenses)
  .get("/:id", getExpense)
  .get("/user/:userID", getUserExpenses)
  .post("/", validate(expenseSchema), createExpense)
  .put("/:id", validate(expenseSchema), updateExpense)
  .delete("/:id", deleteExpense);

export default router;
