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
  SUB_QUANTITY,
  SELECT_ITEM
} from "../actions/types";

const initState = {
  items: [
    {
      id: 1,
      title: "Winter body",
      size: [40, 41, 42],
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 110,
      img: Item1
    },
    {
      id: 2,
      title: "Adidas",
      size: [40, 41, 42, 43],

      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 80,
      img: Item2
    },
    {
      id: 3,
      title: "Vans",
      size: [39, 40, 41, 42],

      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 120,
      img: Item3
    },
    {
      id: 4,
      title: "White",
      size: [38, 39, 40, 41],

      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 260,
      img: Item4
    },
    {
      id: 5,
      title: "Cropped-sho",
      size: [40, 41, 42, 43, 44],

      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 160,
      img: Item5
    },
    {
      id: 6,
      title: "Blues",
      size: [41, 42, 43],
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 90,
      img: Item6
    }
  ],
  selectedItem: {},
  addedItems: [],
  quantity: 0,
  total: 0
};

const shoesReducer = (state = initState, action) => {
  switch (action.type) {
    case SELECT_ITEM:
      let selectedItem = state.items.find(item => item.id === action.id);
      return {
        ...state,
        selectedItem: { ...selectedItem }
      };

    case ADD_TO_CART:
      let addedItem = state.items.find(item => item.id === action.id);
      let existedItem = state.addedItems.find(item => item.id === action.id);

      if (existedItem) {
        addedItem.quantity += 1;

        return {
          ...state,
          quantity: state.quantity + 1,
          total: state.total + addedItem.price
        };
      } else {
        addedItem.quantity = 1;

        return {
          ...state,
          addedItems: [...state.addedItems, addedItem],
          quantity: state.quantity + 1,
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
        quantity: state.quantity - itemToRemove.quantity,
        total: newTotal
      };

    case ADD_QUANTITY:
      let itemToAdd = state.addedItems.find(item => item.id === action.id);
      itemToAdd.quantity += 1;

      return {
        ...state,
        addedItems: [...state.addedItems],
        quantity: state.quantity + 1,
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
          quantity: state.quantity - 1,
          total: state.total - itemToSub.price
        };
      } else {
        itemToSub.quantity -= 1;
        return {
          ...state,
          addedItems: [...state.addedItems],
          quantity: state.quantity - 1,
          total: state.total - itemToSub.price
        };
      }

    default:
      return state;
  }
};

export default shoesReducer;
