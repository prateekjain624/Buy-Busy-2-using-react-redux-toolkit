import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./redux/Auth/AuthSlice";
import { productReducer } from "./redux/product/productSlice";
import { listenAuthChange } from "./redux/Auth/authThunk";
import { orderReducer } from "./redux/order/orderSlice";
import { cartReducer } from "./redux/Cart/cartSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  devTools: true,
});

store.dispatch(listenAuthChange());
