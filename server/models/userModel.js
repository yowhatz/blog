import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "",
    unique: true,
    required: true,
  },
  password: {
    type: String,
    default: "",
    required: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
  story: {
    type: String,
    default: "",
  },
});

export default mongoose.model("user", userSchema);
