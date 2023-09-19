import { StateSchema } from "src/redux/store";

export const getArticleSimilars = (state: StateSchema) =>
  state.article.similars || [];
