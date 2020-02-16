import { SELECT_ITEM } from "./types";

export const selectItem = id => {
  return {
    type: SELECT_ITEM,
    id
  };
};
