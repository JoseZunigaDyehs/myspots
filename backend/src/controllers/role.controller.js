import { Role } from "../models/index.js";

export const getRoles = async (_, res) => {
  try {
    const roles = await Role.find().populate("permissions", { name: 1 });
    return res.json(roles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const role = new Role({ name, permissions });
    const savedRoles = await role.save();
    return res.send(savedRoles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, permissions } = req.body;
    const role = await Role.findByIdAndUpdate(
      id,
      { name, permissions },
      { new: true }
    );
    return res.send(role);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeRole = async (req, res) => {
  try {
    const { id } = req.params;
    const removedRole = await Role.findByIdAndRemove(id);
    if (!removedRole) {
      return res.sendStatus(404);
    }
    return res.send("Se ha eliminado");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findById(id);
    if (!role) {
      return res.sendStatus(404);
    }
    return res.send(`Role ${role}`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
