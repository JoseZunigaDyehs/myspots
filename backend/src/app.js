import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import { postRoutes } from "./routes/index.js";

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

export default app;
