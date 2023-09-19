import { StateSchema } from "src/redux/store";

export const getArticlesData = (state: StateSchema) =>
  state.article.articles || [];
