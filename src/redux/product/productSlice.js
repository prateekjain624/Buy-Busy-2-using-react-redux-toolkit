import { createSlice } from "@reduxjs/toolkit";
import { getItems } from "./productThunk";
const initialState = {
  products: [],
  loading: false,
  error: false,
  filteredProducts: [],
  searchQuery: "",
  priceFilter: 100,
  selectedCategories: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setPriceFilter: (state, action) => {
      state.priceFilter = action.payload;
    },
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
    },
    setFilteredProducts: (state) => {
      state.filteredProducts = state.products.filter((product) => {
        const matchSearch = product.title
          .toLowerCase()
          .includes(state.searchQuery.toLowerCase());
        const matchPrice = product.price <= state.priceFilter;
        const matchedCategory =
          state.selectedCategories.length == 0 ||
          state.selectedCategories.some(
            (category) =>
              product.category.toLowerCase() === category.toLowerCase()
          );
        return matchSearch && matchPrice && matchedCategory;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(getItems.rejected, (state) => {
        state.productsLoading = false;
        state.productsError = true;
      });
  },
});

export const productReducer = productSlice.reducer;
export const {
  setSearchQuery,
  setFilteredProducts,
  setPriceFilter,
  setSelectedCategories,
} = productSlice.actions;
export const productSelector = (state) => state.product;
