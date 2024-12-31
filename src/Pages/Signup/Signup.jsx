import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authSelector } from "../../redux/auth/authSlice";
import { signUpUser } from "../../redux/auth/authThunk";
import toast from "react-hot-toast";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { currentUser, error, loading } = useSelector(authSelector);
  console.log(currentUser);
  console.log(error);
  console.log(loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      signUpUser({
        name,
        email,
        password,
      })
    );
  };

  useEffect(() => {
    if (!loading && !error && currentUser) {
      navigate("/");
      toast.success("user signup  successfully");
    } else if (error) {
      toast.error("Error logging in user");
    }
  }, [loading, error, navigate, currentUser]);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Sign Up</h2>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
        <p className={styles.signupPrompt}>
          <Link to="/signin" className={styles.signupLink}>
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
