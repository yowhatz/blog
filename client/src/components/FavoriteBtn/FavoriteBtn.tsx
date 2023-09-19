import { FC, useEffect, useState } from "react";

import cls from "./FavoriteBtn.module.scss";

import { likedImg, likeImg } from "src/assets";
import { useAppDispatch } from "src/redux/store";
import { likeArticle, unlikeArticle } from "src/redux/actions/articleAction";
import { Article } from "src/redux/types/articleTypes";
import { useSelector } from "react-redux";
import { getAuthData } from "src/redux/selectors/getAuthData";

interface FavoriteBtnProps {
  className?: string;
  article: Article;
}

const FavoriteBtn: FC<FavoriteBtnProps> = ({ className = "", article }) => {
  const dispatch = useAppDispatch();
  const auth = useSelector(getAuthData);
  const [isLike, setIsLike] = useState<boolean>(false);

  const onLike = () => {
    if (isLike) {
      setIsLike(false);
      dispatch(unlikeArticle(article, auth));
    } else {
      setIsLike(true);
      dispatch(likeArticle(article, auth));
    }
  };

  useEffect(() => {
    if (article.likes.find((item) => item === auth?._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [article.likes, auth?._id]);

  return (
    <button onClick={onLike} className={`${cls.favorite_btn} ${className}`}>
      <img src={isLike ? likedImg : likeImg} />
    </button>
  );
};

export default FavoriteBtn;
