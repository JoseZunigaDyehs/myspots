import { Crew, User } from "../models/index.js";

export const getCrews = async (_, res) => {
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
    return res.status(500).json({ message: error.message });
  }
};

export const addCrew = async (req, res) => {
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
    return res.status(500).json({ message: error.message });
  }
};

export const updateCrew = async (req, res) => {
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
    return res.status(500).json({ message: error.message });
  }
};

export const removeCrew = async (req, res) => {
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
    return res.status(500).json({ message: error.message });
  }
};

export const getCrewById = async (req, res) => {
  try {
    const { id } = req.params;
    const crew = await Crew.findById(id);
    if (!crew) {
      return res.sendStatus(404);
    }
    return res.send(`Crew ${post}`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
