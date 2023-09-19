import {
  createStore,
  combineReducers,
  applyMiddleware,
  AnyAction,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";

import { authReducer } from "./reducers/authReducer";
import { AuthSchema } from "./types/authTypes";
import { GlobalSchema } from "src/redux/types/globalTypes";
import globalReducer from "src/redux/reducers/globalReducer";
import { ArticleSchema } from "src/redux/types/articleTypes";
import articleReducer from "src/redux/reducers/articleReducer";

const rootReducers = combineReducers({
  auth: authReducer,
  global: globalReducer,
  article: articleReducer,
});

export interface StateSchema {
  auth: AuthSchema;
  global: GlobalSchema;
  article: ArticleSchema;
}

export const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk)),
);

type AppState = ReturnType<typeof rootReducers>;
type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
export const useAppDispatch = () => useDispatch<TypedDispatch<AppState>>();
