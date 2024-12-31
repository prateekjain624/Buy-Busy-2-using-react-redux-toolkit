import React, { useEffect } from "react";
import styles from "../Cart/Cart.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartSelector } from "../../redux/Cart/cartSlice";
import {
  updateQuantityThunk,
  removeItemThunk,
} from "../../redux/Cart/cartThunk";
import { getCartThunk } from "../../redux/Cart/cartThunk";
import { authSelector } from "../../redux/auth/authSlice";
import { addOrderThunk } from "../../redux/order/orderThunk";

const CartComponent = () => {
  const { cart, totalItem, totalPrice } = useSelector(cartSelector);
  const { currentUser, error } = useSelector(authSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!error && currentUser) {
      dispatch(getCartThunk(currentUser.uid));
    }
  }, [dispatch, currentUser]);

  const handleOrders = (cart) => {
    dispatch(addOrderThunk({ cart, totalPrice, userId: currentUser.uid }));
  };

  return (
    <div className={styles.cartContainer}>
      <>
        <div className={styles.summary}>
          <p>
            Total Items: <span className={styles.totalItems}>{totalItem}</span>
          </p>
          <p>
            Total Price: <i className="fa-solid fa-indian-rupee-sign"></i>
            <span className={styles.totalPrice}>{totalPrice.toFixed()}</span>
          </p>
          <Link to="/order">
            <button
              className={styles.purchaseButton}
              onClick={() => handleOrders(cart)}
            >
              Purchase
            </button>
          </Link>
        </div>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.cartItemId} className={styles.cartItem}>
              <img
                src={item.image}
                alt={item.title}
                className={styles.itemImage}
              />
              <div className={styles.itemDetails}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemPrice}>
                  {" "}
                  <i className="fa-solid fa-indian-rupee-sign"></i>
                  {item.price.toFixed()}
                </p>
                <div className={styles.quantityControl}>
                  <button
                    className={styles.quantityButton}
                    disabled={item.quantity <= 1}
                    onClick={() =>
                      dispatch(
                        updateQuantityThunk({
                          cartItemId: item.cartItemId,
                          newQuantity: item.quantity - 1,
                        })
                      )
                    }
                  >
                    -
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={() =>
                      dispatch(
                        updateQuantityThunk({
                          cartItemId: item.cartItemId,
                          newQuantity: item.quantity + 1,
                        })
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() =>
                    dispatch(
                      removeItemThunk({
                        cartItemId: item.cartItemId,
                      })
                    )
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.emptyCart}>Your cart is empty.</p>
        )}
      </>
    </div>
  );
};

export default CartComponent;
