import { POINT_STATE } from "../enums/pointMarker.js";
import { Point, User } from "../models/index.js";

export const getPoints = async (_, res, next) => {
  try {
    const points = await Point.find().populate(["usersShared", "state"]);
    return res.json(points);
  } catch (error) {
    next(error);
  }
};

export const addPoint = async (req, res, next) => {
  try {
    const {
      latitude,
      longitude,
      title,
      description,
      isPublic = true,
      state,
      usersShared = [],
      createdBy,
    } = req.body;
    const point = new Point({
      latitude,
      longitude,
      title,
      description,
      isPublic,
      state,
      createdBy,
      usersShared: isPublic ? [] : usersShared,
    });
    const savedPoint = await point.save();
    await User.updateMany(
      { _id: { $in: savedPoint.usersShared } },
      {
        $push: { points: point._id },
      },
      { multi: true }
    );
    return res.send(savedPoint);
  } catch (error) {
    next(error);
  }
};

export const updatePoint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      latitude,
      longitude,
      title,
      description,
      isPublic = true,
      state,
      createdBy,
      usersShared = [],
    } = req.body;
    const oldPoint = await Point.findById(id);
    await User.updateMany(
      { _id: { $in: oldPoint.usersShared } },
      {
        $pull: { points: id },
      },
      { multi: true }
    );
    const savedPoint = await Point.findByIdAndUpdate(
      id,
      {
        latitude,
        longitude,
        title,
        description,
        isPublic,
        state,
        createdBy,
        usersShared: isPublic ? [] : usersShared,
      },
      { new: true }
    );
    await User.updateMany(
      { _id: { $in: savedPoint.usersShared } },
      {
        $push: { points: id },
      },
      { multi: true }
    );
    return res.send(point);
  } catch (error) {
    next(error);
  }
};

export const removePoint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldPoint = await Point.findById(id);
    await User.findByIdAndUpdate(oldPoint.usersShared, {
      $pull: { points: id },
    });
    const removedPoint = await Point.findByIdAndRemove(id);
    if (!removedPoint) {
      return res.sendStatus(404);
    }
    return res.send("Se ha eliminado");
  } catch (error) {
    next(error);
  }
};

export const getPointById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const point = await Point.findById(id);
    if (!point) {
      return res.sendStatus(404);
    }
    return res.send(`Point ${post}`);
  } catch (error) {
    next(error);
  }
};
