import { Router } from "express";
import {
  addRole,
  getRoles,
  getRoleById,
  removeRole,
  updateRole,
} from "../controllers/index.js";

const router = Router();

router.get("/roles", getRoles);
router.post("/role", addRole);
router.put("/roles/:id", updateRole);
router.delete("/roles/:id", removeRole);
router.get("/roles/:id", getRoleById);

export default router;
