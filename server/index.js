import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import expenseRoutes from "./routes/expense.route.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();
connectDB()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/expenses", expenseRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, world" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started at:", PORT);
});
