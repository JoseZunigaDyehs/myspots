import { Post } from "../models/index.js";
import { removeImage, uploadImage } from "../utils/cloudinary.js";
import fs from "fs-extra";

export const getPosts = async (_, res, next) => {
  try {
    const posts = await Post.find();
    return res.send(posts);
  } catch (error) {
    next(error);
  }
};

export const addPost = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    let image = "";
    if (req.files?.image) {
      const {
        image: { tempFilePath },
      } = req.files;
      const imageResult = await uploadImage(tempFilePath);
      await fs.remove(tempFilePath);
      image = {
        url: imageResult.secure_url,
        public_id: imageResult.public_id,
      };
    }
    const newPost = new Post({ title, description, image });
    const result = await newPost.save();
    return res.send(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    return res.send(post);
  } catch (error) {
    next(error);
  }
};

export const removePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const postRemoved = await Post.findByIdAndRemove(id);
    if (!postRemoved) {
      return res.sendStatus(404);
    }
    if (postRemoved.image) {
      await removeImage(postRemoved.image.public_id);
    }
    return res.send("Se ha eliminado");
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.sendStatus(404);
    }
    return res.send(`Post ${post}`);
  } catch (error) {
    next(error);
  }
};
