import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_QUANTITY,
  SUB_QUANTITY
} from "./types";

export const addToCart = id => {
  return {
    type: ADD_TO_CART,
    id
  };
};

export const removeFromCart = id => {
  return {
    type: REMOVE_FROM_CART,
    id
  };
};

export const addQuantity = id => {
  return {
    type: ADD_QUANTITY,
    id
  };
};

export const subQuantity = id => {
  return {
    type: SUB_QUANTITY,
    id
  };
};
