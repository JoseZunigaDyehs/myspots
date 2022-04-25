import { Role } from "../models/index.js";

export const getRoles = async (_, res, next) => {
  try {
    const roles = await Role.find().populate("permissions", { name: 1 });
    return res.json(roles);
  } catch (error) {
    next(error);
  }
};

export const addRole = async (req, res, next) => {
  try {
    const { name, permissions } = req.body;
    const role = new Role({ name, permissions });
    const savedRoles = await role.save();
    return res.send(savedRoles);
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (req, res, next) => {
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
    next(error);
  }
};

export const removeRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedRole = await Role.findByIdAndRemove(id);
    if (!removedRole) {
      return res.sendStatus(404);
    }
    return res.send("Se ha eliminado");
  } catch (error) {
    next(error);
  }
};

export const getRoleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const role = await Role.findById(id);
    if (!role) {
      return res.sendStatus(404);
    }
    return res.send(`Role ${role}`);
  } catch (error) {
    next(error);
  }
};
