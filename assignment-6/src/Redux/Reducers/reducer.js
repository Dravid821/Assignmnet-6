import {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_COME,
  FETCH_DATA_ERROR,
  ADD_TO_CART,
  REMOVE_TO_CART,
  REMOVE,
} from "../Constant";
const initialState = {
  user: [],
  loading: false,
  err: null,
  carts: [],
  qnty: 0,
  totalPrice: 0,
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
    case ADD_TO_CART:
      const itemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        // If the item already exists in the cart, update the quantity and total price
        const updatedCart = [...state.carts];
        const updatedItem = { ...updatedCart[itemIndex] };
        updatedItem.qnty += 1;
        updatedItem.totalPrice = updatedItem.qnty * updatedItem.price;
        updatedCart[itemIndex] = updatedItem;

        return {
          ...state,
          carts: updatedCart,
          qnty: state.qnty + 1,
          totalPrice: state.totalPrice + updatedItem.price,
        };
      } else {
        // If the item does not exist in the cart, add it to the cart
        const newItem = {
          ...action.payload,
          qnty: 1,
          totalPrice: action.payload.price,
        };
        return {
          ...state,
          carts: [...state.carts, newItem],
          qnty: state.qnty + 1,
          totalPrice: state.totalPrice + newItem.price,
        };
      }

    case REMOVE_TO_CART:
      const cartItemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (cartItemIndex >= 0) {
        const updatedCart = [...state.carts];
        const existingCartItem = updatedCart[cartItemIndex];

        if (action.payload.isIncrement) {
          existingCartItem.qnty++;
          return {
            ...state,
            carts: updatedCart,
            totalPrice: state.totalPrice + existingCartItem.price, // Update total price
          };
        } else {
          existingCartItem.qnty--;
          if (existingCartItem.qnty === 0) {
            updatedCart.splice(cartItemIndex, 1);
          }
          return {
            ...state,
            carts: updatedCart,
            totalPrice: state.totalPrice - existingCartItem.price, // Update total price
          };
        }
      } else {
        return {
          ...state,
          carts: [
            ...state.carts,
            {
              ...action.payload,
              qnty: 1,
            },
          ],
          totalPrice: state.totalPrice + action.payload.price, // Update total price
        };
      }
    default:
      return {
        ...state,
      };
  }
};
