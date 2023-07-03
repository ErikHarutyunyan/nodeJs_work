import { Router } from "express";
// import bcrypt from "bcryptjs";
// import User from './../models/user.model';
// import generateTokens from './../utils/generateToken.utils';

// const { verifySignUp } = require("../middlewares");
// const controller = require("../controllers/auth.controller");

// Middleware Validation & Verify
import { validationLogin, validationRegister } from "../utils/validation.js";
import {
  checkRoles,
  checkUsernameOrEmail,
} from "../middlewares/verifyRegister.js";
import authController from "../controllers/auth.controller.js";
import { authJwt } from "../middlewares/authJwt.js";

const authRouter = Router();

authRouter.post(
  "/register",
  [validationRegister, checkUsernameOrEmail, checkRoles],
  authController.register
);
authRouter.post("/login", [validationLogin], authController.login);

authRouter.post("/refreshToken", authJwt.verifyToken, authController.refresh);
authRouter.delete("/logout", authJwt.verifyToken, authController.logout);

export default authRouter;
