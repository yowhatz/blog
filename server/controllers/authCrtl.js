import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });

    if (user)
      return res
        .status(401)
        .json({ message: "Этот пользователь уже в системе" });

    if (password.length < 6)
      return res.status(401).json({ message: "Недостаточная длина пароля" });

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await userModel.create({
      ...req.body,
      password: hashPassword,
    });

    res.json({
      message: "Успешная регистрация",
      newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });

    if (!user)
      return res
        .status(401)
        .json({ message: "Такого пользователя не существует" });

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) return res.status(401).json({ message: "Пароль неверный" });

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
      expiresIn: "1w",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api/refreshToken",
    });

    res.status(200).json({
      message: "Успешный вход",
      user: {
        ...user._doc,
        password: "",
      },
      accessToken,
    });
  } catch (error) {
    console.log(error);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const rfToken = req.cookies.refreshToken;

    if (!rfToken)
      return res.status(400).json({ message: "Пожалуйста войдите" });

    jwt.verify(rfToken, process.env.REFRESH_TOKEN, async (error, result) => {
      if (error) return res.status(400).json({ message: "Пожалуйста войдите" });

      const user = await userModel.findById({ _id: result.id });

      if (!user)
        return res.status(400).json({ message: "Пользователь не найден" });

      const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
        expiresIn: "1d",
      });

      res.status(200).json({ message: "Успешный вход", user, accessToken });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("refreshToken", { path: "/api/refreshToken" });
  res.json({ message: "Успешный выход" });
};

export const updateUser = async (req, res) => {
  try {
    await userModel.findByIdAndUpdate({ _id: req.user._id }, { ...req.body });

    res.json({
      message: "Статья успешно обновленна",
    });
  } catch (error) {
    console.log(error);
  }
};
