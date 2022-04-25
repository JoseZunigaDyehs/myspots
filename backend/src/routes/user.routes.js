import { Router } from "express";
import {
  addUser,
  getUsers,
  getUserById,
  removeUser,
  updateUser,
  me,
} from "../controllers/index.js";

const router = Router();
router.get("/users", getUsers);
router.post("/user", addUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", removeUser);
router.get("/users/:id", getUserById);
router.get("/me", me);

export default router;
