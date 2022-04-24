import { Router } from "express";
import {
  addPointState,
  getPointStates,
  removePointState,
  updatePointState,
} from "../controllers/index.js";

const router = Router();

router.get("/pointStates", getPointStates);
router.post("/pointState", addPointState);
router.put("/pointStates/:id", updatePointState);
router.delete("/pointStates/:id", removePointState);

export default router;
