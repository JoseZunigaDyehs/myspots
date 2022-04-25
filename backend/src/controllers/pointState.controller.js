import { PointState } from "../models/index.js";

export const getPointStates = async (_, res, next) => {
  try {
    const pointState = await PointState.find();
    return res.json(pointState);
  } catch (error) {
    next(error);
  }
};

export const addPointState = async (req, res, next) => {
  try {
    const { name } = req.body;
    const pointState = new PointState({ name });
    const savedPointState = await pointState.save();
    return res.send(savedPointState);
  } catch (error) {
    next(error);
  }
};

export const updatePointState = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const pointState = await PointState.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    return res.send(pointState);
  } catch (error) {
    next(error);
  }
};

export const removePointState = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedPointState = await PointState.findByIdAndRemove(id);
    if (!removedPointState) {
      return res.sendStatus(404);
    }
    return res.send("Se ha eliminado");
  } catch (error) {
    next(error);
  }
};
