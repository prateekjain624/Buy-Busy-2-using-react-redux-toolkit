import React from "react";
import styles from "../Navbar/Navbar.module.css";
import home from "../../assets/images/home.png";
import signin from "../../assets/images/signin.png";
import cart from "../../assets/images/cart.png";
import orders from "../../assets/images/orders.png";
import signout from "../../assets/images/logout.png";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authSelector } from "../../redux/Auth/AuthSlice";
import { logoutUser } from "../../redux/Auth/authThunk";
import toast from "react-hot-toast";

// navbar function starts from here
const Navbar = () => {
  const { currentUser, error } = useSelector(authSelector);
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully");
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/">BusyBuy</Link>
        </div>

        <ul className={styles.links}>
          <li>
            <Link to="/">
              <span>
                <img src={home} alt="home" />
              </span>
              Home
            </Link>
          </li>

          {currentUser ? (
            <>
              <li>
                <Link to="/order">
                  <span>
                    <img src={orders} alt="orders" />
                  </span>
                  My orders
                </Link>
              </li>
              <li>
                <Link to="/cart">
                  <span>
                    <img src={cart} alt="cart" />
                  </span>
                  cart
                </Link>
              </li>
              <li>
                <Link onClick={logout}>
                  <span>
                    <img src={signout} alt="signout" />
                  </span>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/signin">
                <span>
                  <img src={signin} alt="signin" />
                </span>
                Signin
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
