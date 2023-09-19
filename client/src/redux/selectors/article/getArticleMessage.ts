import { StateSchema } from "src/redux/store";

export const getArticleMessage = (state: StateSchema) =>
  state.article.message || "";
