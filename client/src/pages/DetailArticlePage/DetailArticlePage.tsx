import React, { useEffect, useState } from "react";

import cls from "./DetailArticlePage.module.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "src/redux/store";
import { getArticle } from "src/redux/actions/articleAction";
import { useSelector } from "react-redux";
import { getArticleDetail } from "src/redux/selectors/article/getArticleDetail";
import { Article } from "src/redux/types/articleTypes";
import { ArticleCard, Avatar, FavoriteBtn, Text } from "src/components";
import { eyesImg, likeImg } from "src/assets";
import { getArticleSimilars } from "src/redux/selectors/article/getArticleSimilars";

const DetailArticlePage = () => {
  const [article, setArticle] = useState<Article[]>([]);
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const articlesDetail = useSelector(getArticleDetail);
  const similars = useSelector(getArticleSimilars);
  useEffect(() => {
    if (id) {
      dispatch(getArticle(id, articlesDetail));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const newData = articlesDetail.filter((article) => article._id === id);
      if (newData.length) {
        setArticle(newData);
      }
    }
  }, [id, articlesDetail]);

  return (
    <>
      {article.map((item) => (
        <div className={cls.detail} key={item._id}>
          <div className={cls.image}>
            <img src={item.image} alt="article logo" />

            <FavoriteBtn className={cls.favorite} article={item} />
          </div>

          <div className={cls.info}>
            <Text as={"h2"} fs={24}>
              {item.title}
            </Text>

            <Text as={"span"} fs={15} fw={700} color={"gray"}>
              {item.createdAt.toString()}
            </Text>

            <Text as={"p"} fs={16} fw={400}>
              {item.description}
            </Text>
          </div>

          <div className={cls.footer}>
            <div className={cls.footer_left}>
              <Avatar
                avatar={item.user.avatar}
                username={item.user.username}
                size={"small"}
              />
              <Text as={"span"} fs={15} fw={400}>
                {item.user.username}
              </Text>
            </div>

            <div className={cls.footer_right}>
              <div>
                <img src={likeImg} alt={"like"} />
                <Text as={"span"} fs={12} fw={500}>
                  {item.likes.length}
                </Text>
              </div>

              <div>
                <img src={eyesImg} alt={"eyes ico"} />

                <Text as={"span"} fs={12} fw={500}>
                  {item.views}
                </Text>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className={cls.similar}>
        {similars.map((article) => {
          return (
            <ArticleCard
              key={article._id}
              title={article.title}
              createdAt={article.createdAt}
              description={article.description}
              id={article._id}
              scrollTop={true}
            />
          );
        })}
      </div>
    </>
  );
};

export default DetailArticlePage;
