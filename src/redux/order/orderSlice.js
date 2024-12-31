import { createSlice } from "@reduxjs/toolkit";
import { addOrderThunk, getOrderThunk } from "./orderThunk";
const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    loadOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrderThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addOrderThunk.rejected, (payload) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getOrderThunk.pending, (state) => {
        state.ordersLoading = true;
      })
      .addCase(getOrderThunk.fulfilled, (state) => {
        state.ordersLoading = true;
      })
      .addCase(getOrderThunk.rejected, (state, action) => {
        state.ordersLoading = false;
        state.ordersError = action.payload;
      });
  },
});

export const orderReducer = orderSlice.reducer;
export const { loadOrders } = orderSlice.actions;
export const orderSelector = (state) => state.order;
