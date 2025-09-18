import { config } from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mainRoute from "./routes/main.route.js";
import authRoute from "./routes/auth.route.js";
import projectRoute from "./routes/project.route.js";
import { connectToMongoDB } from "./utils/db.utils.js";

config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", mainRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/projects", projectRoute);

app.use((req, res, next) =>
  next({
    status: 404,
    message: "Endpoint not found ❌",
  }),
);
app.use((error, req, res, next) => {
  const { status = 500, message = "An error occurred whilst processing your request ❌" } = error;
  res.status(status).json({ status, message, ...error });
});

connectToMongoDB(() => {
  const port = process.env.PORT || 1234;
  app.listen(port, () => console.log(`[Taskman]: Server listening on port ${port}... ✅`));
});
