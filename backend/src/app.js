import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import {
  postRoutes,
  userRoutes,
  pointRoutes,
  crewRoutes,
} from "./routes/index.js";

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
//Routes
app.use(postRoutes);
app.use(userRoutes);
app.use(pointRoutes);
app.use(crewRoutes);

app.use((error, req, res, next) => {
  res.status(400).end();
});

export default app;
