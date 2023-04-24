import axios from "axios";
import {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_COME,
  FETCH_DATA_ERROR,
  ADD_TO_CART,
  REMOVE_TO_CART,
  REMOVE,
} from "../Constant";
let url = `https://dummyjson.com/products`;
let url1 = (id = 1) => `https://dummyjson.com/products/${id}`;
export const fetchcome = () => {
  return {
    type: FETCH_DATA_COME,
  };
};
export const fetchsuccess = (user) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: user,
  };
};
export const fetcherror = (err) => {
  return {
    type: FETCH_DATA_ERROR,
    payload: err,
  };
};
export const setPage = (page) => {
  return {
    type: "SET_PAGE",
    payload: page,
  };
};
export const Addtocart = (item) => {
  return {
      type: ADD_TO_CART,
      payload: item

  }
}
export const removetocart = (id) => {
  return {
      type: REMOVE_TO_CART,
      payload: id,

  }
}
export const remove = (id) => {
  return {
      type: REMOVE_TO_CART,
      payload: id,

  }
}
//Api data fetch
export const carddata = (skip) => {
  return (dispatch) => {
    dispatch(fetchcome());
    axios
      .get(url)
      .then((res) => {
        const data = res.data;
        dispatch(fetchsuccess(data));
        console.log(res.data);
      })
      .catch((err) => {
        const message = err.message;
        dispatch(fetcherror(message));
        console.log(err.message);
      });
  };
};

export const ApiData = (id) => {
  return (dispatch) => {
    dispatch(fetchcome());
    axios
      .get(url1(id))
      .then((res) => {
        const data = res.data;
        dispatch(fetchsuccess(data));
        console.log(res.data);
      })
      .catch((err) => {
        const message = err.message;
        dispatch(fetcherror(message));
        console.log(err.message);
      });
  };
};

