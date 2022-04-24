import { User } from "../models/index.js";
import bcrypt from "bcrypt";

export const getUsers = async (_, res) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addUser = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, name, email, passwordHash });
    const result = await newUser.save();
    return res.send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    return res.send(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userRemoved = await User.findByIdAndRemove(id);
    if (!userRemoved) {
      return res.sendStatus(404);
    }
    return res.send("Se ha eliminado");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.sendStatus(404);
    }
    return res.send(`User ${post}`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
