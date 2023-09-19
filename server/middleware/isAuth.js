import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token)
      return res.status(400).json({ message: "Пожалуйста авторизируйтесь" });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

    if (!decoded)
      return res.status(400).json({ message: "Произошла странная ошибка" });

    const user = await userModel.findOne({ _id: decoded.id });

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
