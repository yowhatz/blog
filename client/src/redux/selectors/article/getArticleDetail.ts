import { StateSchema } from "src/redux/store";

export const getArticleDetail = (state: StateSchema) =>
  state.article.detailArticles || [];
