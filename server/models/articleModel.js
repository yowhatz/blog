import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  views: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

export default mongoose.model("article", articleSchema);
