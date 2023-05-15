import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      enum: ["user", "admin", "super_admin"],
      default: ["user"],
      ref: "Role",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;