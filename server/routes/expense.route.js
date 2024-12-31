import express from "express";
import {
  getExpenses,
  getExpense,
  getUserExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expense.controller.js";

const router = express.Router();

router.get("/", getExpenses);
router.get("/:id", getExpense);
router.get("/user/:userID", getUserExpenses);
router.post("/", createExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
