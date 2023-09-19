import express from "express";
import {
  createArticle,
  getArticle,
  getArticles,
  likeArticle,
  unlikeArticle,
} from "../controllers/articleCtrl.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/create", isAuth, createArticle);

router.get("/getArticles", isAuth, getArticles);
router.get("/article/:id", isAuth, getArticle);

router.patch("/article/:id/like", isAuth, likeArticle);
router.patch("/article/:id/unlike", isAuth, unlikeArticle);

export default router;
