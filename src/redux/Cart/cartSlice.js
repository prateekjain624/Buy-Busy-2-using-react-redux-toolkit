import { createSlice } from "@reduxjs/toolkit";
import {
  addToCartThunk,
  getCartThunk,
  updateQuantityThunk,
  removeItemThunk,
} from "./cartThunk";
const initialState = {
  cart: [],
  totalItem: 0,
  totalPrice: 0,
  cartLoading: false,
  cartError: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCart: (state, action) => {
      state.totalItem = action.payload.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      state.totalPrice = action.payload.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      state.cartLoading = false;
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartThunk.pending, (state) => {
        state.cartLoading = true;
        state.cartError = false;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.cartLoading = false;
        const cartItem = action.payload;
        const existingCart = state.cart.find(
          (item) => item.cartItemId === cartItem.cartItemId
        );
        if (!existingCart) {
          state.cart = [cartItem, ...state.cart];
        }
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = action.payload;
      })
      .addCase(getCartThunk.pending, (state) => {
        state.cartLoading = true;
        state.cartError = false;
      })
      .addCase(getCartThunk.fulfilled, (state) => {
        state.cartLoading = false;
      })
      .addCase(getCartThunk.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = action.payload;
      })
      .addCase(updateQuantityThunk.pending, (state) => {
        state.cartLoading = true;
        state.cartError = false;
      })
      .addCase(updateQuantityThunk.fulfilled, (state, action) => {
        const { cartItemId, newQuantity } = action.payload;
        state.cartLoading = false;
        const updatedCart = state.cart.map((c) =>
          c.cartItemId === cartItemId
            ? {
                ...c,
                quantity: newQuantity,
              }
            : c
        );
        state.cart = updatedCart;
      })
      .addCase(updateQuantityThunk.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = action.payload;
      })
      .addCase(removeItemThunk.pending, (state, action) => {
        state.cartLoading = true;
        state.cartError = false;
      })
      .addCase(removeItemThunk.fulfilled, (state, action) => {
        console.log("removecart", action.payload);
        const { cartItemId } = action.payload;
        state.cartLoading = false;
        state.cart = state.cart.filter((c) => c.cartItemId !== cartItemId);
      })
      .addCase(removeItemThunk.rejected, (state, action) => {
        console.log("rejected");
        state.cartLoading = false;
        state.cartError = action.payload;
      });
  },
});

export const cartReducer = cartSlice.reducer;
export const { loadCart } = cartSlice.actions;
export const cartSelector = (state) => state.cart;
