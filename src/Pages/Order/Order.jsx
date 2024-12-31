import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderSelector } from "../../redux/order/orderSlice";
import { getOrderThunk } from "../../redux/order/orderThunk";
import styles from "../Order/Order.module.css";
import { authSelector } from "../../redux/Auth/AuthSlice";

const OrdersPage = () => {
  const { orders } = useSelector(orderSelector);

  const { currentUser, error } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!error && currentUser) {
      dispatch(getOrderThunk(currentUser.uid));
    }
  }, [dispatch, currentUser]);

  return (
    <div className={styles.ordersContainer}>
      <h1 className={styles.heading}>My Orders</h1>

      {!orders.orders || orders.orders.length === 0 ? (
        <p className={styles.noOrders}>No orders available</p>
      ) : (
        <table className={styles.ordersTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.orders.map((order, index) => (
              <React.Fragment key={index}>
                <tr className={styles.orderDateRow}>
                  <td colSpan="5" className={styles.orderDate}>
                    Order Date: {order.orderDate}
                  </td>
                </tr>
                {order.cart.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td>{item.title}</td>
                    <td>
                      <i className="fa-solid fa-indian-rupee-sign"></i>
                      {item.price.toFixed()}
                    </td>
                    <td>{item.quantity}</td>
                    <td>
                      <i className="fa-solid fa-indian-rupee-sign"></i>
                      {(item.price * item.quantity).toFixed()}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3" className={styles.totalLabel}>
                    Grand Total:
                  </td>
                  <td className={styles.totalAmount}>
                    <i className="fa-solid fa-indian-rupee-sign"></i>
                    {order.orderAmount.toFixed()}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersPage;
