import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../../Config/firebaseConfig";
import moment from "moment";
import toast from "react-hot-toast";
import { loadOrders } from "./orderSlice";

export const addOrderThunk = createAsyncThunk(
  "orders/addOrder",
  async ({ cart, totalPrice, userId }, { rejectWithValue }) => {
    try {
      const orderCollection = doc(collection(db, "orders"));
      const formattedDate = moment().format("DD MMMM YYYY");
      const totalAmount = totalPrice;

      const newOrder = {
        cart,
        userId,
        orderDate: formattedDate,
        orderAmount: totalAmount,
        timestamp: Timestamp.fromDate(new Date()),
      };
      await setDoc(orderCollection, newOrder);
      cart.map(async (c) => {
        await deleteDoc(doc(db, "cart", c.cartItemId));
      });
      toast.success("order placed");
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getOrderThunk = createAsyncThunk(
  "orders/getOrder",
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      const orderQuery = query(
        collection(db, "orders"),
        where("userId", "==", userId),
        orderBy("timestamp", "desc")
      );

      const unSub = onSnapshot(orderQuery, (snapshot) => {
        const orders = [];
        snapshot.forEach((doc) => {
          orders.push(doc.data());
        });
        const formattedOrders = orders.map(({ timestamp, ...rest }) => rest);

        dispatch(loadOrders({ orders: formattedOrders }));
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
