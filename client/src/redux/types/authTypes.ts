export const AUTH = "AUTH";
export const AUTH_ERROR = "AUTH_ERROR";

export const AUTH_UPDATE = "AUTH_UPDATE";

export interface User {
  avatar: string;
  email: string;
  password: string;
  story: string;
  username: string;
  website: string;
  __v: number;
  _id: string;
}

export interface AuthSchema {
  user: User | null;
  token: string;
  error: "";
}

export interface AuthActionType {
  type: typeof AUTH;
  payload: AuthSchema;
}

export interface AuthErrorType {
  type: typeof AUTH_ERROR;
  payload: string;
}

export interface AuthUpdateType {
  type: typeof AUTH_UPDATE;
  payload: any;
}

export type AuthType = AuthActionType | AuthErrorType | AuthUpdateType;
