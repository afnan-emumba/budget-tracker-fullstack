import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import expenseRoutes from "./routes/expense.route.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

// app.use(cors());

const corsOptions = {
  origin: ["https://budget-tracker-frontend-rho.vercel.app"], // Allow your frontend origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // If using cookies/auth headers
};

app.use(cors(corsOptions));

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
