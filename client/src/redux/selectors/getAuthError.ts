import { StateSchema } from "src/redux/store";

export const getAuthError = (state: StateSchema) => state.auth.error;
