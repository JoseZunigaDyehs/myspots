import { Post } from "../models/index.js";
import { removeImage, uploadImage } from "../utils/cloudinary.js";
import fs from "fs-extra";

export const getPosts = async (_, res) => {
  try {
    const posts = await Post.find();
    return res.send(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addPost = async (req, res) => {
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
    return res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    return res.send(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removePost = async (req, res) => {
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
    return res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.sendStatus(404);
    }
    return res.send(`Post ${post}`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
