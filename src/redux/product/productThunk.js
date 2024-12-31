import { createAsyncThunk } from "@reduxjs/toolkit";

export const getItems = createAsyncThunk(
  "items/getItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
