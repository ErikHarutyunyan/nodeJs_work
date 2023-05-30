import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Role from "../models/role.model.js";
import User from "../models/user.model.js";
import generateTokens from "./../utils/generateToken.utils.js";
import UserToken from "../models/userToken.models.js";

const register = (req, res) => {
  console.log("process.env.SALT :", process.env.SALT);
  const salt = bcrypt.genSaltSync(parseInt(process.env.SALT));
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
  });
  user
    .save()
    .then((user) => {
      if (req.body.roles) {
        Role.find({ name: { $in: req.body.roles } }).then((roles) => {
          user.roles = roles.map((role) => role._id);
          user.save().then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        Role.findOne({ name: "user" }).then((role) => {
          user.roles = [role._id];
          user.save().then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err });
      return;
    });
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(401)
        .json({ error: true, message: "Invalid email or password" });

    const verifiedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!verifiedPassword)
      return res
        .status(401)
        .json({ error: true, message: "Invalid email or password" });

    const { accessToken, refreshToken } = await generateTokens(user);
    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({
      username: user.username,
      email: user.email,
      error: false,
      accessToken,
      refreshToken,
      message: "Logged in Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req;
    if (req.cookies) {
      res.clearCookie("refreshToken");
    }

    const userToken = await UserToken.findOne({ token: refreshToken });
    if (!userToken)
      return res
        .status(200)
        .json({ error: false, message: "Logged Out Successfully" });

    await userToken.deleteOne();
    res.status(200).json({ error: false, message: "Logged Out Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

const refresh = async (req, res) => {
  try {
    const { tokenDetails, refreshToken } = req;

    const userToken = await UserToken.findOne({ token: refreshToken });
    if (!userToken)
      return res.status(401).json({ error: true, message: "Invalid User" });

    const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
    const user = await User.findOne({ _id: tokenDetails._id });
    if (!user)
      return res.status(401).json({ error: true, message: "Invalid User" });

    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
      expiresIn: "5s",
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({
      error: false,
      username: user.username,
      email: user.email,
      refreshToken,
      accessToken,
      message: "Access token created successfully",
    });
  } catch (error) {
    console.log("error :", error);
    res.status(400).json(error);
  }
};

const authController = { register, login, refresh, logout };
export default authController;
