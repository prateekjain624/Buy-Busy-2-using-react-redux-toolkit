import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
  query,
  setDoc,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../Config/firebaseConfig";
import toast from "react-hot-toast";
import { loadCart } from "./cartSlice";

export const addToCartThunk = createAsyncThunk(
  "cart/addToCart",
  async ({ product, userId }, { rejectWithValue }) => {
    try {
      const cartCollectionRef = collection(db, "cart");

      const q = query(
        cartCollectionRef,
        where("id", "==", product.id),
        where("userId", "==", userId)
      );

      const docSnap = await getDocs(q);

      if (!docSnap.empty) {
        console.log("if case");
        const existingDoc = docSnap.docs[0];
        const updatedQuantity = existingDoc.data().quantity + 1;
        await updateDoc(existingDoc, { quantity: updatedQuantity });

        return {
          ...product,
          quantity: updatedQuantity,
          cartItemId: existingDoc.id,
        };
      } else {
        const newDocRef = doc(collection(db, "cart"));

        const cartItem = {
          ...product,
          quantity: 1,
          cartItemId: newDocRef.id,
          userId,
        };
        await setDoc(newDocRef, cartItem);
        toast.success("product added to cart");
        return cartItem;
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getCartThunk = createAsyncThunk(
  "cart/getCart",
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      const cartCollectionRef = collection(db, "cart");
      const q = query(cartCollectionRef, where("userId", "==", userId));
      const unSub = onSnapshot(q, (querySnapshot) => {
        const cartItems = [];
        querySnapshot.docs.map((doc) => {
          cartItems.push({ ...doc.data(), id: doc.id });
        });
        dispatch(loadCart(cartItems));
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateQuantityThunk = createAsyncThunk(
  "cart/updateQuantity",
  async ({ cartItemId, newQuantity }, { rejectWithValue }) => {
    try {
      const existingDoc = doc(db, "cart", cartItemId);
      const updatedQuantity = newQuantity;
      await updateDoc(existingDoc, {
        quantity: updatedQuantity,
      });
      return { cartItemId, newQuantity };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeItemThunk = createAsyncThunk(
  "cart/removeItem",
  async ({ cartItemId }, { rejectWithValue }) => {
    console.log(cartItemId);
    try {
      const existingDoc = doc(db, "cart", cartItemId);
      await deleteDoc(existingDoc);
      toast.success("Product removed from cart");
      return { cartItemId };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
