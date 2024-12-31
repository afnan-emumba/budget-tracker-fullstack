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

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", validate(createUserSchema), createUser);
router.put("/:id", validate(updateUserSchema), updateUser);

export default router;
