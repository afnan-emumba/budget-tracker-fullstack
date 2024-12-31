import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
} from "../controllers/user.controller.js";
import { validate } from "../middleware/validate.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../middleware/validationSchema.js";

const router = express.Router();

router
  .get("/", getUsers)
  .get("/:id", getUser)
  .post("/", validate(createUserSchema), createUser)
  .put("/:id", validate(updateUserSchema), updateUser);

export default router;
