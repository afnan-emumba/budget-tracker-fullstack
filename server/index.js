import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import routes from "./routes/index.route.js";

dotenv.config();
connectDB()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started at:", PORT);
});
