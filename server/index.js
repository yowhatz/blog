import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/authRoute.js";
import articleRoute from "./routes/articleRoute.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;
const URL = process.env.MONGODB_URl;

app.use("/api", authRoute);
app.use("/api", articleRoute);

mongoose
  .connect(URL)
  .then(() => console.log("Successful connection to the Database..."))
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}...`);
});
