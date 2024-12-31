import { createSlice } from "@reduxjs/toolkit";
import { logoutUser, signUpUser, signinUser } from "./authThunk";

//serialize String to JSON
const serializeUser = (user) => {
  return JSON.stringify(user);
};

// Deserialize JSON to Firebase User
export const deserializeUser = (json) => {
  return JSON.parse(json);
};

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    currentUser: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Signin
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
export const { currentUser, logout } = authSlice.actions;
export const authSelector = (state) => state.auth;
