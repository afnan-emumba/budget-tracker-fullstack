import express from "express";
import { loginUser, logoutUser } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.js";
import { loginSchema } from "../middleware/validationSchema.js";

const router = express.Router();

router.post("/login", validate(loginSchema), loginUser);
router.get("/logout", logoutUser);

export default router;
