import {
  AUTH,
  AUTH_ERROR,
  AUTH_UPDATE,
  AuthSchema,
  AuthType,
} from "../types/authTypes";

const initialState: AuthSchema = {
  user: null,
  token: "",
  error: "",
};

export const authReducer = (state = initialState, action: AuthType) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: "",
      };

    case AUTH_UPDATE:
      return {
        ...state,
        user: action.payload,
      };

    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
