import { Dispatch } from "redux";
import { GlobalLoadingType, LOADING } from "src/redux/types/globalTypes";
import { uploadImage } from "src/utils/uploadImage";
import { $api } from "src/api";
import {
  ADD_ARTICLE,
  Article,
  ARTICLE_MESSAGE,
  ArticleAddFetch,
  ArticleAddType,
  ArticleDetailGetFetch,
  ArticleDetailType,
  ArticleGetFetch,
  ArticleGetType,
  ArticleMessageType,
  ArticleUpdateType,
  GET_ARTICLE,
  GET_ARTICLES,
} from "src/redux/types/articleTypes";
import { User } from "src/redux/types/authTypes";

export const createArticle =
  (data: any, image: any) =>
  async (
    dispatch: Dispatch<GlobalLoadingType | ArticleAddType | ArticleMessageType>,
  ) => {
    let media: any = [];

    try {
      dispatch({
        type: ARTICLE_MESSAGE,
        payload: "",
      });
      dispatch({
        type: LOADING,
        payload: true,
      });
      if (image) media = await uploadImage([image]);

      const res = await $api.post<ArticleAddFetch>("/create", {
        ...data,
        image: media[0].url,
      });

      dispatch({
        type: ADD_ARTICLE,
        payload: res.data.newArticle,
      });

      dispatch({
        type: LOADING,
        payload: false,
      });
    } catch (error) {
      console.log(error);

      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };

export const getArticles =
  () => async (dispatch: Dispatch<GlobalLoadingType | ArticleGetType>) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });

      const res = await $api.get<ArticleGetFetch>("/getArticles");

      console.log(res);

      dispatch({
        type: GET_ARTICLES,
        payload: res.data.articles,
      });

      dispatch({
        type: LOADING,
        payload: false,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };

export const getArticle =
  (id: string, articlesDetail: Article[]) =>
  async (dispatch: Dispatch<GlobalLoadingType | ArticleDetailType>) => {
    if (articlesDetail.every((article) => article._id !== id)) {
      try {
        dispatch({
          type: LOADING,
          payload: true,
        });

        const res = await $api.get<ArticleDetailGetFetch>(`/article/${id}`);

        console.log(res);

        dispatch({
          type: GET_ARTICLE,
          payload: {
            article: res.data.article,
            articles: res.data.articles,
          },
        });

        dispatch({
          type: LOADING,
          payload: false,
        });
      } catch (error) {
        console.log(error);

        dispatch({
          type: LOADING,
          payload: false,
        });
      }
    }
  };

export const likeArticle =
  (article: Article, auth: User | null) => async (dispatch: Dispatch<any>) => {
    try {
      const newArticle = { ...article, likes: [...article.likes, auth?._id] };

      dispatch({
        type: "UPDATE_ARTICLE",
        payload: newArticle,
      });

      const res = await $api.patch(`/article/${article._id}/like`);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

export const unlikeArticle =
  (article: Article, auth: User | null) =>
  async (dispatch: Dispatch<ArticleUpdateType>) => {
    try {
      const newArticle = {
        ...article,
        likes: article.likes.filter((item) => item !== auth?._id),
      };

      dispatch({
        type: "UPDATE_ARTICLE",
        payload: newArticle,
      });

      const res = await $api.patch(`/article/${article._id}/unlike`);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
