import {
  ADD_ARTICLE,
  ARTICLE_MESSAGE,
  ArticleActionType,
  ArticleSchema,
  GET_ARTICLE,
  GET_ARTICLES,
  UPDATE_ARTICLE,
} from "src/redux/types/articleTypes";

const initialState: ArticleSchema = {
  articles: [],
  detailArticles: [],
  similars: [],
  message: "",
  firstLoad: false,
};

export const articleReducer = (
  state = initialState,
  action: ArticleActionType,
) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return {
        ...state,
        articles: [...state.articles, action.payload],
        message: "Статья создана",
      };

    case ARTICLE_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };

    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
        firstLoad: true,
      };

    case GET_ARTICLE:
      return {
        ...state,
        detailArticles: [...state.detailArticles, action.payload.article],
        similars: action.payload.articles,
      };

    case UPDATE_ARTICLE:
      return {
        ...state,
        detailArticles: state.detailArticles.map((article) => {
          return article._id === action.payload._id ? action.payload : article;
        }),
      };

    default:
      return state;
  }
};

export default articleReducer;
