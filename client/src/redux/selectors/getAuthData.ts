import { StateSchema } from "src/redux/store";

export const getAuthData = (state: StateSchema) => state.auth.user || null;
