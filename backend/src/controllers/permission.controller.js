import { Permission } from "../models/index.js";

export const getPermissions = async (_, res) => {
  try {
    const permission = await Permission.find();
    return res.json(permission);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addPermission = async (req, res) => {
  try {
    console.log("asdasdasd");
    const { name } = req.body;
    const permission = new Permission({ name });
    const savedPermission = await permission.save();
    return res.send(savedPermission);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const permission = await Permission.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    return res.send(permission);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const removedPermission = await Permission.findByIdAndRemove(id);
    if (!removedPermission) {
      return res.sendStatus(404);
    }
    return res.send("Se ha eliminado");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPermissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findById(id);
    if (!permission) {
      return res.sendStatus(404);
    }
    return res.send(`Permission ${permission}`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
