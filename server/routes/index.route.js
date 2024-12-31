import express from "express";
import expenseRoutes from "./expense.route.js";
import userRoutes from "./user.route.js";
import authRoutes from "./auth.route.js";

const router = express.Router();

router.use("/expenses", expenseRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

export default router;
