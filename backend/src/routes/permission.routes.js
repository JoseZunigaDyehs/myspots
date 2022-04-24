import { Router } from "express";
import {
  addPermission,
  getPermissions,
  getPermissionById,
  removePermission,
  updatePermission,
} from "../controllers/index.js";

const router = Router();
console.log("asdasdasdkjhdsaih asidh ");
router.get("/permissions", getPermissions);
router.post("/permission", addPermission);
router.put("/permissions/:id", updatePermission);
router.delete("/permissions/:id", removePermission);
router.get("/permissions/:id", getPermissionById);

export default router;
