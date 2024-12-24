import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);

export default router;
