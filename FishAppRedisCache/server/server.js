import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
const port = process.env.PORT || 3002;

import { notFound } from "./middleware/notFound.js";

import { redisConnect } from "./database/Redis.database.js";
await redisConnect();
import fishRouter from "./routes/fish.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(fishRouter);
app.use(notFound);

app.listen(port, (error) => {
  error
    ? console.log("error", error)
    : console.log(`listening port ${process.env.PORT}`);
});
