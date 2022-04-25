import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import {
  postRoutes,
  userRoutes,
  pointRoutes,
  crewRoutes,
  permissionRoutes,
  roleRoutes,
  pointStateRoutes,
  loginRoutes,
} from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { auth } from "./middlewares/auth.js";

const app = express();
//Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);
//Routes\
app.use(loginRoutes);
app.use(auth);
app.use(postRoutes);
app.use(userRoutes);
app.use(pointRoutes);
app.use(crewRoutes);
app.use(permissionRoutes);
app.use(roleRoutes);
app.use(pointStateRoutes);

app.use(errorHandler);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(400).end();
});

export default app;
