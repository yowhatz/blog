import { StateSchema } from "src/redux/store";

export const getGlobalLoading = (state: StateSchema) =>
  state.global.loading || false;
