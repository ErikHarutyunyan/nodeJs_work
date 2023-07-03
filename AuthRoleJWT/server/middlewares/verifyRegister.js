import User from "../models/user.model.js";
import ROLES from "./../config/role.config.js";

const checkUsernameOrEmail = async (req, res, next) => {
  // Username or Email is already
  try {
    const duplicateUsername = await User.findOne({
      username: req.body.username,
    });
    const duplicateEmail = await User.findOne({ email: req.body.email });

    if (duplicateUsername || duplicateEmail) {
      const name = !duplicateUsername
        ? "Username"
        : !duplicateEmail
        ? "Email"
        : null;
      return res
        .status(400)
        .json({ message: `Failed! ${name} is already in use!` });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: err });
    return;
  }
};

const checkRoles = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        console.log("@222");
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }
  next();
};

export { checkUsernameOrEmail, checkRoles };
