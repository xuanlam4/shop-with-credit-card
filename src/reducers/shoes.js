import Item1 from "../img/item1.jpg";
import Item2 from "../img/item2.jpg";
import Item3 from "../img/item3.jpg";
import Item4 from "../img/item4.jpg";
import Item5 from "../img/item5.jpg";
import Item6 from "../img/item6.jpg";

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_QUANTITY,
  SUB_QUANTITY
} from "../actions/types";

const initState = {
  items: [
    {
      id: 1,
      title: "Winter body",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 110,
      img: Item1
    },
    {
      id: 2,
      title: "Adidas",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 80,
      img: Item2
    },
    {
      id: 3,
      title: "Vans",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 120,
      img: Item3
    },
    {
      id: 4,
      title: "White",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 260,
      img: Item4
    },
    {
      id: 5,
      title: "Cropped-sho",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 160,
      img: Item5
    },
    {
      id: 6,
      title: "Blues",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 90,
      img: Item6
    }
  ],
  addedItems: [
    // {
    //   id: 6,
    //   title: "Blues",
    //   desc:
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
    //   price: 90,
    //   img: Item6
    // },
    // {
    //   id: 5,
    //   title: "Cropped-sho",
    //   desc:
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
    //   price: 160,
    //   img: Item5
    // }
  ],
  total: 0
};

const shoesReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let addedItem = state.items.find(item => item.id === action.id);
      let existedItem = state.addedItems.find(item => item.id === action.id);

      if (existedItem) {
        addedItem.quantity += 1;

        return {
          ...state,
          total: state.total + addedItem.price
        };
      } else {
        addedItem.quantity = 1;

        return {
          ...state,
          addedItems: [...state.addedItems, addedItem],
          total: state.total + addedItem.price
        };
      }

    case REMOVE_FROM_CART:
      let itemToRemove = state.addedItems.find(item => item.id === action.id);
      let newItems = state.addedItems.filter(item => item.id !== action.id);
      let newTotal = state.total - itemToRemove.quantity * itemToRemove.price;

      return {
        ...state,
        addedItems: newItems,
        total: newTotal
      };

    case ADD_QUANTITY:
      let itemToAdd = state.addedItems.find(item => item.id === action.id);
      itemToAdd.quantity += 1;

      return {
        ...state,
        addedItems: [...state.addedItems],
        total: state.total + itemToAdd.price
      };

    case SUB_QUANTITY:
      let itemToSub = state.addedItems.find(item => item.id === action.id);
      if (itemToSub.quantity === 1) {
        let newItems = state.addedItems.filter(
          item => item.id !== itemToSub.id
        );

        return {
          ...state,
          addedItems: newItems,
          total: state.total - itemToSub.price
        };
      } else {
        itemToSub.quantity -= 1;
        return {
          ...state,
          addedItems: [...state.addedItems],
          total: state.total - itemToSub.price
        };
      }

    default:
      return state;
  }
};

export default shoesReducer;
