import { Router } from "express";
import {
  addCrew,
  getCrews,
  getCrewById,
  removeCrew,
  updateCrew,
} from "../controllers/index.js";

const router = Router();

router.get("/crews", getCrews);
router.post("/crew", addCrew);
router.put("/crews/:id", updateCrew);
router.delete("/crews/:id", removeCrew);
router.get("/crews/:id", getCrewById);

export default router;
