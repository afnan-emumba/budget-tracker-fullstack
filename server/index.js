import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import expenseRoutes from "./routes/expense.route.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://budget-tracker-frontend-rho.vercel.app"
  ); // Replace with your frontend URL
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  ); // Allow specific HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow specific headers
  res.setHeader("Access-Control-Allow-Credentials", "true"); // If using cookies or authentication
  next();
});

app.use(cors());

dotenv.config();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, world" });
});
app.use("/expenses", expenseRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB()
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database connection error:", err));
  console.log("Server started at:", PORT);
});
