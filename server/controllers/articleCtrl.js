import articleModel from "../models/articleModel.js";

export const createArticle = async (req, res) => {
  try {
    const { title } = req.body;

    const newArticle = await articleModel.create({
      ...req.body,
      user: req.user._id,
      title: title.toLowerCase(),
    });

    res.json({
      message: "Пост успешно добавлен",
      newArticle,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await articleModel.find();

    res.json({
      articles: articles,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getArticle = async (req, res) => {
  try {
    const article = await articleModel
      .findByIdAndUpdate({ _id: req.params.id }, { $inc: { views: 1 } })
      .populate("user", "username avatar");

    const articles = await articleModel.find({ category: article.category });

    res.json({ article, articles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likeArticle = async (req, res) => {
  try {
    await articleModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $push: { likes: req.user.id },
      },

      res.json({ message: "Статья успешно лайкнута" }),
    );
  } catch (error) {
    console.log(error);
  }
};

export const unlikeArticle = async (req, res) => {
  try {
    await articleModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $pull: { likes: req.user.id },
      },

      res.json({ message: "Статья успешно дизлайкнута" }),
    );
  } catch (error) {
    console.log(error);
  }
};
