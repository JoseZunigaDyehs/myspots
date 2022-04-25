import jwt from "jsonwebtoken";
import { SECRET } from "../config/config.js";

export const auth = (req, res, next) => {
  try {
    const authorization = req.get("authorization");
    let token = "";
    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
      token = authorization.substring(7);
    }
    if (!token) {
      return res.sendStatus(401).json({ message: "token missing or invalid" });
    }
    let decodedToken = {};
    decodedToken = jwt.verify(token, SECRET);
    if (!decodedToken.id) {
      return res.sendStatus(401).json({ message: "token missing or invalid" });
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
