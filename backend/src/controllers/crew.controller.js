import { Crew, User } from "../models/index.js";

export const getCrews = async (_, res, next) => {
  try {
    const crews = await Crew.find({})
      .populate("users", {
        username: 1,
      })
      .lean();
    const nextCrews = crews.map(({ admins, users, _id, name, description }) => {
      return {
        id: _id,
        name,
        description,
        users: users.map(({ _id: userId, username }) => {
          return {
            id: userId,
            username,
            isAdmin:
              admins.filter((adminId) => adminId.equals(userId)).length > 0,
          };
        }),
      };
    });
    return res.send(nextCrews);
  } catch (error) {
    next(error);
  }
};

export const addCrew = async (req, res, next) => {
  try {
    const { description, name, users, admins } = req.body;
    const crew = new Crew({ description, name, users, admins });
    const savedCrew = await crew.save();
    await User.updateMany(
      { _id: { $in: users } },
      {
        $push: { crews: crew._id },
      },
      { multi: true }
    );
    return res.send(savedCrew);
  } catch (error) {
    next(error);
  }
};

export const updateCrew = async (req, res, next) => {
  try {
    console.log("first");
    const { id } = req.params;
    const { description, name, users, admins } = req.body;
    //TODO: Revisar si los usuarios existen
    const oldCrew = await Crew.findById(id);
    await User.updateMany(
      { _id: { $in: oldCrew.users } },
      {
        $pull: { crews: id },
      },
      { multi: true }
    );
    const crew = await Crew.findByIdAndUpdate(
      id,
      { description, name, users, admins },
      { new: true }
    );
    await User.updateMany(
      { _id: { $in: users } },
      {
        $push: { crews: crew._id },
      },
      { multi: true }
    );
    return res.send(crew);
  } catch (error) {
    next(error);
  }
};

export const removeCrew = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldCrew = await Crew.findById(id);
    await User.updateMany(
      { _id: { $in: oldCrew.users } },
      {
        $pull: { crews: id },
      },
      { multi: true }
    );
    const crewRemoved = await Crew.findByIdAndRemove(id);
    if (!crewRemoved) {
      return res.sendStatus(404);
    }
    return res.send("Se ha eliminado");
  } catch (error) {
    next(error);
  }
};

export const getCrewById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const crew = await Crew.findById(id);
    if (!crew) {
      return res.sendStatus(404);
    }
    return res.send(`Crew ${post}`);
  } catch (error) {
    next(error);
  }
};
