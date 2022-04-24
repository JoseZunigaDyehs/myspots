import { Router } from "express";
import {
  addPoint,
  getPoints,
  getPointById,
  removePoint,
  updatePoint,
} from "../controllers/index.js";

const router = Router();

router.get("/points", getPoints);
router.post("/point", addPoint);
router.put("/points/:id", updatePoint);
router.delete("/points/:id", removePoint);
router.get("/points/:id", getPointById);

export default router;
