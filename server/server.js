import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import expenseRoutes from "./routes/expense.route.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, world" });
});
app.use("/expenses", expenseRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at:", PORT);
});
