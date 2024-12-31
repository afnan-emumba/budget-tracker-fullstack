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

router.get("/", getExpenses);
router.get("/:id", getExpense);
router.get("/user/:userID", getUserExpenses);
router.post("/", validate(expenseSchema), createExpense);
router.put("/:id", validate(expenseSchema), updateExpense);
router.delete("/:id", deleteExpense);

export default router;
