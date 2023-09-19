import { GlobalLoadingType, GlobalSchema } from "src/redux/types/globalTypes";

const initialState: GlobalSchema = {
  loading: false,
};

export const globalReducer = (
  state = initialState,
  action: GlobalLoadingType,
) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default globalReducer;
