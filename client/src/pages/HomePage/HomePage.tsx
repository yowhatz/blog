import React, { useEffect } from "react";

import cls from "./HomePage.module.scss";
import { ArticleCard, Text } from "src/components";
import { useAppDispatch } from "src/redux/store";
import { getArticles } from "src/redux/actions/articleAction";
import { useSelector } from "react-redux";
import { getArticlesData } from "src/redux/selectors/article/getArticlesData";
import { getArticleFirstLoad } from "src/redux/selectors/article/getArticleFirstLoad";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticlesData);
  const firstLoad = useSelector(getArticleFirstLoad);

  useEffect(() => {
    if (!firstLoad) {
      dispatch(getArticles());
    }
  }, []);

  return (
    <div className={cls.home_page}>
      <Text as={"h1"} fs={24} fw={700}>
        Необычный блог
      </Text>

      <div className={cls.home_items}>
        {articles.length > 0
          ? articles.map((article) => (
              <ArticleCard
                title={article.title}
                createdAt={article.createdAt}
                description={article.description}
                id={article._id}
                key={article._id}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default HomePage;
