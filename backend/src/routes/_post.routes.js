import { Router } from "express";
import {
  addPost,
  getPosts,
  getPostById,
  removePost,
  updatePost,
} from "../controllers/index.js";

const router = Router();

router.get("/posts", getPosts);
router.post("/post", addPost);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", removePost);
router.get("/posts/:id", getPostById);

export default router;
