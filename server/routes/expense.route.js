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
import {
  createExpenseSchema,
  updateExpenseSchema,
} from "../middleware/validationSchema.js";

const router = express.Router();

router.get("/", getExpenses);
router.get("/:id", getExpense);
router.get("/user/:userID", getUserExpenses);
router.post("/", validate(createExpenseSchema), createExpense);
router.put("/:id", validate(updateExpenseSchema), updateExpense);
router.delete("/:id", deleteExpense);

export default router;
