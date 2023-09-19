import express from "express";
import {
  login,
  logout,
  refreshToken,
  register,
  updateUser,
} from "../controllers/authCrtl.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/refreshToken", refreshToken);
router.get("/logout", logout);
router.patch("/updateUser", isAuth, updateUser);

export default router;
