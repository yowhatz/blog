import { StateSchema } from "src/redux/store";

export const getArticleFirstLoad = (state: StateSchema) =>
  state.article.firstLoad || false;
