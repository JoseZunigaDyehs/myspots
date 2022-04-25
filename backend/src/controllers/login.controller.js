import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import jwt from "jsonwebtoken";
import { SECRET, EXPIRES_TOKEN } from "../config/config.js";

export const login = async (req, res, next) => {
  try {
    //RECIBIR BUSCAR EN USERS
    const { user, password } = req.body;
    const searchedUser = await User.findOne().or([
      { username: user },
      { email: user },
    ]);
    const correctPassword =
      searchedUser === null
        ? false
        : await bcrypt.compare(password, searchedUser.passwordHash);
    if (!correctPassword) {
      return res
        .status(401)
        .json({ error: "Invalid email/username or password" });
    }

    const userForToken = {
      id: searchedUser._id,
      username: searchedUser.username,
    };

    const token = jwt.sign(userForToken, SECRET, { expiresIn: EXPIRES_TOKEN });

    res.send({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};
