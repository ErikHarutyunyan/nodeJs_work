import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import morgan from "morgan";

// DB Configuration
import dbConnect from "./config/db.config.js";
// Routes
import authRouter from "./routes/auth.routes.js";

// const Role = db.role;

config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
dbConnect();
// routes
app.use("/api/v1", authRouter);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
