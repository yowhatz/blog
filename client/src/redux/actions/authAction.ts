import { Dispatch } from "redux";
import {
  AuthStateUserData,
  UpdateProfileStateData,
} from "src/utils/typescript";
import {
  AUTH,
  AUTH_ERROR,
  AUTH_UPDATE,
  AuthErrorType,
  AuthType,
  AuthUpdateType,
  User,
} from "../types/authTypes";
import { $api } from "src/api";
import { GlobalLoadingType, LOADING } from "src/redux/types/globalTypes";
import { TOKEN_KEY } from "src/utils/localstorage";
import { NavigateFunction } from "react-router-dom";
import { uploadImage } from "src/utils/uploadImage";

export const register =
  (userData: AuthStateUserData, navigate: NavigateFunction) =>
  async (dispatch: Dispatch<AuthErrorType | GlobalLoadingType>) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });

      const res = await $api.post("/register", userData);

      dispatch({
        type: LOADING,
        payload: false,
      });

      navigate("/login");
    } catch (error: any) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.response.data.message,
      });

      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };

export const login =
  (userData: AuthStateUserData) =>
  async (dispatch: Dispatch<AuthType | GlobalLoadingType>) => {
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });

      const res = await $api.post("/login", userData);

      dispatch({
        type: LOADING,
        payload: false,
      });

      localStorage.setItem(TOKEN_KEY, res.data.accessToken);

      window.location.href = "/";
    } catch (error: any) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.response.data.message,
      });

      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };

export const refreshToken =
  () => async (dispatch: Dispatch<AuthType | GlobalLoadingType>) => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      try {
        dispatch({
          type: LOADING,
          payload: true,
        });

        const res = await $api.get("/refreshToken");

        dispatch({
          type: AUTH,
          payload: {
            user: res.data.user,
            token: res.data.accessToken,
            error: "",
          },
        });

        dispatch({
          type: LOADING,
          payload: false,
        });
      } catch (error) {
        console.log(error);

        dispatch({
          type: LOADING,
          payload: false,
        });
      }
    }
  };

export const logout = () => async (dispatch: Dispatch<AuthType>) => {
  try {
    const res = await $api.get("/logout");

    dispatch({
      type: AUTH,
      payload: {
        user: null,
        token: "",
        error: "",
      },
    });

    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile =
  (userData: UpdateProfileStateData, avatar: any, auth: User | null) =>
  async (dispatch: Dispatch<GlobalLoadingType | AuthUpdateType>) => {
    let media: any = [];

    try {
      dispatch({
        type: LOADING,
        payload: true,
      });

      if (avatar) {
        media = await uploadImage([avatar]);
      }

      const newUser = {
        ...auth,
        ...userData,
        avatar: avatar ? media[0].url : auth?.avatar,
      };

      delete newUser.password;

      const res = await $api.patch("/updateUser", newUser);

      dispatch({
        type: AUTH_UPDATE,
        payload: newUser,
      });

      dispatch({
        type: LOADING,
        payload: false,
      });
    } catch (error) {
      console.log(error);

      dispatch({
        type: LOADING,
        payload: false,
      });
    }
  };
