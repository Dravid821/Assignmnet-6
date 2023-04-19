import {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_COME,
  FETCH_DATA_ERROR,
} from "../Constant";
const initialState = {
  user: [],
  loading: false,
  err: null,
};
export const datareducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_COME:
      return {
        ...state,
        loading: true,
      };

    case FETCH_DATA_SUCCESS:
      console.log(state.user);
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case FETCH_DATA_ERROR:
      return {
        ...state,
        loading: false,
        err: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
