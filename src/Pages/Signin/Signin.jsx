import React, { useEffect, useState } from "react";
import styles from "./Signin.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signinUser } from "../../redux/auth/authThunk";
import { authSelector } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { currentUser, loading, error } = useSelector(authSelector);

  console.log(currentUser);
  console.log(loading);
  console.log(error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signinUser({ email, password }));
  };

  useEffect(() => {
    if (!loading) {
      if (currentUser) {
        navigate("/");
        toast.success("User logged in successfully");
      } else if (error) {
        toast.error("Invalid credentials");
      }
    }
  }, [loading, error, navigate, currentUser]);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Login
        </button>
        <p className={styles.signupPrompt}>
          New user?{" "}
          <Link to="/Signup" className={styles.signupLink}>
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
