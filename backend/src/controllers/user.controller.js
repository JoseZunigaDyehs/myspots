import { User } from "../models/index.js";
import bcrypt from "bcrypt";

export const getUsers = async (_, res, next) => {
  try {
    const users = await User.find().populate("roles", { name: 1 });
    return res.send(users);
  } catch (error) {
    next(error);
  }
};

export const addUser = async (req, res, next) => {
  try {
    const { username, name, email, password, roles } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, name, email, passwordHash, roles });
    const result = await newUser.save();
    return res.send(result);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    return res.send(user);
  } catch (error) {
    next(error);
  }
};

export const removeUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userRemoved = await User.findByIdAndRemove(id);
    if (!userRemoved) {
      return res.sendStatus(404);
    }
    return res.send("Se ha eliminado");
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.sendStatus(404);
    }
    return res.send(`User ${post}`);
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.sendStatus(404);
    }
    return res.json(user);
  } catch (error) {
    next(error);
  }
};
