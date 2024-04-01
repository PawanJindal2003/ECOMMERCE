import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SAVE_SHIPPING_INFO,
  } from "../constants/cartConstants";
  
  export const cartReducer = (state = { cartItems: [], shippingInfo:{} }, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        const item = action.payload; //incoming product
  
        const isItemExist = state.cartItems.find(
          (i) => i.product === item.product //matching product_id of incoming product to products already present in the cart
        );
  
        if (isItemExist) {
          return {
            ...state,
            cartItems: state.cartItems.map((i) =>
              i.product === isItemExist.product ? item : i
            ),
          };
        } else {
          //if not present in cart items, then simply adding it
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          };
        }
      case REMOVE_FROM_CART:
        return {
          ...state,
          cartItems: state.cartItems.filter((i) => i.product !== action.payload),
        };
      case SAVE_SHIPPING_INFO:
        return {
          ...state,
          shippingInfo: action.payload,
        };
      default:
        return state;
    }
  };
  