import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { currentUser } from "./authSlice";

import { auth } from "../../Config/firebaseConfig";

export const listenAuthChange = createAsyncThunk(
  "auth/listenAuthChange",
  async (_, { dispatch }) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const newUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        };
        dispatch(currentUser(newUser));
      } else {
        dispatch(currentUser(null));
      }
    });
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      return user.email;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const signinUser = createAsyncThunk(
  "auth/signinUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
