import { Router } from "express";
import bcrypt from "bcryptjs";
import User from './../models/user.model';
import generateTokens from './../utils/generateToken.utils';

const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const router = Router();
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
