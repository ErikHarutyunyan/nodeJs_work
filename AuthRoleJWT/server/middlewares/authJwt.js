// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
// const config = require("../config/auth.config.js");
// const db = require("../models/index.js");
// const User = db.user;
// const Role = db.role;
import * as dotenv from "dotenv";
dotenv.config();


const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header not found" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      error: true,
      message: "Token not found in authorization header",
    });
  }

  try {
    const privateKey = process.env.REFRESH_SECRET_KEY;
    let tokenDetails = jwt.verify(token, privateKey);
    req.tokenDetails = tokenDetails;
    req.refreshToken = token;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: true, message: "Invalid refresh token" });
  }
};

const isAdmin = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      Role.find({ _id: { $in: user.roles } }).then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Admin Role!" });
        return;
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
      return;
    });
};

const isModerator = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      Role.find({ _id: { $in: user.roles } }).then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
      return;
    });
};

export const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};
